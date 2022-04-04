import { Router } from 'express';
import LikeService from '../../services/like.js';
const router = Router();

const LikeServiceInstance = new LikeService();

router.get('/', async (req, res) => {
  const artwork_id = req.artwork_id;

  try {
    const likes = await LikeServiceInstance.getArtworkLike(artwork_id);
    res.status(200).json(likes);
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

router.post('/', async (req, res) => {
    const artwork_id = req.artwork_id;
    const { user_id } = req.session;

    try{
        if(!user_id) return res.status(401).json('Nonauthorized');
        const like = await LikeServiceInstance.postArtworkLike(artwork_id, user_id);
        res.status(201).json(like);
    }
    catch(err) {
        res.status(404).json(err.toString());
    }
})

router.delete('/', async (req, res) => {
    const artwork_id = req.artwork_id;
    const { user_id } = req.session;

    try{
        if(!user_id) return res.status(401).json('Nonauthorized');
        const like = await LikeServiceInstance.deleteArtworkLike(artwork_id, user_id);
        res.status(201).json(like);
    }
    catch(err) {
        res.status(404).json(err.toString());
    }
})

export default router;
