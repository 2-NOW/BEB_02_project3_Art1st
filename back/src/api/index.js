import express from 'express';
import user from './routes/user.js'
import profile from './routes/profile.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("🚀 API Server is running...");
})

router.use('/user', user);
router.use('/profile', profile);
export default router;
