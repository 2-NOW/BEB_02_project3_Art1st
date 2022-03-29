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
        this.Like = db.Like;
        this.Hashtag = db.Hashtag;
        this.ArtworkHashtag = db.ArtworkHashtag;
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

    async getAllArtworks(){
        try{
            const artworks = await this.Artwork.findAll().catch((err) => {
                console.log(err);
            })
            return artworks
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async getFilteredArtworks(tagName, forSale){// 필터링된 작품들 조회 
        console.log(tagName, forSale);
        try{
            if(tagName !== null && forSale === 0){ // 태그에 해당되는 작품들 조회 
                let FilteredArtworks = [];
                let FilteredHashtagId = await this.Hashtag.findOne( 
                    {where: {hashtag: tagName}}
                )
                FilteredHashtagId = FilteredHashtagId.id

                const FilteredArtworksId = await this.ArtworkHashtag.findAll( 
                    {where: {hashtag_id: FilteredHashtagId}}
                )
                for(let i=0; i < FilteredArtworksId.length; i++){
                    FilteredArtworks[i] = await this.Artwork.findOne({ // 
                        where : { id : FilteredArtworksId[i].artwork_id}
                    });
                }
                return FilteredArtworks;
            } else if (forSale === 1 && tagName === null){ // 판매중인 작품들 조회
                const FilteredArtworks =  await this.Artwork.findAll( 
                    {where: {is_selling: 1}}
                )
                return FilteredArtworks;
            } else {    // 요청한 태그에 해당되면서 판매중인 작품들 조회
                let FilteredArtworks = [];
                let FilteredHashtagId = await this.Hashtag.findOne( 
                    {where: {hashtag: tagName}}
                )
                FilteredHashtagId = FilteredHashtagId.id

                const FilteredArtworksId = await this.ArtworkHashtag.findAll( 
                    {where: {hashtag_id: FilteredHashtagId}}
                )
                for(let i=0; i < FilteredArtworksId.length; i++){
                    FilteredArtworks[i] = await this.Artwork.findOne({ // 
                        where : { id : FilteredArtworksId[i].artwork_id, is_selling : 1}
                    });
                }
                return FilteredArtworks;
            }
            
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // 내가 구매한 작품들 조회
    async getCollectedArtworks (_email){
        try {  
                let userId = await this.User.findOne({where: { email: _email}}).catch((err) => {
                    console.log(err);
                })
                userId = userId.dataValues.id
                const collectedArtworks =  await this.Artwork.findAll({where: {owner_id: userId}}).catch((err) => {
                    console.log(err);
                })

                return collectedArtworks;
        }   
        catch(err){
            throw Error(err.toString());
        }
    }

    // 내가 생성한 작품들 조회
    async getCreatedArtworks (_email){
        try {  
                let userId = await this.User.findOne({where: {email: _email}}).catch((err) => {
                    console.log(err);
                })
                userId = userId.dataValues.id

                const CreatedArtworks =  await this.Artwork.findAll({where: {creator_id: userId}}).catch((err) => {
                    console.log(err);
                })

                return CreatedArtworks;
        }   
        catch(err){
            throw Error(err.toString());
        }
    }

    // 내가 좋아요 누른 작품들 조회
    async getFavoritedArtworks (_email){
        try{
            const FavoritedArtworks = [];
            let userId = await this.User.findOne({where: {email: _email}}).catch((err) => { // 유저 id 추출
                console.log(err);
            })
            userId = userId.dataValues.id

            let artworkId = await this.Like.findAll({where: {user_id: userId}}) // 내가 좋아요 누른 artworkid 추출
            
            artworkId = artworkId.map((el) => {
                return el.dataValues.artwork_id;
            })
            console.log(artworkId)
            
            for(let i=0; i < artworkId.length; i++){
                FavoritedArtworks[i] = await  this.Artwork.findOne({where: {id: artworkId[i]}}).catch((err) => { // 추출한 artworkid로 작품조회 
                    console.log(err);
                })
            }
            return FavoritedArtworks;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    //  작품 구매 DB 소유권 업데이트 
    async putBoughtArtworks (_email, artwork_id){
        try {

            let userId = await this.User.findOne({where: {email: _email}}).catch((err) => { // 유저 id 추출
                console.log(err);
            })
            userId = userId.dataValues.id

            const artwork = await this.getOneArtwork(artwork_id);
            await artwork.update({
                is_selling: 0, // 구매하면 일단 판매 x?? 구매 후 판매 하려면 다시 판매등록 해야한다고 가정해서 판매x로 일단 했습니다. 
                owner_id: userId
            });
            await artwork.save();
            return artwork;
        }
        catch (err){
            throw Error(err.toString());
        }
    }
}

export default ArtworkService;
