import express from 'express';
import user from './routes/user.js'
import profile from './routes/profile.js';
import website from './routes/website.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("🚀 API Server is running...");
})

router.use('/user', user);
router.use('/profile', profile);
router.use('/website', website);
export default router;
