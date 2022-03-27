import { Router } from "express";
import db from "../../models/index.js";
import ArtworkService from "../../services/artwork.js";
import web3 from "web3";
import bytecode721 from "../abi/bytecodeErc721.js";
import erc721abi from "../abi/erc721abi.js"; 
import dotenv from 'dotenv';
import Contract from 'web3-eth-contract'
Contract.setProvider('https://ropsten.infura.io/v3/ef9c534ba8bd4c47acf24ed4d6d24ccc');

dotenv.config();
const env = process.env;
const router = Router();
const ArtworkServiceInstance = new ArtworkService();

// async function deployToken(recipient) { //erc721컨트랙트배포함수 서버계정으로 배포
//   try {
//       await web3.eth.accounts.wallet.add(env.SERVER_PRIVATEKEY); //
//       const contract = new web3.eth.Contract(erc721abi, env.SERVER_ADDRESS);
//       const receipt = contract
//           .deploy({ data: bytecode721, arguments: ["artist", "ARTC"] })
//           .send({ from: SERVER_ADDRESS, gas: 2000000, gasPrice: "10000000000" })
//           .then("transactionHash", async function (hash) {       
//           });
//       return receipt;
//   } catch (e) {
//       console.log(e);
//   }
// }
// async function addNewErc721Token () {
//   const tokenContract = await new web3.eth.Contract(erc721abi, env.CONTRACT_ADDR);

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

//nft민팅
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
//           db.User.update({contractAddr: hash._address });//db에 생성한 컬렌션의 컨트랙트주소 저장
//           db.User.save();
//           userInfo = db.User.findOne({
//             where: { email : req.session.userId }
//           });
//           addNewErc721Token(userInfo.contractAddr).then(() => {
//             res.status(200).send({contractAddr : hash._address, msg : "minting success"});//컬렉션 생성하고 배포한 컨트랙트주소값 반환
//           })
//         });

//       }       
//     }
// });

router.post('/upload', async (req, res) => {
  const {username, useraddr, nfturl, nftname, nftdesc, ipfsLink} = req.body;
  console.log(useraddr, ipfsLink);

  const tokenContract = await new Contract(erc721abi, env.CONTRACT_ADDR);
  const resultOfERC721 = await tokenContract.methods.mintNFT(useraddr, ipfsLink).send(
    {from: env.SERVER_ADDRESS, to: process.env.CONTRACT_ADDR, gasPrice: 100, gas: 2000000},
    )
    .on('error', (error) => {
        error = error.toString();
        const msg = 'Failed to mint new ERC721 Token.';
        res.status(500).send({error, msg});
    });

    console.log('NFT 민팅 Tx: ', resultOfERC721);

    const msg = 'Succeed in minting new ERC721 Token.';
    res.status(201).json({resultOfERC721, recordedNft, msg});

    // let userInfo = await db.User.findOne({
    //   where: { email : req.body.userId }
    // });
    // console.log(userInfo);
    // if(userInfo.contractAddr !== ""){
    //   addNewErc721Token(userInfo.contractAddr).then(() => {
    //     res.status(200).send({msg : "minting success"});
    //   })
    // } else {
    //   deployToken(userInfo.address).then((hash) => {//userInfo 테이블에 컨트랙트 주소가 없으면 최초업로드 작가임으로 컬렉션 생성
    //     console.log(hash._address);
    //     db.User.update({contractAddr: hash._address });//db에 생성한 컬렌션의 컨트랙트주소 저장
    //     db.User.save();
    //     addNewErc721Token(userInfo.contractAddr).then(() => {
    //       res.status(200).send({contractAddr : hash._address, msg : "minting success"});//컬렉션 생성하고 배포한 컨트랙트주소값 반환
    //     })
    //   });

    // }       
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
