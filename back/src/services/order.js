import dotenv from 'dotenv';
dotenv.config();

import db from '../models/index.js';
import ArtworkService from './artwork.js';
import UserService from './user.js';

class OrderService {
    constructor() {
        this.Orderbook = db.Orderbook;
        this.DonationTransaction = db.DonationTransaction;
        this.UserServiceInterface = new UserService();
        this.ArtworkServiceInterface = new ArtworkService;
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

    async purchase(to_id, artwork_id) {
        try{
            // 우선, 실제 존재하는 유저인지 확인
            const to = await this.UserServiceInterface.getOneUser(to_id);
            // 잔액 조회
            const to_bal = Number(to.balance);

            // 그리고 아트워크의 정보 가져오기
            const artwork = await this.ArtworkServiceInterface.getOneArtwork(artwork_id);
            const art_price = Number(artwork.price);

            // 아트워크의 소유주 정보 가져오기
            const owner = await this.UserServiceInterface.getOneUser(artwork.owner_id);

            // 유효성 검사
            // 구매자가 소유주인지 확인
            if(Number(artwork.owner_id) === Number(to_id)){
                throw Error('Already own this Artwork');
            }
            // 아트워크가 판매 중인지 확인
            if(artwork.is_selling === false || artwork.is_selling === "false"){
                throw Error('Unable to Purchase Artwork');
            }
            // 잔액 확인
            if(to_bal < art_price){
                throw Error('Insufficient Balance.');
            }

            // 이후 orderbook에 주문서 넣기
            const order = await this.Orderbook.create({
                action: 'purchace',
                amount: art_price,
                status: 'before',
                from_id: artwork.owner_id, // from: nft 소유주
                to_id: Number(to_id), // to: nft 구매자
                transaction_hash: '0x0',
                token_id: artwork.token_id
            })

            // 그리고 먼저 디비 처리 해주기
            // to의 잔액 차감
            await to.update({ // 후원하는 사람
                balance: to_bal - art_price
            });
            await to.save();

            // owner의 잔액 증가
            await owner.update({
                balance: Number(owner.balance) + art_price
            });
            await owner.save();

            // artwork의 소유주 바꿔주고, 판매 금지 걸어주기
            await artwork.update({
                is_selling: false,
                owner_id: Number(to_id),
                price: 0
            });
            await artwork.save();

            return {order, to, owner, artwork};
        }
        catch(err){
            throw Error(err.toString());
        }
    }
}

export default OrderService;