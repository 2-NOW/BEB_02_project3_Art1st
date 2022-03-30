import db from '../models/index.js';
import ArtworkService from './artwork.js';

class WantService {
    constructor() {
        this.Want = db.Want;
        this.ArtworkServiceInterface = new ArtworkService();
    }

    // user_id가 artwork_id에 사고싶어요를 누른 적이 있는지 확인
    async isWant(artwork_id, user_id){
        try{
            const isWant = await this.Want.findOne({where: {artwork_id: artwork_id, user_id: user_id}});
            if(isWant){// null이 아니면
                return true;
            }
            else{ // null이면
                return false;
            }
        }
        catch(err) {
            throw Error(err.toString());
        }
    }

    // user_id가 artwork_id에 사고싶어요를 누른 기록 조회
    async getUserArtworkWant(artwork_id, user_id) {
        try{
            const want = await this.Want.findOne({where: {artwork_id: artwork_id, user_id: user_id}});
            return want;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // artwork_id의 사고싶어요 조회
    async getArtworkWant(artwork_id) {
        try{
            await this.ArtworkServiceInterface.getOneArtwork(artwork_id);
            const wants = await this.Want.findAll({where: {artwork_id: artwork_id}});
            const count = wants.length;
            return {wants, count};
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // artwork_id에 사고싶어요 누르기
    async postArtworkWant(artwork_id, user_id) {
        try{
            await this.ArtworkServiceInterface.getOneArtwork(artwork_id);
            // 이전에 사고싶어요를 누른 적이 있는지 확인
            if(await this.isWant(artwork_id, user_id)){
                // 이전에 누른 적이 있음
                throw Error('Already pressed want');
            }
            else {
                // 이전에 누른 적 없음
                const want = await this.Want.create({
                    user_id: user_id,
                    artwork_id: artwork_id
                });
                return want;
            }
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // artwork_id에 사고싶어요 취소
    async deleteArtworkWant(artwork_id, user_id) {
        try{
            await this.ArtworkServiceInterface.getOneArtwork(artwork_id);
            // 이전에 사고싶어요를 누른 적이 있는지 확인
            if(await this.isWant(artwork_id, user_id)){
                // 이전에 사고싶어요를 누른 적이 있음
                const want = await this.getUserArtworkWant(artwork_id, user_id);
                this.Want.destroy({where:{artwork_id:artwork_id, user_id: user_id}});
                return want;
            }
            else{
                // 이전에 누른 적 없음
                throw Error('Have never pressed want before');
            }
        }
        catch(err) {
            throw Error(err.toString());
        }
    }
}

export default WantService;