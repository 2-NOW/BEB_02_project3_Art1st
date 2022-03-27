import { Router } from "express";
import user from "../../models/user.js";
import ContractService from "../../services/contract.js"
const router = Router();

const ContractServiceInterface = new ContractService();

router.get('/', (req, res) => {
    res.send('test OK');
})

// 서버 계정에 1Eth 보내기(ganache용)
router.post('/faucetGanacheEth', async (req, res) => {
    try{
        const receipt = await ContractServiceInterface.faucetGanacheEther();
        res.status(201).json(receipt);
    }
    catch(err) {
        res.status(500).json(err.toString());
    }
})

// 서버 계정의 Eth 잔액 가져오기
router.get('/getServerEth', async (req, res) => {
    try{
        const balance = await ContractServiceInterface.getServerEth();
        res.status(200).json(balance);
    }
    catch(err){
        res.status(500).json(err.toString());
    }
})

// erc20 컨트랙트 배포하기
router.post('/erc20', async (req, res)=> {
    try{
        const data = await ContractServiceInterface.deployErc20();
        res.status(201).json(data);
    }
    catch(err) {
        res.status(500).json(err.toString())
    }
})

// batcher 컨트랙트 배포하기
router.post('/batcher', async (req, res)=> {
    try{
        const data = await ContractServiceInterface.deployBatcher();
        res.status(201).json(data);
    }
    catch(err) {
        res.status(500).json(err.toString());
    }
})

router.get('/balance', async (req, res)=> {
    const {user_id} = req.query;

    try{
        const data = await ContractServiceInterface.getBalance(user_id);
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err.toString());
    }
})

export default router;