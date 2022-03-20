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

class ArtworkCalss {
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

    async putOneArtwork(artwork_id, new_artwork_data){
        try{
            const artwork = await this.getOneArtwork(artwork_id);
            await artwork_profile.update({
                is_selling: new_artwork_data.is_selling,
                price: new_artwork_data.price,
                owner_id: new_artwork_data.owner_id
            });
            await artwork_profile.save();

            return artwork_profile;

        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async getCreatorInfo(artwork_id){
        try{
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
                    raw: true
                }
            )

            console.log(creator_info);

        }
        catch(err){
            throw Error(err.toString());
        }
    }

}

export default ArtworkCalss;