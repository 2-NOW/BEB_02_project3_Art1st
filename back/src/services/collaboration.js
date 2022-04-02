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

    // artwork_id에 댓글 하나 추가
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
