import { Router } from "express";
// import db from "../../models/index.js";
import ArtworkService from "../../services/artwork.js";
// import web3 from "web3";
// import bytecode721 from "../abi/bytecodeErc721.js";
// import erc721abi from "../abi/erc721abi.js"; 
import dotenv from 'dotenv';
dotenv.config();
const env = process.env;
const router = Router();
const ArtworkServiceInstance = new ArtworkService();

// async function deployToken() { //erc721컨트랙트배포함수 서버계정으로 배포
//   try {
//       await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY); // 
//       const contract = new web3.eth.Contract(erc721abi, env.SERVER_ADDRESS);
//       const receipt = contract
//           .deploy({ data: bytecode721, arguments: ["artist", "ARTC"] })
//           .send({ from: env.SERVER_ADDRESS, gas: 2000000, gasPrice: "10000000000" })
//           .then("transactionHash", async function (hash) {       
//           });
//       return receipt;
//   } catch (e) {
//       console.log(e);
//   }
// }
// async function addNewErc721Token (contractAddr) {
//   const tokenContract = await new web3.eth.Contract(erc721abi, contractAddr);

//   const name = await tokenContract.methods.owner().call();
//   const symbol = await tokenContract.methods.symbol().call();
//   const totalSupply = await tokenContract.methods.totalSupply().call();

//   let arr = [];
//   for (let i = 1; i <= totalSupply; i++) {
//     arr.push(i);
//   }

//   for (let tokenId of arr) {
//     let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
//     console.log(tokenOwner, '==?', account);
//     if (String(tokenOwner).toLowerCase() === account) {
//       let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
//       setErc721list((prevState) => {
//         return [...prevState, { name, symbol, tokenId, tokenURI }];
//       });
//     }
//   }
// };

// //nft민팅
// router.post('/upload', async (req, res) => {
//     if (!req.session.userId) {// 세션ID 없으면 에러400
//         res.status(400).send('bad requset'); 
//     } else {
//       let userInfo = await db.User.findOne({
//         where: { email : req.session.userId }
//       });
//       if(userInfo.contractAddr !== ""){
//         addNewErc721Token(userInfo.contractAddr).then(() => {
//           res.status(200).send({msg : "minting success"});
//         })
//       } else {
//         deployToken().then((hash) => {//userInfo 테이블에 컨트랙트 주소가 없으면 최초업로드 작가임으로 컬렉션 생성
//           console.log(hash._address);
//           await db.User.update({contractAddr: hash._address });//db에 생성한 컬렌션의 컨트랙트주소 저장
//           await db.User.save();
//           userInfo = await db.User.findOne({
//             where: { email : req.session.userId }
//           });
//           addNewErc721Token(userInfo.contractAddr).then(() => {
//             res.status(200).send({contractAddr : hash._address, msg : "minting success"});//컬렉션 생성하고 배포한 컨트랙트주소값 반환
//           })
//         });

//       }       
//     }
// });


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
