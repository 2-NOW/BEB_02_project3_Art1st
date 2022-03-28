import dotenv from 'dotenv';
dotenv.config();

import db from '../models/index.js';
import UserService from './user.js';

// +------------------+-------------------------------------+------+-----+---------+----------------+
// | Field            | Type                                | Null | Key | Default | Extra          |
// +------------------+-------------------------------------+------+-----+---------+----------------+
// | id               | int                                 | NO   | PRI | NULL    | auto_increment |
// | action           | enum('donate','compensate')         | NO   |     | NULL    |                |
// | amount           | int                                 | NO   |     | NULL    |                |
// | transaction_hash | varchar(40)                         | NO   |     | NULL    |                |
// | status           | enum('before','pending','complete') | NO   |     | NULL    |                |
// | createdAt        | datetime                            | NO   |     | NULL    |                |
// | updatedAt        | datetime                            | NO   |     | NULL    |                |
// | from_id          | int                                 | YES  | MUL | NULL    |                |
// | to_id            | int                                 | YES  | MUL | NULL    |                |
// +------------------+-------------------------------------+------+-----+---------+----------------+

class OrderService {
    constructor() {
        this.Orderbook = db.Orderbook;
        this.DonationTransaction = db.DonationTransaction;
        this.UserServiceInterface = new UserService();
    }

    async donate(from_id, to_id, amount, msg){
        try{
            // 우선, 실제 존재하는 유저들인지 확인
            const from = await this.UserServiceInterface.getOneUser(from_id);
            const to = await this.UserServiceInterface.getOneUser(to_id);

            // 이후 잔액 확인
            const from_bal = Number(from.balance);

            // -> 유효성 검사 
            if (from_bal < amount) { // 현재 from의 잔액보다 후원하고자 하는 금액이 더 크다면
                throw Error('Insufficient Balance.');
            }
            
            // 이후 orderbook에 주문서 넣기
            const order = await this.Orderbook.create({
                action: 'donate',
                amount: amount,
                status: 'before',
                from_id: from_id,
                to_id: to_id,
                transaction_hash: '0x0' // 아직 hash 없음
            })

            // 그리고 먼저 DB 처리 부터 해주기 -> donation_tx랑 user들 잔액
            await from.update({ // 후원하는 사람
                balance: Number(from.balance) - Number(amount)
            });
            await from.save();

            await to.update({ // 후원 받는 사람
                balance: Number(to.balance) + Number(amount),
                donation_balance: Number(to.donation_balance) + Number(amount)
            });
            await to.save();

            const donation_transaction = await this.DonationTransaction.create({
                // amount: amount,
                message: msg,
                // transaction_hash: order.transaction_hash,
                // from_id: from_id,
                // to_id: to_id,
                order_id: order.id
            });

            return {order, donation_transaction, from, to};
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async compensate(to_id, amount){
        try{
            // 우선, 실제 존재하는 유저인지 확인
            const to = await this.UserServiceInterface.getOneUser(to_id);

            // 이후 orderbook에 주문서 넣기
            const order = await this.Orderbook.create({
                action: 'compensate',
                amount: amount,
                status: 'before',
                from_id: process.env.SERVER_ID, // compensate는 from 존재 X. 서버 ID로 고정.
                to_id: to_id,
                transaction_hash: '0x0' // 아직 hash 없음
            })

            // 그리고 먼저 DB 처리 부터 해주기 -> user들 잔액(reward_transactions는 살릴지 말지 고민중);
            await to.update({ // 후원하는 사람
                balance: Number(to.balance) + Number(amount)
            });
            await to.save();

            return {order, to};
        }
        catch(err){
            throw Error(err.toString());
        }
    }
}

export default OrderService;