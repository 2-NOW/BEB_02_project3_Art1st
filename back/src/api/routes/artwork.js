import { Router } from "express";
const router = Router();

// 해당 artwork_id의 작가 정보(artwork 상세 페이지 용)
router.get('/:artwork_id/creator', (req, res) => { 
    req.artwork_id = req.params.artwork_id;

});

export default router;