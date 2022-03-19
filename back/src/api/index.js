import express from 'express';
import user from './routes/user.js'
import profile from './routes/profile.js';
import website from './routes/website.js';
import artwork from './routes/artwork.js';
import like from './routes/like.js';
import want from './routes/want.js';
import tag from './routes/tag.js'
import comment from '../models/comment.js';

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

router.use('/artwork', artwork);
router.use('/artwork/:artwork_id/like', (req, res) => {
    req.artwork_id = req.params.artwork_id;
    like(req, res);
});
router.use('/artwork/:artwork_id/want', (req, res) => {
    req.artwork_id = req.params.artwork_id;
    want(req, res);
});
router.use('/artwork/:artwork_id/tag', (req, res) => {
    req.artwork_id = req.params.artwork_id;
    tag(req, res);
});
router.use('/artwork/:artwork_id/comment', (req, res) => {
    req.artwork_id = req.params.artwork_id;
    comment(req, res);
});

router.use('/profile', profile);
router.use('/website', website);

export default router;
