import db from '../models/index.js'
import OrderService from './order.js';
import {addAmount, subAmount, isBigger, floating} from './utils/calculateKlay.js';

class VoteService {
    constructor() {
        this.Vote = db.Vote;
        this.Artwork = db.Artwork;
        this.User = db.User;
        this.OrderServiceInstance = new OrderService();
    }
    // artwork_id
    async voteForTheArtwork(collaboration_id, artwork_id, user_id) {
        try{
            // 작품 상세페이지에 들어갔을때 vote 테이블을 해당 유저 ID로 조회해 그 작품에 투표했는지 확인하느냐, 
            // 아니면 투표요청을 날렸을때 vote 테이블을 까서 작품에 이미 투표했으면 에러를 리턴하느냐 정해야 할듯. 
            // 후자는 유저가 투표버튼을 클릭해야 투표했는지 알수있는데 전자로 구현하면 artwork detail 페이지에 들어가자마자 
            // 투표여부정보를 조회하기때문에 투표 UI를 숨기는식으로 구현하면 더 유저 친화적일 수 있다고 생각합니다. 

            let user = await this.User.findOne({where: {user_id: user_id}});
            if(user === null){
                throw Error('Not Found User');
            }

            let artwork = await this.Artwork.findOne({where: {id: artwork_id, collaboration_id: collaboration_id}});
            if(artwork === null){
                throw Error('Invalid Artwork');
            }

            // 유저에게 토큰이 있는지 확인
            if(await isBigger(user.balance, '1')){
                throw Error('Insufficient Balance');
            }

            // 투표 진행(투표 수 증가)
            await this.Artwork.increment(
                {count_votes : 1}, {where : {id : artwork_id}}
            ).catch((err) => {
                throw Error(err.toString());
            })

            // 투표 진행(투표 레코드 추가)
            const vote = await this.Vote.create({
                user_id: user.id,
                artwork_id: artwork_id
            });

            // 1토큰 감소
            await user.update({
                balance: await subAmount(user.balance, '1')
            });
            await user.save();

            // 이후 주문서 작성
            await this.OrderServiceInstance.vote(user.id, collaboration_id, artwork_id);

            return vote;
        }
        catch(err) {
            throw Error(err.toString());
        }
    }
}

export default VoteService;
