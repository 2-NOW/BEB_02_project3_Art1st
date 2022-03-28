import db from '../models/index.js'

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