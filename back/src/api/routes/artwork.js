import { Router } from "express";
import ArtworkService from "../../services/artwork.js";
const router = Router();

const ArtworkServiceInstance = new ArtworkService();

// nft 1의 정보 조회
router.get('/:artwork_id', async (req, res) => {
    const artwork_id = req.params.artwork_id;
    try{
        const artwork = await ArtworkServiceInstance.getOneArtwork(artwork_id);
        res.status(200).json(artwork);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
});

// nft 1의 정보 수정
router.put('/:artwork_id', async (req, res) => {
    const artwork_id = req.params.artwork_id;
    const {is_selling, price, owner_id} = req.body;
    
    try{
        const artwork = await ArtworkServiceInstance.putOneArtwork(artwork_id, is_selling, price, owner_id);
        res.status(201).json(artwork);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

// 해당 artwork_id의 작가 정보(artwork 상세 페이지 용)
router.get('/:artwork_id/creator', async (req, res) => { 
    const artwork_id = req.params.artwork_id;

    try{
        const creator_info = await ArtworkServiceInstance.getCreatorInfo(artwork_id);
        res.status(200).json(creator_info);
    }
    catch(err) {
        res.status(404).json(err.toString());
    }

});

export default router;