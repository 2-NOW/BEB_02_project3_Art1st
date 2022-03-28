import { Router } from "express";
import OrderService from "../../services/order.js";
const router = Router();
const OrderServiceInterface = new OrderService();

router.get('/', async(req, res)=> {
    res.send('test OK');
})

router.post('/donation', async(req, res) => {
    const {from_id, to_id, amount, msg} = req.body;

    try{
        if(amount <= 0) {
            return res.status(400).json('Bad Request : Amount is under 0');
        }
        if(from_id === undefined || to_id === undefined || amount === undefined || msg === undefined || from_id === '1' || to_id === '1'){
            return res.status(400).json('Bad Request : Invalid values');
        }
        const data = await OrderServiceInterface.donate(from_id, to_id, amount, msg);
        res.status(201).json(data);
    }
    catch(err){
        res.status(404).json(err.toString())
    }
})

router.post('/compensation', async(req, res) => {
    const {to_id, amount} = req.body;

    try{
        if(amount <= 0) {
            return res.status(400).json('Bad Request : Amount is under 0');
        }
        if(to_id === undefined || amount === undefined || to_id === '1'){
            return res.status(400).json('Bad Request : Invalid values');
        }
        const data = await OrderServiceInterface.compensate(to_id, amount);
        res.status(201).json(data);
    }
    catch(err) {
        res.status(404).json(err.toString());
    }
})
export default router;