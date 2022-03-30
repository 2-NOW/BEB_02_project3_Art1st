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
    
    // 유저들이 많이사용한 상위 10개의 해쉬태그 조회 
    async getMostUsedArtworkTags(){
        try{
            let MostUsedArtworktags = await this.Hashtag.findAll({ // count순으로 태그 정렬
                order: [["count", "DESC"]], 
                limit: 10,
            }).catch((err) => {
                console.loc(err);
            })
            MostUsedArtworktags = MostUsedArtworktags.map(el => el.hashtag);
            return MostUsedArtworktags;

        }
        catch(err){
            throw Error(err.toString());
        }
    }
}



export default HashtagService;
