import { Router } from "express";
const router = Router();

router.get('/test', (req, res) => {
    res.send('/user/test test api');
})

export default router;