import { Router } from "express";
import KlaytnService from "../../services/klaytn.js"
const router = Router();

const KlaytnServiceInterface = new KlaytnService();


// 서버 계정에 klay 충전하기
// https://baobab.wallet.klaytn.com/faucet 통해 진행

// 서버 계정의 Eth 잔액 가져오기
router.get('/getServerKlay', async (req, res) => {
    try{
        const balance = await KlaytnServiceInterface.getServerKlay();
        res.status(200).json(balance);
    }
    catch(err){
        res.status(500).json(err.toString());
    }
})

// erc20 컨트랙트 배포하기
router.post('/erc20', async (req, res)=> {
    try{
        const data = await KlaytnServiceInterface.deployErc20();
        res.status(201).json(data);
    }
    catch(err) {
        res.status(500).json(err.toString())
    }
})

router.post('/erc721', async (req, res) => {
    try{
        const data = await KlaytnServiceInterface.deployErc721();
        res.status(201).json(data);
    }
    catch(err) {
        res.status(500).json(err.toString());
    }
})

// batcher 컨트랙트 배포하기
router.post('/batcher', async (req, res)=> {
    try{
        const data = await KlaytnServiceInterface.deployBatcher();
        res.status(201).json(data);
    }
    catch(err) {
        res.status(500).json(err.toString());
    }
})

router.get('/tokenBalance', async (req, res)=> {
    const {user_id} = req.query;

    try{
        const data = await KlaytnServiceInterface.getTokenBalance(user_id);
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err.toString());
    }
})

router.get('/nftBalance', async (req, res) => {
    const {user_id} = req.query;

    try{
        const data = await KlaytnServiceInterface.getNftBalance(user_id);
        res.status(200).json(data);
    }
    catch(err) {
        res.status(500).json(err.toString());
    }
})
export default router;