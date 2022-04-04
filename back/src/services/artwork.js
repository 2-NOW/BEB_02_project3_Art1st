import dotenv from 'dotenv';
dotenv.config();

import Caver from 'caver-js';

import db from '../models/index.js';
import HashtagService from './hashtag.js';
import OrderService from './order.js';
import Erc721Abi from '../api/abi/erc721abi.js'
import UserService from './user.js';

class ArtworkService {
  #myErc721Contract;
  #server;

  constructor() {
    this.Artwork = db.Artwork;
    this.User = db.User;
    this.Like = db.Like;
    this.Hashtag = db.Hashtag;
    this.ArtworkHashtag = db.ArtworkHashtag;
    this.HashtagServiceInterface = new HashtagService();
    this.OrderServiceInterface = new OrderService();
    this.UserServiceInterface = new UserService();


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
                count_votes : 0,
                collaboration_id: null,
                votes: 0
            })

            this.OrderServiceInterface.compensate(creator_session, 3);

            // 이후에 hashtag 연결 진행
            const success = await this.HashtagServiceInterface.makeArtworkTag(artwork.id, tags);
            return success;

        }
        catch(err){
            throw Error(err.toString());
        }
    }

  // 하나의 artwork 작품 가져옴
  async getOneArtwork(artwork_id) {
    try {
      const artwork = await this.Artwork.findOne({ where: { id: artwork_id } });
      if (artwork) {
        return artwork;
      } else {
        throw Error('Not found artwork');
      }
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // 하나의 artwork 정보 수정
  async putOneArtwork(user_id, artwork_id, is_selling, price) {
    try {
      const artwork = await this.getOneArtwork(artwork_id);
      // user_id가 artwork의 소유주인지 확인
      const my_info = await this.User.findOne({ where: { user_id: user_id } });
      if (my_info === null) {
        throw Error('Not Found User');
      }

      if (my_info.id != artwork.owner_id) {
        throw Error('not authorized');
      }

      await artwork.update({
        is_selling: is_selling,
        price: String(price),
      });
      await artwork.save();

      return artwork;
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // 하나의 artwork에 대한 디테일한 정보 가져오기(detail page 용)
  async getOneArtworkDetail(artwork_id) {
    let artworkInfo = await this.Artwork.findOne({
      attributes: [
        ['id', 'artwork_id'],
        'title',
        ['desc', 'description'],
        ['ipfsURI', 'image'],
        'is_selling',
        'price',
        'views',
        'creator_id',
        'owner_id',
        'createdAt',
      ],
      where: { id: artwork_id },
    });

    const additionalInfo = await this.getOneArtworkAdditional(
      artwork_id,
      artworkInfo.dataValues.creator_id,
      artworkInfo.dataValues.owner_id
    );

    return Object.assign({}, artworkInfo.dataValues, additionalInfo);
  }

  // 하나의 artwork에 대해 부차적인 정보 가져오기
  async getOneArtworkAdditional(artwork_id, creator_id, owner_id) {

    const hashtags = await this.HashtagServiceInterface.getArtworkTag(artwork_id);

    const creator_name = await this.User.findOne({
      attributes: [['name', 'creator_name']],
      where: { id: creator_id },
    });

    const owner_name = await this.User.findOne({
      attributes: [['name', 'owner_name']],
      where: { id: owner_id },
    });

    const like_count = await db.Like.count({
      where: { artwork_id: artwork_id },
    });

    const want_count = await db.Want.count({
      where: { artwork_id: artwork_id },
    });

    const comment_count = await db.Comment.count({
      where: { artwork_id: artwork_id },
    });

    return Object.assign({}, 
      creator_name.dataValues, 
      owner_name.dataValues, 
      {like_count, want_count, comment_count, hashtags});
  }

  // artwork를 만든 creator 정보를 조회
  async getCreatorInfo(artwork_id) {
    try {
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
            `;
      const creator_info = await db.sequelize.query(query, {
        raw: true,
        type: db.Sequelize.QueryTypes.SELECT,
      });

      // QueryTypes.SELECT 추가 -> 객체에 동일한 data가 두 번씩 조회되는 버그 위해 추가
      // The first object is the result object, the second is the metadata object (containing affected rows etc)
      // but in mysql, those two are equal.
      // Passing { type: Sequelize.QueryTypes.SELECT } as the second argument will give you a single result object
      // (metadata object omitted)
      // -> 참고 : https://stackoverflow.com/questions/33232147/sequelize-query-returns-same-result-twice

      return creator_info[0];
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // 모든 artwork 조회
  async getAllArtworks(tag_id, is_selling, owner_id, creator_id, limit) {
    // is_selling: 0이면 false, 1이면 true
    limit = limit === undefined ? undefined : Number(limit);
    const options = {
      where: {},
      attributes: [
        ['id', 'artwork_id'],
        'title',
        'ipfsURI',
        'is_selling',
        'price',
        'views',
        'creator_id',
        'owner_id',
      ],
      include: [],
      limit,
    };

    if (tag_id !== undefined) {
      options.include = [
        {
          attributes: [],
          model: db.ArtworkHashtag,
          where: { hashtag_id: tag_id },
        },
      ];
    }
    if (is_selling !== undefined) {
      options.where = { is_selling };
    }
    if (owner_id !== undefined) {
      options.where = { owner_id };
    }
    if (creator_id !== undefined) {
      options.where = { creator_id };
    }

    try {
      let artworks = await this.Artwork.findAll(options);

      artworks = await Promise.all(
        artworks.map(async (val) => {
          val = val.dataValues;
          const additionalInfo = await this.getOneArtworkAdditional(
            val.artwork_id,
            val.creator_id,
            val.owner_id
          );
          delete val.creator_id;
          delete val.owner_id;
          delete additionalInfo.want_count;
          return Object.assign({}, val, additionalInfo);
        })
      );
      return artworks;
    } catch (err) {
      throw Error(err.toString());
    }
  }

    // 필터링된 작품들 조회
    async getFilteredArtworks(tagName, forSale) {
        console.log(tagName, forSale);
        try {
          if (tagName !== null && forSale === 0) {
            // 태그에 해당되는 작품들 조회
            let FilteredArtworks = [];
            let FilteredHashtagId = await this.Hashtag.findOne({
              where: { hashtag: tagName },
            });
            FilteredHashtagId = FilteredHashtagId.id;
    
            const FilteredArtworksId = await this.ArtworkHashtag.findAll({
              where: { hashtag_id: FilteredHashtagId },
            });
            for (let i = 0; i < FilteredArtworksId.length; i++) {
              FilteredArtworks[i] = await this.Artwork.findOne({
                where: { id: FilteredArtworksId[i].artwork_id },
              });
            }
            return FilteredArtworks;
          } else if (forSale === 1 && tagName === null) {
            // 판매중인 작품들 조회
            const FilteredArtworks = await this.Artwork.findAll({
              where: { is_selling: 1 },
            });
            return FilteredArtworks;
          } else {    // 요청한 태그에 해당되면서 판매중인 작품들 조회
            let FilteredArtworks = [];
            let FilteredHashtagId = await this.Hashtag.findOne( 
                {where: { hashtag: tagName }}
            )
            FilteredHashtagId = FilteredHashtagId.id

            const FilteredArtworksId = await this.ArtworkHashtag.findAll( 
                {where: { hashtag_id: FilteredHashtagId }}
            )
            console.log(FilteredArtworksId)
            for(let i=0; i < FilteredArtworksId.length; i++){
                const result = await this.Artwork.findOne({ 
                    where : { id : FilteredArtworksId[i].artwork_id, is_selling : 1}
                });
                if(result){
                    FilteredArtworks.push(result);
                }
            }
            return FilteredArtworks;
            }
        } catch (err) {
          throw Error(err.toString());
        }
      }

  // 내가 구매한 작품들 조회
  async getCollectedArtworks(user_id) {
    try {
      let userId = await this.User.findOne({ where: { user_id: user_id } });
      if (userId === null) {
        throw Error('Not found user');
      }

      userId = userId.dataValues.id;
      const collectedArtworks = await this.getAllArtworks(
        undefined,
        undefined,
        userId,
        undefined,
        undefined
      );

      return collectedArtworks;
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // 내가 생성한 작품들 조회
  async getCreatedArtworks(user_id) {
    try {
      let userId = await this.User.findOne({ where: { user_id: user_id } });
      if (userId === null) {
        throw Error('Not found user');
      }

      userId = userId.dataValues.id;
      const CreatedArtworks = await this.getAllArtworks(
        undefined,
        undefined,
        undefined,
        userId,
        undefined
      );

      return CreatedArtworks;
    } catch (err) {
      throw Error(err.toString());
    }
  }

    // 내가 좋아요 누른 작품들 조회
  async getFavoritedArtworks(user_id) {
    try {
      const FavoritedArtworks = [];

      let userId = await this.User.findOne({ where: { user_id: user_id } }); // 유저 id 추출
      if (userId === null) {
        throw Error('Not found user');
      }
      userId = userId.dataValues.id;

      let artworkId = await this.Like.findAll({ where: { user_id: userId } }); // 내가 좋아요 누른 artworkid 추출

      artworkId = artworkId.map((el) => {
        return el.dataValues.artwork_id;
      });

      for (let i = 0; i < artworkId.length; i++) {
        // 추출한 artworkid로 작품조회
        let artworkInfo = await this.Artwork.findOne({
          attributes: [
            ['id', 'artwork_id'],
            'title',
            'ipfsURI',
            'is_selling',
            'price',
            'views',
            'creator_id',
            'owner_id',
          ],
          where: { id: artworkId[i] },
        });

        const additionalInfo = await this.getOneArtworkAdditional(artworkId[i], artworkInfo.dataValues.creator_id, artworkInfo.dataValues.owner_id);
        FavoritedArtworks[i] = Object.assign({}, artworkInfo.dataValues, additionalInfo);
      }
    } catch (err) {
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

    async buyNft(to_id, artwork_id){ // nft 기준 to. to는 돈을 내는 사람임.
        try {
            const result = await this.OrderServiceInterface.purchase(to_id, artwork_id);
            return result
        } catch (err){
            throw Error(err.toString());
        }
    }

    async saleArtwork (artwork_id, price, user_id){
        try{
            // 우선, 실제 존재하는 유저인지 확인
            const userId = await this.UserServiceInterface.getOneUser(user_id);

            // 아트워크 가져오기
            const artwork = await this.Artwork.findOne({where: {id: artwork_id}});
    
            // 유효성 검사
            // 소유주인지 확인
            if(Number(artwork.owner_id) !== Number(userId.id)){ 
                throw Error('Not owner of this Artwork');
            }
            // 판매중인지 확인 
            if(artwork.is_selling){
                throw Error('already on sale');
            }

            await artwork.update({
                is_selling: 1, // 구매하면 일단 판매 x?? 구매 후 판매 하려면 다시 판매등록 해야한다고 가정해서 판매x로 일단 했습니다. 
                price: price
            });
            await artwork.save();
            return artwork;
        } catch (err){
            throw Error(err.toString());
        }
     
    }

    async cancelSale (artwork_id, user_id){
        try {
            // 우선, 실제 존재하는 유저인지 확인
            const userId = await this.UserServiceInterface.getOneUser(user_id);

            // 아트워크 가져오기
            const artwork = await this.Artwork.findOne({where: {id: artwork_id}});


            // 유효성 검사
            // 소유주인지 확인
            if(Number(artwork.owner_id) !== Number(userId.id)){ 
                throw Error('Not owner of this Artwork');
            }
            // 판매중인지 확인 
            if(!artwork.is_selling){
                throw Error('already not on sale');
            }

            await artwork.update({
                is_selling: 0, // 구매하면 일단 판매 x?? 구매 후 판매 하려면 다시 판매등록 해야한다고 가정해서 판매x로 일단 했습니다. 
                price: 0
            });
            await artwork.save();
            return artwork;
        } catch (err){
            throw Error(err.toString());
        }
    }
}

export default ArtworkService;
