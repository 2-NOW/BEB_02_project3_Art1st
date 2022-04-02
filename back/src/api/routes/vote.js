import { Router } from "express";
import VoteService from "../../services/vote.js";


const router = Router();
const VoteServiceInstance = new VoteService();

router.post('/collaboration_id/:artwork_id', async(req, res) => {
    try{
        const artwork_id = req.params.artwork_id;
        const user_id = req.session.user_id
        if(user_id === undefined) return res.status(404).send("not authorized");
        const artwork = await VoteServiceInstance.voteForTheArtwork(artwork_id, user_id);
        res.status(200).json(artwork);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

export default router;
