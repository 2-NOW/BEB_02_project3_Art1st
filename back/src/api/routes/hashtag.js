import { Router } from "express";
import HashtagService from '../../services/hashtag.js';
const router = Router();

const HashtagServiceInstance = new HashtagService();

router.get('/', async(req, res)=> {
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