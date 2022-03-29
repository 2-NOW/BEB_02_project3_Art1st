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
    let pendings = await db.Orderbook.findAll({
        attributes: ['transaction_hash'],
        where: {
            status: 'pending'
        },
        order: [
            ['id', 'ASC']
        ]
    });

    if(pendings.length > 0) {
        pendings = pendings.map((val) => {
            return val.dataValues.transaction_hash;
        })
        
        const pendingSet = [ ... new Set(pendings)]; // Tx hash만 있는 set 배열
        // console.log(pendingSet);
    
        for (let pending of pendingSet) {
            const txInfo = await web3.eth.getTransaction(pending);
            if(txInfo.blockNumber){
                await db.Orderbook.update(
                    {status: 'complete'},
                    {where: {
                        status: 'pending',
                        transaction_hash: pending
                    }}
                )
            }
            else{
                console.log(pending, ' -> pending status yet')
                break;
            }
        }
        
    }
    else {
        console.log('There is no pending Txs.')
    } 
   
    console.log('checking end!')
}

startTask();