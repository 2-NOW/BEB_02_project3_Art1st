import { Router } from "express";
import db from "../../models/index.js";
import ArtworkService from "../../services/artwork.js";
import web3 from "web3";
import bytecode721 from "../abi/bytecodeErc721.js";
import erc721abi from "../abi/erc721abi.js"; 
import dotenv from 'dotenv';
import Contract from 'web3-eth-contract';
import ipfsApi from "ipfs-api";

const ipfs = ipfsApi("ipfs.infura.io", "5001", { protocol: "https" });
Contract.setProvider('https://ropsten.infura.io/v3/ef9c534ba8bd4c47acf24ed4d6d24ccc'); // infura 연결

dotenv.config();
const env = process.env;
const router = Router();
const ArtworkServiceInstance = new ArtworkService();


async function addNewErc721Token (useraddr, ipfsLink) {
  const erc721TokenContract = await new web3.eth.Contract(erc721abi, env.CONTRACT_ADDR);
  const ERC721TokenId =  await erc721TokenContract.methods.mintNFT(useraddr, ipfsLink).send(
    {from: env.CONTRACT_ADDR, to: useraddr, gasPrice: 100, gas: 2000000},
    )   
    .on('error', (error) => {
    error = error.toString();
    const msg = 'Failed to mint new ERC721 Token.';
    res.status(500).send({error, msg});
    });

    return ERC721TokenId
};

router.post('/upload', async (req, res) => {//nft민팅
    const { buffer, nftname, nftdesc, price, is_selling } = req.body;
    console.log(buffer, nftname, nftdesc, price, is_selling);
    if (req.session.userId) {// 세션객체 없으면 에러400
        res.status(404).send('not authorized'); 
    } else {
        const userInfo = await db.User.findOne({ // 세션객체에 저장된 아이디로 artwork creator id, owner id 값으로 추가 할 유저 id 추출 컬렉션은 서버에서 생성하지만 creator id는 최초 민팅한 유저id로 고정해두고 NFT가 판매될때 owner id 만 바꿔주면 될 것 같습니다.  
            where: { user_id : req.session.user_id} 
        })
    
        console.log(userInfo)

        ipfs.add(buffer, (err, ipfsHash) => { // 전달받은 이미지 buffer로 ipfs에 이미지를 업로드한후 ipfs url 을 생성합니다 . 
            try{
                addNewErc721Token(userInfo.address, `https://ipfs.io/ipfs/${ipfsHash[0].hash}`).then((result) => {
                        const artwork = db.Artwork.create({
                            token_id: result,
                            views: 0,
                            is_selling, is_selling,
                            price: price,
                            ipfsURI: `https://ipfs.io/ipfs/${ipfsHash[0].hash}`,
                            title : nftname, 
                            desc : nftdesc,
                            creator_id: userInfo.id,
                            owner_id: userInfo.id   
                        })
                        res.status(200).send({deta : artwork, msg : "minting success"});
                    })
            } 
            catch (error) {
                return res.status(404).json(err.toString()); 
              }
        })
    }
});


// 모든 작품 정보 조회 
router.get('/getAllArtworks', async (req, res) => {
    try{
        const artworks = await ArtworkServiceInstance.getAllArtworks();
        res.status(200).json(artworks);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
});

// 필터링된 작품들 조회
router.get('/getFilteredArtworks', async (req, res) => {
    try{
        const { tagName, forSale } = req.body;
        const FilteredArtworks = await ArtworkServiceInstance.getFilteredArtworks(tagName, forSale);
        res.status(200).json(FilteredArtworks);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
});

// 내가 구매한 작품들 조회
router.get('/getCollectedArtworks', async (req, res) => { // 클라이언트에서 쿠키 전달받으면 cookie-parser 모듈로 req.cookie 객체 리턴해서 세션쿠키가 존재할경우에만 인메모리에 저장한 세션 ID로 조회하도록 구현해야함, 우선 클라이언트랑 연결 전 이여서 쿠키가 없어도 인메모리에 세션객체만 있으면 마이페이지 작품들 조회할 수 있게 했습니다.  (원래는 일정시간;로그인유효시간이 지나면 쿠키삭제되니까 세션쿠키가 요청시 없으면 권한이 없는거니까 세션객체가 있어도 404 리턴)
    try{
            if (req.session.user_id) {   
                const FilteredArtworks = await ArtworkServiceInstance.getCollectedArtworks(req.session.user_id);
                res.status(200).json(FilteredArtworks);
            } else {
                res.status(404).send('not authorized');
            }
        }
    catch(err){
        res.status(404).json(err.toString());
    }
});

//내가 생성한 작품들 조회

router.get('/getCreatedArtworks', async (req, res) => { // 클라이언트에서 쿠키 전달받으면 cookie-parser 모듈로 req.cookie 객체 리턴해서 세션쿠키가 존재할경우에만 인메모리에 저장한 세션 ID로 조회하도록 구현해야함, 우선 클라이언트랑 연결 전 이여서 쿠키가 없어도 인메모리에 세션객체만 있으면 마이페이지에서 작품들 조회할 수 있게 했습니다.  (원래는 일정시간;로그인유효시간이 지나면 쿠키삭제되니까 세션쿠키가 요청시 없으면 권한이 없는거니까 세션객체가 있어도 404 리턴)
    try{
        if (req.session.user_id) {   
            const CreatedArtworks = await ArtworkServiceInstance.getCreatedArtworks(req.session.user_id);
            res.status(200).json(CreatedArtworks);
        } else {
            res.status(404).send('not authorized');
        }
    }
    catch(err){
        res.status(404).json(err.toString());
    }
});

//내가 좋아요누른 작품들 조회
router.get('/getFavoritedArtworks', async (req, res) => { // 클라이언트에서 쿠키 전달받으면 cookie-parser 모듈로 req.cookie 객체 리턴해서 세션쿠키가 존재할경우에만 인메모리에 저장한 세션 ID로 조회, 우선 클라이언트랑 연결 전 이여서 쿠키가 없어도 인메모리에 세션객체만 있으면 마이페이지 작품들 조회할 수 있게 했습니다.  (원래는 일정시간;로그인유효시간이 지나면 쿠키삭제되니까 세션쿠키가 요청시 없으면 권한이 없는거니까 세션객체가 있어도 404 리턴)
    try{
        if (req.session.user_id) {   
            const FavoritedArtworks = await ArtworkServiceInstance.getFavoritedArtworks(req.session.user_id);
            res.status(200).json(FavoritedArtworks);
        } else {
            res.status(404).send('not authorized');
        }
    }
    catch(err){
        res.status(404).json(err.toString());
    }
});

//구매가 정상적으로 완료된 작품의 DB상 소유권을 업데이트
router.put('/putBoughtArtworks', async (req, res) => {  // 클라이언트에서 쿠키 전달받으면 cookie-parser 모듈로 req.cookie 객체 리턴해서 세션쿠키가 존재할경우에만 인메모리에 저장한 세션 ID로 조회, 우선 클라이언트랑 연결 전 이여서 쿠키가 없어도 인메모리에 세션객체만 있으면 마이페이지 작품들 조회할 수 있게 했습니다.  (원래는 일정시간;로그인유효시간이 지나면 쿠키삭제되니까 세션쿠키가 요청시 없으면 권한이 없는거니까 세션객체가 있어도 404 리턴)
    try{
        if (req.session.user_id, req.body.artwork_id) {   
            const artworks = await ArtworkServiceInstance.putBoughtArtworks(req.session.user_id, req.body.artwork_id);
            res.status(200).json(artworks);
        } else {
            res.status(404).send('not authorized');
        }
    }
    catch(err){
        res.status(404).json(err.toString());
    }
});


// nft 1의 정보 조회
router.get('/:artwork_id', async (req, res) => {
    const artwork_id = req.params.artwork_id;
    try{
        const artwork = await ArtworkServiceInstance.getOneArtwork(artwork_id);
        res.status(200).json(artwork);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
});

// nft 1의 정보 수정
router.put('/:artwork_id', async (req, res) => {
    const artwork_id = req.params.artwork_id;
    const {is_selling, price, owner_id} = req.body;
    
    try{
        const artwork = await ArtworkServiceInstance.putOneArtwork(artwork_id, is_selling, price, owner_id);
        res.status(201).json(artwork);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

// 해당 artwork_id의 작가 정보(artwork 상세 페이지 용)
router.get('/:artwork_id/creator', async (req, res) => { 
    const artwork_id = req.params.artwork_id;

    try{
        const creator_info = await ArtworkServiceInstance.getCreatorInfo(artwork_id);
        res.status(200).json(creator_info);
    }
    catch(err) {
        res.status(404).json(err.toString());
    }

});

export default router;
