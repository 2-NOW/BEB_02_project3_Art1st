import dotenv from 'dotenv';
dotenv.config();
import Caver from 'caver-js';
import db from '../models/index.js';
import BatcherAbi from '../api/abi/batcherAbi.js';

const caver = new Caver(process.env.BAOBAB_NETWORK);

const batcherContract = new caver.klay.Contract(BatcherAbi, process.env.BATCHER_ADDRESS, {
    from: process.env.SERVER_ADDRESS
});

const server = caver.klay.accounts.wallet.add(process.env.SERVER_PRIVATEKEY);

const actionEnum = {'compensate': 1, 'donate': 2, 'purchace': 3, 'vote': 4};

const startTask = async() => {
    let orders = await db.Orderbook.findAll({
        where: {
            status: 'before'
        },
        order: [
            ['id', 'ASC']
        ]
    });

    console.log(orders);

    while(true){
        var actions = [];
        var froms = [];
        var toes = [];
        var amounts = [];
        var ids = []
        var tokens = []
        var flag = false; // 다 훑었으면 flag -> true로 변경

        for (let j = 0 ; j<20; j++){ // 20개씩 자름
            if(orders[j] === undefined){
                flag = true;
                break;
            }
            ids.push(orders[j].id);
            actions.push(actionEnum[orders[j].action]);
            orders[j].action === 'vote' ? amounts.push(orders[j].amount) : amounts.push(caver.utils.toPeb(orders[j].amount, 'KLAY')); // amount값에 10e18 곱해줘야 함.
            tokens.push(orders[j].token_id===null ? 0 : Number(orders[j].token_id));

            var {address} = await db.User.findOne({attributes: ['address'], where: {id: orders[j].from_id}});
            froms.push(address);

            if(orders[j].to_id === null){ // vote인 경우 -> to가 없으니 대신 collaboration contract address 넣어줌
                toes.push(process.env.COLLABO_ADDRESS);
            }
            else{
                var {address} = await db.User.findOne({attributes: ['address'], where: {id: orders[j].to_id}});
                toes.push(address);
            }

        }

        console.log(ids, actions, froms, toes, amounts, tokens);

        if(ids.length != 0){
            try{
                const gasLimit = await batcherContract.methods.batchTransactions(actions, froms, toes, amounts, tokens)
                .estimateGas({from: server.address, to: process.env.BATCHER_ADDRESS})

                console.log('estimated Gas Limit: ', gasLimit);
            }
            catch(err){
                console.log('Batcher Error: \n', err);
                break;
            }

            var txHash; 
            
            batcherContract.methods.batchTransactions(actions, froms, toes, amounts, tokens)
            .send({from: server.address, to: process.env.BATCHER_ADDRESS, gas: 100000000}, async (err, transactionHash) => {
    
                txHash = transactionHash;
                console.log(txHash);
        
                for (let j = 0; j<ids.length; j++){
                    const order = await db.Orderbook.findOne({where: {id: ids[j]}});
                    await order.update({transaction_hash: transactionHash, status: 'pending' })
                    await order.save();
                    console.log(order);
                }
                    
            });  
        
        }
        else {
            console.log('There is no Orders.')
        } 
        
        if(flag){
            break;
        }

    }
    console.log('Sending Tx end!');
    
}

startTask();
