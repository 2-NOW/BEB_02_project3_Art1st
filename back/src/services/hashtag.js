import db from '../models/index.js'

// mysql> desc hashtags;
// +-----------+-------------+------+-----+---------+----------------+
// | Field     | Type        | Null | Key | Default | Extra          |
// +-----------+-------------+------+-----+---------+----------------+
// | id        | int         | NO   | PRI | NULL    | auto_increment |
// | hashtag   | varchar(20) | NO   |     | NULL    |                |
// | count     | int         | NO   |     | NULL    |                |
// | createdAt | datetime    | NO   |     | NULL    |                |
// | updatedAt | datetime    | NO   |     | NULL    |                |
// +-----------+-------------+------+-----+---------+----------------+

// mysql> desc artwork_hashtags;
// +------------+----------+------+-----+---------+----------------+
// | Field      | Type     | Null | Key | Default | Extra          |
// +------------+----------+------+-----+---------+----------------+
// | id         | int      | NO   | PRI | NULL    | auto_increment |
// | createdAt  | datetime | NO   |     | NULL    |                |
// | updatedAt  | datetime | NO   |     | NULL    |                |
// | artwork_id | int      | YES  | MUL | NULL    |                |
// | hashtag_id | int      | YES  | MUL | NULL    |                |
// +------------+----------+------+-----+---------+----------------+

class HashtagService {
    constructor(){
        this.Hashtag = db.Hashtag;
        this.ArtworkHashtag = db.ArtworkHashtag;
    }
    
    // artwork_id의 hashtag 조회
    async getArtworkTag(artwork_id){
        try{
            let hashtags = await this.Hashtag.findAll({
                attributes: ['hashtag'],
                include: [{
                    attributes: [],
                    model: this.ArtworkHashtag,
                    where: {
                        artwork_id : artwork_id,
                    }
                }]
            });

            hashtags = hashtags.map((tag)=> {
                return tag.hashtag;
            })

            console.log(hashtags); 
            return hashtags;
        }
        catch(err){
            throw Error(err.toString());
        }
    }
}



export default HashtagService;