import { Router } from "express";
import OrderService from "../../services/order.js";
const router = Router();
const OrderServiceInterface = new OrderService();

router.post('/donation', async(req, res) => { // 내가 from
    const { to_id, amount, msg } = req.body;
    const from_id = req.session.user_id;

    try{
        if(amount <= 0) {
            return res.status(400).json('Bad Request : Amount is under 0');
        }
        if(from_id === undefined || to_id === undefined || amount === undefined || msg === undefined || to_id === '1'){
            return res.status(400).json('Bad Request : Invalid values');
        }
        await OrderServiceInterface.donate(from_id, to_id, amount, msg);
        res.status(201).send(true);
    }
    catch(err){
        res.status(404).json(err.toString())
    }
})

router.post('/compensation', async(req, res) => { // 내가 to
    // const to_id = req.session.user_id; // user_id col
    const { amount } = req.body;
    const to_id = 'sss';

    try{
        if(amount <= 0) {
            return res.status(400).json('Bad Request : Amount is under 0');
        }
        if(to_id === undefined || amount === undefined ){
            return res.status(400).json('Bad Request : Invalid values');
        }
        await OrderServiceInterface.compensate(to_id, amount);
        res.status(201).send(true);
    }
    catch(err) {
        res.status(404).json(err.toString());
    }
})

router.post('/purchase', async (req, res) => { // 내가 to
    const { artwork_id } = req.body;
    const to_id = req.session.user_id;

    try{
        if(to_id === undefined || artwork_id === undefined) {
            return res.status(400).json('Bad Request : Invalid values');
        }
        await OrderServiceInterface.purchase(to_id, artwork_id);
        res.status(201).send(true);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})
export default router;
