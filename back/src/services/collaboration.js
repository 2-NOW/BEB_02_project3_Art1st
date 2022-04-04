import db from '../models/index.js'

class CollaborationService {
    constructor() {
        this.Collaboration = db.Collaboration;
        this.Artwork = db.Artwork;
    }

    // 콜라보레이션 전체조회
    async getAllCollaboration() {
        try{
            const collaborations = await this.Collaboration.findAll();
            return collaborations;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async getAboutCollaboration(collaboration_id) {
        try{
            const collaboration = await this.Collaboration.findOne({
                where : { id : collaboration_id }
            });
            return collaboration;
        }
        catch(err) {
            throw Error(err.toString());

        }
    }

    async postEntriesArtworks(collaboration_id, artwork_id, user_id) {
        try{
            // 제한 사항
            // 1. user_id가 작가이면서 소유주여야 함
            // 2. 다른 collaboration에 참가하는 중이면 안됨
            // 3. 판매 등록 중이 아니어야 함
            const artwork = await this.Artwork.findOne({ where: {id: artwork_id }});
            if(artwork === null) {
                throw Error('Not Found Artwork');
            }
            const user_info = await db.User.findOne({where: {user_id : user_id}});

            // user_id가 작가이면서 소유주여야 함
            if(artwork.owner_id != artwork.creator_id || artwork.creator_id != user_info.id){
                throw Error('Nonauthorized');
            }

            // 다른 collaboration에 참가하는 중이면 안됨
            if(artwork.collaboration_id != null){
                throw Error('Already entried in collaboration');
            }

            // 판매 등록 중이 아니어야 함
            if(artwork.is_selling != false || artwork.is_selling != 0){
                throw Error('On sale artwork');
            }

            // collaboration 등록
            await artwork.update({
                collaboration_id : collaboration_id
            });
            await artwork.save();

            return true;
                    
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async getWinnerArtworks(collaboration_id) {
        try{
            const winnerArtworks = await this.Artwork.findAll({
                where : { collaboration_id : collaboration_id },
                order: [["count_votes", "DESC"]], 
                limit: 5,
            });
     
            return winnerArtworks;
        }
        catch(err) {
            throw Error(err.toString());

        }
    }

    async getEntriesArtworks(collaboration_id) {
        try{
            const winnerArtworks = await this.Artwork.findAll({
                where : { collaboration_id : collaboration_id }
            });
            return winnerArtworks;
        }
        catch(err) {
            throw Error(err.toString());

        }
    }
}

export default CollaborationService;
