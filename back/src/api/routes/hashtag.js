import { Router } from "express";
import HashtagService from '../../services/hashtag.js';
const router = Router();

const HashtagServiceInstance = new HashtagService();


// 유저들이 많이사용한 상위 10개의 해쉬태그 조회 
router.get('/top', async(req, res)=> { 
    try{
        const MostUsedArtworktagsName = await HashtagServiceInstance.getMostUsedArtworkTags();
        res.status(200).json(MostUsedArtworktagsName);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

router.get('/:artwork_id', async(req, res)=> {
    const artwork_id = req.artwork_id;

    try{
        const hashtags = await HashtagServiceInstance.getArtworkTag(artwork_id);
        res.status(200).json(hashtags);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

export default router;
