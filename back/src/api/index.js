import express from 'express';
import user from './routes/user.js'
const router = express.Router();

router.get('/', (req, res) => {
    res.send("🚀 API Server is running...");
})

router.use('/user', user);
export default router;
