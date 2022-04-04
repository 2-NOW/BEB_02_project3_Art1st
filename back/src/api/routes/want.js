import { Router } from 'express';
import WantService from '../../services/want.js';
const router = Router();

const WantServiceInstance = new WantService();

router.get('/', async (req, res) => {
  const artwork_id = req.artwork_id;

  try {
    const wants = await WantServiceInstance.getArtworkWant(artwork_id);
    res.status(200).json(wants);
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

router.post('/', async (req, res) => {
    const artwork_id = req.artwork_id;
    const { user_id } = req.session;

    try{
        if(!user_id) return res.status(401).json('Nonauthorized');
        const want = await WantServiceInstance.postArtworkWant(artwork_id, user_id);
        res.status(201).json(want);
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
        const want = await WantServiceInstance.deleteArtworkWant(artwork_id, user_id);
        res.status(201).json(want);
    }
    catch(err) {
        res.status(404).json(err.toString());
    }
})

export default router;
