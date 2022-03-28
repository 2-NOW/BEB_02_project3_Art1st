import dotenv from 'dotenv';
dotenv.config();
import Web3 from 'web3';
import db from '../models/index.js';
import BatcherAbi from '../api/abi/batcherAbi.js';

const web3 = new Web3(process.env.WEB3_NETWORK);

const batcherContract = new web3.eth.Contract(BatcherAbi, process.env.BATCHER_ADDRESS, {
    from: process.env.SERVER_ADDRESS
});

const server = web3.eth.accounts.wallet.add(process.env.SERVER_PRIVATEKEY);

const actionEnum = {'compensate': 1, 'donate': 2};

const startTask = async() => {
    let orders = await db.Orderbook.findAll({
        where: {
            status: 'before'
        },
        order: [
            ['id', 'ASC']
        ]
    });

    while(true){
        var actions = [];
        var froms = [];
        var toes = [];
        var amounts = [];
        var ids = []
        var flag = false; // 다 훑었으면 flag -> true로 변경

        for (let j = 0 ; j<20; j++){ // 20개씩 자름
            if(orders[j] === undefined){
                flag = true;
                break;
            }
            ids.push(orders[j].id);
            actions.push(actionEnum[orders[j].action]);
            amounts.push(orders[j].amount);

            var {address} = await db.User.findOne({attributes: ['address'], where: {id: orders[j].from_id}});
            froms.push(address);

            var {address} = await db.User.findOne({attributes: ['address'], where: {id: orders[j].to_id}});
            toes.push(address);

        }

        // console.log(ids, actions, froms, toes, amounts);

        if(ids.length != 0){
            const gasLimit = await batcherContract.methods.batchTransactions(actions, froms, toes, amounts)
            .estimateGas({from: server.address, to: process.env.BATCHER_ADDRESS})

            console.log('estimated Gas Limit: ', gasLimit);

            var txHash; 

            batcherContract.methods.batchTransactions(actions, froms, toes, amounts)
            .send({from: server.address, to: process.env.BATCHER_ADDRESS, gas: gasLimit+100000}, async (err, transactionHash) => {
                if(err){
                    console.log(err);
                    throw Error(err.toString());
                }
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
        
        if(flag){
            console.log('OrderBook end!');
            break;
        }

    }
    
}

startTask();