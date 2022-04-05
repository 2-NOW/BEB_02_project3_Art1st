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
    
    async makeArtworkTag(artwork_id, tags) {
        try{

            for (let tag of tags) {
                // 먼저 tag들을 hashtag 디비에 넣어주기
                const [hashtag, created] = await this.Hashtag.findOrCreate({
                    where: {hashtag : tag},
                    defaults: {
                        count: 0
                    }
                });

                hashtag.update({count: Number(hashtag.count) + 1});
                hashtag.save();

                // 그 다음 hashtag랑 nft 연결
                await this.ArtworkHashtag.create({
                    artwork_id: artwork_id,
                    hashtag_id: hashtag.id
                });
            }

            return true;
        }
        catch(err) {
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
            MostUsedArtworktags = MostUsedArtworktags.map(el => {
                return {id: el.id, hashtag: el.hashtag}
            });
            return MostUsedArtworktags;

        }
        catch(err){
            throw Error(err.toString());
        }
    }
}



export default HashtagService;
