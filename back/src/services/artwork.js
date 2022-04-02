import dotenv from 'dotenv';
dotenv.config();

import Caver from 'caver-js';

import db from '../models/index.js'
import HashtagService from './hashtag.js';
import Erc721Abi from '../api/abi/erc721abi.js'
import artwork from '../models/artwork.js';

class ArtworkService {
    #myErc721Contract;
    #server;

    constructor() {
        this.Artwork = db.Artwork;
        this.User = db.User;
        this.HashtagServiceInterface = new HashtagService();

        this.caver = new Caver(process.env.BAOBAB_NETWORK);
        this.#server = this.caver.klay.accounts.wallet.add(process.env.SERVER_PRIVATEKEY);
        this.#myErc721Contract = new this.caver.klay.Contract(Erc721Abi, process.env.ERC721_ADDRESS, {
            from: this.#server.address // server Addr
        }); 
    }

    // 새로운 artwork 민팅
    async mintNewArtwork(title, desc, price, is_selling, ipfsLink, tags, creator_session) {
        try{
            // 유저 정보 추출
            const creator = await this.User.findOne({ // 세션객체에 저장된 이메일로 artwork creator id, owner id 값으로 추가 할 유저 id 추출 
                where: { user_id : creator_session} 
            });

            // nft 민팅 실행
            const receipt = await this.#myErc721Contract.methods.mintNFT(creator.address, ipfsLink)
                            .send({from: this.#server.address, to: process.env.ERC721_ADDRESS, gas: 2000000});
            
            const tokenId = parseInt(receipt.events.Transfer.returnValues.tokenId);
            console.log("new Minted tokenId: ", tokenId);

            const artwork = await this.Artwork.create({
                token_id: tokenId,
                views: 0,
                is_selling, is_selling,
                price: String(price),
                ipfsURI: ipfsLink,
                title : title, 
                desc : desc,
                creator_id: creator.id,
                owner_id: creator.id,
                collaboration_id: null,
                votes: 0
            })

            // 이후에 hashtag 연결 진행
            const success = await this.HashtagServiceInterface.makeArtworkTag(artwork.id, tags);
            return success;
        }
        catch(err){
            throw Error(err.toString());
        }

    }

    // 하나의 artwork 작품 가져옴
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

    // 하나의 artwork 정보 수정
    async putOneArtwork(artwork_id, is_selling, price, owner_id){
        try{
            const artwork = await this.getOneArtwork(artwork_id);
            await artwork.update({
                is_selling: is_selling,
                price: String(price),
                owner_id: owner_id
            });
            await artwork.save();

            return artwork;

        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // artwork를 만든 creator 정보를 조회
    async getCreatorInfo(artwork_id){
        try{
            // artwork가 존재하는지 확인
            await this.getOneArtwork(artwork_id); 

            // query 호출
            const query = `
                select users.id, name, user_id, picture, description
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

    // 모든 artwork 조회
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

    // 필터링된 작품들 조회 
    async getFilteredArtworks(tagName, forSale){
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
    async getCollectedArtworks (user_id){
        try {  
                let userId = await this.User.findOne({where: { user_id: user_id}}).catch((err) => {
                    console.log(err);
                })
                userId = user_id.dataValues.id
                const collectedArtworks =  await this.Artwork.findAll({where: {owner_id: userId}}).catch((err) => {
                    console.log(err);
                })

                return collectedArtworks;
        }   
        catch(err){
            throw Error(err.toString());
        }
    }

    // id col을 통해 구매한 작품들 조회
    async getCollectedArtworksWithId(id){
        try{
            let artworks = await this.Artwork.findAll({
                attributes: [['id', 'artwork_id'], 'title', 'ipfsURI', 'is_selling', 'price', 'views', 'creator_id', 'owner_id'],
                where: {owner_id : id},
            });

            artworks = await Promise.all(
                artworks.map(async (val) => {
                    val = val.dataValues;

                    // creator_name 호출
                    const creator_name = await this.User.findOne({
                        attributes: [['name', 'creator_name']],
                        where: {id : val.creator_id}
                    });

                    // owner_name 호출
                    const owner_name = await this.User.findOne({
                        attributes: [['name', 'owner_name']],
                        where : {id: val.owner_id}
                    });

                    const comment_count = await db.Comment.count({
                        where : { artwork_id : val.artwork_id}
                    });

                    const like_count = await db.Like.count({
                        where: {artwork_id : val.artwork_id}
                    })

                    val.like_count = like_count;
                    val.comment_count = comment_count;
                    val.creator_name = creator_name.dataValues.creator_name;
                    delete val.creator_id;
                    val.owner_name = owner_name.dataValues.owner_name;
                    delete val.owner_id;

                    return val;
                })
            );

            return artworks;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // 내가 생성한 작품들 조회
    async getCreatedArtworks (user_id){
        try {  
                let userId = await this.User.findOne({where: {user_id: user_id}}).catch((err) => {
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


    // id col을 통해 생성한 작품들 조회
    async getCreatedArtworksWithId(id, limit){
        try{
            limit = (limit === undefined ? undefined : Number(limit));
            let artworks = await this.Artwork.findAll({
                attributes: [['id', 'artwork_id'], 'title', 'ipfsURI', 'is_selling', 'price', 'views', 'creator_id', 'owner_id'],
                where: {creator_id : id},
                limit
            });

            artworks = await Promise.all(
                artworks.map(async (val) => {
                    val = val.dataValues;

                    // creator_name 호출
                    const creator_name = await this.User.findOne({
                        attributes: [['name', 'creator_name']],
                        where: {id : val.creator_id}
                    });

                    // owner_name 호출
                    const owner_name = await this.User.findOne({
                        attributes: [['name', 'owner_name']],
                        where : {id: val.owner_id}
                    });

                    const comment_count = await db.Comment.count({
                        where : { artwork_id : val.artwork_id}
                    });

                    const like_count = await db.Like.count({
                        where: {artwork_id : val.artwork_id}
                    })

                    val.like_count = like_count;
                    val.comment_count = comment_count;
                    val.creator_name = creator_name.dataValues.creator_name;
                    delete val.creator_id;
                    val.owner_name = owner_name.dataValues.owner_name;
                    delete val.owner_id;

                    return val;
                })
            );

            return artworks;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // 내가 좋아요 누른 작품들 조회
    async getFavoritedArtworks (user_id){
        try{
            const FavoritedArtworks = [];
            let userId = await this.User.findOne({where: {user_id: user_id}}).catch((err) => { // 유저 id 추출
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
    async putBoughtArtworks (user_id, artwork_id){
        try {

            let userId = await this.User.findOne({where: {user_id: user_id}}).catch((err) => { // 유저 id 추출
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
