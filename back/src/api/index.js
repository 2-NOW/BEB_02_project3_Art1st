import express from 'express';
import user from './routes/user.js'
import profile from './routes/profile.js';
import website from './routes/website.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send("🚀 API Server is running...");
})

router.use('/user', user);
router.use('/user/:user_id/profile', (req, res) => {
    req.user_id = req.params.user_id;
    profile(req, res);
})
router.use('/user/:user_id/website', (req, res) => {
    req.user_id = req.params.user_id;
    website(req, res);
})
router.use('/profile', profile);
router.use('/website', website);

export default router;
