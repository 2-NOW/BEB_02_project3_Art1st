import db from '../models/index.js'


class MainService {
    constructor() {
        this.User = db.User;
        this.Profile = db.Profile;
        this.Artwork = db.Artwork;
    }

    async getBanner(){
        try{
            const banner = await db.Artwork.findOne({
                attributes: ['id', 'ipfsURI'],
                order: [["views", "DESC"]],
                limit: 1
            });
            
            return banner; // artworks가 하나도 없으면 빈 배열 반환
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async getRandomCreator(){
        try{
            const data = [];
            const creators = await this.Artwork.findAll({
                attributes: [
                    [db.Sequelize.fn('DISTINCT', db.Sequelize.col('creator_id')), 'creator_id']
                ],
                order: db.Sequelize.literal('rand()'),
                limit: 24,
            });
    
            if(creators.length === 0) return data;
            
            for(let creator of creators) {
                const id = creator.dataValues.creator_id;
                const {name} = await this.User.findOne({where : {id: id}});
                const {picture} = await this.Profile.findOne({where: {user_id: id}});
    
                data.push({id, name, picture});
            }
    
            return data;

        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async getMain(){
        try{
            const banner = await this.getBanner();
            const creators = await this.getRandomCreator();
            return {banner, creators};
        }
        catch(err){
            throw Error(err.toString());
        }
    }
}

export default MainService;