import express from 'express';
import main from './routes/main.js';
import user from './routes/user.js'
import profile from './routes/profile.js';
import artwork from './routes/artwork.js';
import like from './routes/like.js';
import want from './routes/want.js';
import hashtag from './routes/hashtag.js'
import comment from './routes/comment.js';
import order from './routes/order.js';
import klaytn from './routes/klaytn.js';
import collaboration from './routes/collaboration.js';
import vote from './routes/vote.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("🚀 API Server is running...");
})

router.use('/main', main);
router.use('/user', user);
router.use('/user/:user_id/profile', (req, res) => {
    req.user_id = req.params.user_id;
    profile(req, res);
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

router.use('/artwork/tag', hashtag);
router.use('/artwork/:artwork_id/comment', (req, res) => {
    req.artwork_id = req.params.artwork_id;
    comment(req, res);
});

router.use('/order', order);
router.use('/klaytn', klaytn);
router.use('/profile', profile);
router.use('/collaboration', collaboration);
router.use('/vote', vote);

export default router;
