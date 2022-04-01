import express from 'express';
import main from './routes/main.js';
import user from './routes/user.js'
import profile from './routes/profile.js';
import website from './routes/website.js';
import artwork from './routes/artwork.js';
import like from './routes/like.js';
import want from './routes/want.js';
import hashtag from './routes/hashtag.js'
import comment from './routes/comment.js';
import order from './routes/order.js';
import klaytn from './routes/klaytn.js';
import collaboration from './routes/collaboration.js';

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
router.use('/user/website', website)

router.use('/artwork', artwork);
router.use('/artwork/:artwork_id/like', (req, res) => {
    req.artwork_id = req.params.artwork_id;
    like(req, res);
});
router.use('/artwork/:artwork_id/want', (req, res) => {
    req.artwork_id = req.params.artwork_id;
    want(req, res);
});
// router.use('/artwork/:artwork_id/hashtag', (req, res) => { 
//     req.artwork_id = req.params.artwork_id; 
//     hashtag(req, res);
// });
router.use('/artwork/hashtag', hashtag); // params 에서 추출하는거 잠깐 테스트 때문에 이렇게 수정했습니다 근데 /artwork/hashtag/ 이 엔드포인트로 요청날리면 "Error: Error: WHERE parameter \"artwork_id\" has invalid \"undefined\" value" 이런 에러가 뜨네요 미들웨어 에서 엔드포인트를 /artwork/hashtag 로 수정했는데도 artwork_id params에 넣어서 요청 날려야 하는건 왜일까요
router.use('/artwork/:artwork_id/comment', (req, res) => {
    req.artwork_id = req.params.artwork_id;
    comment(req, res);
});

router.use('/order', order);
router.use('/klaytn', klaytn);
router.use('/profile', profile);
router.use('/website', website);
router.use('/collaboration', collaboration);

export default router;
