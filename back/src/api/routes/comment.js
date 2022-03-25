import { Router } from "express";
import CommentService from '../../services/comment.js';
const router = Router();

const CommentServiceInstance = new CommentService();

router.get('/', async(req, res) => {
    const artwork_id = req.artwork_id;

    try{
        const comments = await CommentServiceInstance.getArtworkComment(artwork_id);
        res.status(200).json(comments);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

router.post('/', async(req, res) => {
    const artwork_id = req.artwork_id;
    const { user_id } = req.query;
    const { content } = req.body;

    try{
        const comment = await CommentServiceInstance.postArtworkComment(artwork_id, content, user_id);
        res.status(201).json(comment);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

export default router;