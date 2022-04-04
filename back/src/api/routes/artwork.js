import dotenv from 'dotenv';
dotenv.config();

import { Router } from 'express';
import ArtworkService from '../../services/artwork.js';
import { create } from 'ipfs-http-client';

const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
});

const router = Router();
const ArtworkServiceInstance = new ArtworkService();

router.get('/', async (req, res) => {
  const { tag_id, is_selling } = req.query;
  try {
    const artworks = await ArtworkServiceInstance.getAllArtworks(
      tag_id,
      is_selling,
      undefined,
      undefined,
      undefined
    );
    res.status(200).json(artworks);
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(req);
    console.log(req.files);
    const { title, desc, isSelling, price, tags } = JSON.parse(req.body); // price 값 꼭 있어야 함. 정수형으로
    const { user_id } = req.session;
    const img = req.files.image;

    // 유저 찾기
    if (!user_id) {
      // 세션객체 없으면 에러400
      return res.status(404).send('not authorized');
    }
    // 우선 유저 추출 부분 service 단으로 뺏습니다. 필요하시면 다시 수정하셔도 되요.

    // 우선 image file을 ipfs로 변경
    const { cid } = await ipfsClient.add(img);
    const ipfsLink = 'https://ipfs.io/ipfs/' + cid;
    console.log('new NFT IPFS link: ', ipfsLink);

    // example
    // let title = "4번 제목 예시";
    // let desc = "4번 설명 예시";
    // let isSelling = false;
    // let price = 0;
    // let ipfsLink = '3nd NFT link';
    // let user_id = 'hyobin';
    // let tags = ['효', '빈'];

    // 이후 nft 민팅
    const newArtwork = await ArtworkServiceInstance.mintNewArtwork(
      title,
      desc,
      price,
      isSelling,
      ipfsLink,
      tags,
      user_id
    );

    res.status(201).json(newArtwork);
  } catch (err) {
    console.log(err.toString());
    res.status(500).json(err.toString());
  }
});

// 필터링된 작품들 조회
router.get('/getFilteredArtworks', async (req, res) => {
  try {
    const { tagName, forSale } = req.body;
    const FilteredArtworks = await ArtworkServiceInstance.getFilteredArtworks(
      tagName,
      forSale
    );
    res.status(200).json(FilteredArtworks);
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

// 내가 구매한 작품들 조회 => endpoint user/collected로 변경
router.get('/getCollectedArtworks', async (req, res) => {
  // 클라이언트에서 쿠키 전달받으면 cookie-parser 모듈로 req.cookie 객체 리턴해서 세션쿠키가 존재할경우에만 인메모리에 저장한 세션 ID로 조회하도록 구현해야함, 우선 클라이언트랑 연결 전 이여서 쿠키가 없어도 인메모리에 세션객체만 있으면 마이페이지 작품들 조회할 수 있게 했습니다.  (원래는 일정시간;로그인유효시간이 지나면 쿠키삭제되니까 세션쿠키가 요청시 없으면 권한이 없는거니까 세션객체가 있어도 404 리턴)
  try {
    if (req.session.user_id) {
      const FilteredArtworks =
        await ArtworkServiceInstance.getCollectedArtworks(req.session.user_id);
      res.status(200).json(FilteredArtworks);
    } else {
      res.status(404).send('not authorized');
    }
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

//내가 생성한 작품들 조회
router.get('/getCreatedArtworks', async (req, res) => {
  // 클라이언트에서 쿠키 전달받으면 cookie-parser 모듈로 req.cookie 객체 리턴해서 세션쿠키가 존재할경우에만 인메모리에 저장한 세션 ID로 조회하도록 구현해야함, 우선 클라이언트랑 연결 전 이여서 쿠키가 없어도 인메모리에 세션객체만 있으면 마이페이지에서 작품들 조회할 수 있게 했습니다.  (원래는 일정시간;로그인유효시간이 지나면 쿠키삭제되니까 세션쿠키가 요청시 없으면 권한이 없는거니까 세션객체가 있어도 404 리턴)
  try {
    if (req.session.user_id) {
      const CreatedArtworks = await ArtworkServiceInstance.getCreatedArtworks(
        req.session.user_id
      );
      res.status(200).json(CreatedArtworks);
    } else {
      res.status(404).send('not authorized');
    }
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

//내가 좋아요누른 작품들 조회
router.get('/getFavoritedArtworks', async (req, res) => {
  // 클라이언트에서 쿠키 전달받으면 cookie-parser 모듈로 req.cookie 객체 리턴해서 세션쿠키가 존재할경우에만 인메모리에 저장한 세션 ID로 조회, 우선 클라이언트랑 연결 전 이여서 쿠키가 없어도 인메모리에 세션객체만 있으면 마이페이지 작품들 조회할 수 있게 했습니다.  (원래는 일정시간;로그인유효시간이 지나면 쿠키삭제되니까 세션쿠키가 요청시 없으면 권한이 없는거니까 세션객체가 있어도 404 리턴)
  try {
    if (req.session.user_id) {
      const FavoritedArtworks =
        await ArtworkServiceInstance.getFavoritedArtworks(req.session.user_id);
      res.status(200).json(FavoritedArtworks);
    } else {
      res.status(404).send('not authorized');
    }
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

//구매가 정상적으로 완료된 작품의 DB상 소유권을 업데이트
router.put('/putBoughtArtworks', async (req, res) => {
  // 클라이언트에서 쿠키 전달받으면 cookie-parser 모듈로 req.cookie 객체 리턴해서 세션쿠키가 존재할경우에만 인메모리에 저장한 세션 ID로 조회, 우선 클라이언트랑 연결 전 이여서 쿠키가 없어도 인메모리에 세션객체만 있으면 마이페이지 작품들 조회할 수 있게 했습니다.  (원래는 일정시간;로그인유효시간이 지나면 쿠키삭제되니까 세션쿠키가 요청시 없으면 권한이 없는거니까 세션객체가 있어도 404 리턴)
  try {
    if (req.session.user_id && req.body.artwork_id) {
      const artworks = await ArtworkServiceInstance.putBoughtArtworks(
        req.session.user_id,
        req.body.artwork_id
      );
      res.status(200).json(artworks);
    } else {
      res.status(404).send('not authorized');
    }
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

// nft 1의 정보 조회
router.get('/:artwork_id', async (req, res) => {
  const artwork_id = req.params.artwork_id;
  try {
    const artwork = await ArtworkServiceInstance.getOneArtworkDetail(
      artwork_id
    );
    return res.status(200).json(artwork);
  } catch (err) {
    return res.status(404).json(err.toString());
  }
});

// nft 1의 판매 등록 
router.put('/:artwork_id/sale', async (req, res) => {
    const artwork_id = req.params.artwork_id;
    const price = req.body.price
    const user_id = req.session.user_id
    try{
        const artwork = await ArtworkServiceInstance.saleArtwork(artwork_id, price, user_id);
        return res.status(200).json({msg : "success", data : artwork});
    }
    catch(err){
       return res.status(404).json(err.toString());
    }
});

// nft 1의 판매 취소 
router.put('/:artwork_id/cancelSale', async (req, res) => {
    const artwork_id = req.params.artwork_id;
    const user_id = req.session.user_id

    try{
        const artwork =  await ArtworkServiceInstance.cancelSale(artwork_id, user_id);
        return res.status(200).send({msg : "success", data : artwork});
    }
    catch(err){
       return res.status(404).json(err.toString());
    }
});

// nft 1의 판매 구매 
router.post('/:artwork_id/buy', async (req, res) => {
    const artwork_id = req.params.artwork_id;
    const user_id = req.session.user_id;
    try{
        const artwork = await ArtworkServiceInstance.buyNft(user_id, artwork_id);
        return res.status(200).json(artwork);
    }
    catch(err){
       return res.status(404).json(err.toString());
    }
});

// nft 1의 정보 수정
router.put('/:artwork_id', async (req, res) => {
  const artwork_id = req.params.artwork_id;
  const { is_selling, price } = req.body;
  const { user_id } = req.session;

  try {
    if (user_id) {
      const artwork = await ArtworkServiceInstance.putOneArtwork(
        user_id,
        artwork_id,
        is_selling,
        price
      );
      res.status(201).json(artwork);
    } else {
      res.status(404).send('not authorized');
    }
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

// 해당 artwork_id의 작가 정보(artwork 상세 페이지 용)
router.get('/:artwork_id/creator', async (req, res) => {
  const artwork_id = req.params.artwork_id;

  try {
    const creator_info = await ArtworkServiceInstance.getCreatorInfo(
      artwork_id
    );
    res.status(200).json(creator_info);
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

export default router;
