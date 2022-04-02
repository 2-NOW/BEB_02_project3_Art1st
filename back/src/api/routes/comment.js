import { Router } from 'express';
import CommentService from '../../services/comment.js';
const router = Router();

const CommentServiceInstance = new CommentService();

router.get('/', async (req, res) => {
  const artwork_id = req.artwork_id;

  try {
    const comments = await CommentServiceInstance.getArtworkComment(artwork_id);
    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

router.post('/', async (req, res) => {
  const artwork_id = req.artwork_id;

  console.log(req.sessionStore.sessions);
  console.log(req.sessions);
  console.log(req.sessionID);
  console.log(req);

  const { user_id } = req.session;
  const { content } = req.body;

  // for test
  // const user_id = 'hyobin'

  try {
    if (user_id === undefined)
      return res.status(401).json('Error: Unauthorized');
    const success = await CommentServiceInstance.postArtworkComment(
      artwork_id,
      content,
      user_id
    );
    if (success) {
      return res.status(201).send();
    } else {
      return res.status(500).json('Unknown Error');
    }
  } catch (err) {
    res.status(404).json(err.toString());
  }
});

export default router;
