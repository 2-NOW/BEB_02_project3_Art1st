import dotenv from 'dotenv';
dotenv.config();

import db from '../models/index.js';
import UserService from './user.js';

import {addAmount, subAmount, isBigger} from './utils/calculateKlay.js';
import Caver from 'caver-js';

class OrderService {
    constructor() {
        this.Orderbook = db.Orderbook;
        this.Artwork = db.Artwork;
        this.DonationTransaction = db.DonationTransaction;
        this.UserServiceInterface = new UserService();

        this.caver = new Caver(process.env.BAOBAB_NETWORK);
    }

    async donate(from_id, to_id, amount, msg){ // from_id => session.user_id
        try{
            // 우선, 실제 존재하는 유저들인지 확인
            const from = await this.UserServiceInterface.getOneUser(from_id); // user_id col
            const to = await this.UserServiceInterface.getOneUserWithID(to_id); // id col

            // -> 유효성 검사 
            if (await isBigger(from.balance, amount)) { // amount가 더 크면 true 반환.
                console.log('insufficient');
                throw Error('Insufficient Balance.');
            }

            // 이후 orderbook에 주문서 넣기
            const order = await this.Orderbook.create({
                action: 'donate',
                amount: amount,
                status: 'before',
                from_id: from.id,
                to_id: to.id,
                transaction_hash: '0x0' // 아직 hash 없음
            })

            // 그리고 먼저 DB 처리 부터 해주기 -> donation_tx랑 user들 잔액
            await from.update({ // 후원하는 사람
                balance: await subAmount(from.balance, amount)
            });
            await from.save();

            await to.update({ // 후원 받는 사람
                balance: await addAmount(to.balance, amount),
                donation_balance: await addAmount(to.donation_balance, amount)
            });
            await to.save();

            const donation_transaction = await this.DonationTransaction.create({
                message: msg,
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
                to_id: to.id,
                transaction_hash: '0x0' // 아직 hash 없음
            })

            // 그리고 먼저 DB 처리 부터 해주기 -> user들 잔액(reward_transactions는 살릴지 말지 고민중);
            await to.update({
                balance: await addAmount(to.balance, amount)
            });
            await to.save();

            return {order, to};
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async purchase(to_id, artwork_id) { // nft 기준 to. to는 돈을 내는 사람임.
        try{
            // 우선, 실제 존재하는 유저인지 확인
            const to = await this.UserServiceInterface.getOneUser(to_id); // user_col

            // 그리고 아트워크의 정보 가져오기
            // const artwork = await this.ArtworkServiceInterface.getOneArtwork(artwork_id);
            const artwork = await this.Artwork.findOne({where: {id: artwork_id}});

            // 아트워크의 소유주 정보 가져오기
            const owner = await this.UserServiceInterface.getOneUserWithID(artwork.owner_id); 

            // 유효성 검사
            // 구매자가 소유주인지 확인
            if(Number(artwork.owner_id) === Number(to.id)){ 
                throw Error('Already own this Artwork');
            }
            // 아트워크가 판매 중인지 확인
            if(artwork.is_selling === false || artwork.is_selling === "false" || artwork.is_selling === "0" || artwork.is_selling === 0){
                throw Error('Unable to Purchase Artwork');
            }
            // 잔액 확인
            if (await isBigger(to.balance, artwork.price)) { // amount가 더 크면 true 반환.
                console.log('insufficient');
                throw Error('Insufficient Balance.');
            }

            // 이후 orderbook에 주문서 넣기
            const order = await this.Orderbook.create({
                action: 'purchace',
                amount: artwork.price,
                status: 'before',
                from_id: artwork.owner_id, // from: nft 소유주
                to_id: to.id, // to: nft 구매자
                transaction_hash: '0x0',
                token_id: artwork.token_id
            })

            // 그리고 먼저 디비 처리 해주기
            // to의 잔액 차감
            await to.update({ 
                balance: await subAmount(to.balance, artwork.price)
            });
            await to.save();

            // owner의 잔액 증가
            await owner.update({
                balance: await addAmount(owner.balance, artwork.price),
                total_sales : artwork.owner_id == artwork.creator_id ? 
                                await addAmount(owner.total_sales, artwork.price) : owner.total_sales
            });
            await owner.save();

            // artwork의 소유주 바꿔주고, 판매 금지 걸어주기
            await artwork.update({
                is_selling: false,
                owner_id: Number(to.id),
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
