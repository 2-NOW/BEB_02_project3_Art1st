import db from '../models/index.js'

// mysql> desc artworks;
// +------------+------------+------+-----+---------+----------------+
// | Field      | Type       | Null | Key | Default | Extra          |
// +------------+------------+------+-----+---------+----------------+
// | id         | int        | NO   | PRI | NULL    | auto_increment |
// | token_id   | int        | NO   |     | NULL    |                |
// | views      | int        | NO   |     | NULL    |                |
// | is_selling | tinyint(1) | NO   |     | NULL    |                |
// | price      | int        | NO   |     | NULL    |                |
// | createdAt  | datetime   | NO   |     | NULL    |                |
// | updatedAt  | datetime   | NO   |     | NULL    |                |
// | creator_id | int        | YES  | MUL | NULL    |                |
// | owner_id   | int        | YES  | MUL | NULL    |                |
// +------------+------------+------+-----+---------+----------------+

class ArtworkService {
    constructor() {
        this.Artwork = db.Artwork;
        this.User = db.User;
    }

    async getOneArtwork(artwork_id){
        try{
            const artwork = await this.Artwork.findOne({where: {id: artwork_id}});
            if(artwork){
                return artwork;
            }
            else{
                throw Error('Not found artwork');
            }
        }
        catch(err){
            throw Error(err.toString());
        }

    }

    async putOneArtwork(artwork_id, is_selling, price, owner_id){
        try{
            const artwork = await this.getOneArtwork(artwork_id);
            await artwork.update({
                is_selling: is_selling,
                price: price,
                owner_id: owner_id
            });
            await artwork.save();

            return artwork;

        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async getCreatorInfo(artwork_id){
        try{
            // artwork가 존재하는지 확인
            await this.getOneArtwork(artwork_id); 

            // query 호출
            const query = `
                select users.id, name, email, picture, description
                from users
                join artworks
                on (users.id = artworks.creator_id and artworks.id = ${artwork_id})
                join profiles
                on (profiles.user_id = artworks.creator_id);
            `
            const creator_info = await db.sequelize.query(
                query,
                {
                    raw: true,
                    type: db.Sequelize.QueryTypes.SELECT 
                }
            )
            
            // QueryTypes.SELECT 추가 -> 객체에 동일한 data가 두 번씩 조회되는 버그 위해 추가
            // The first object is the result object, the second is the metadata object (containing affected rows etc)
            // but in mysql, those two are equal.
            // Passing { type: Sequelize.QueryTypes.SELECT } as the second argument will give you a single result object 
            // (metadata object omitted)
            // -> 참고 : https://stackoverflow.com/questions/33232147/sequelize-query-returns-same-result-twice

            return creator_info[0];

        }
        catch(err){
            throw Error(err.toString());
        }
    }

}

export default ArtworkService;