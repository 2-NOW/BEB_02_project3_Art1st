import { Router } from "express";
import CollaborationService from "../../services/collaboration.js";
const router = Router();

const CollaborationServiceInstance = new CollaborationService();

// 콜라보레이션 전체조회
router.get('/', async(req, res) => {
    try{
        const collaborations = await CollaborationServiceInstance.getAllCollaboration();
        res.status(200).json(collaborations);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

//about collaboration ; 특정 콜라보레이션 조회
router.get('/:collaboration_id', async(req, res) => {
    const collaboration_id = req.params.collaboration_id;

    try{
        const collaboration = await CollaborationServiceInstance.getAboutCollaboration(collaboration_id);
        res.status(200).json(collaboration);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

// collaboration Winners 탭 작품들 조회 
router.get('/:collaboration_id/winners', async(req, res) => {
    const collaboration_id = req.params.collaboration_id;

    try{
        const winnerArtworks = await CollaborationServiceInstance.getWinnerArtworks(collaboration_id);
        res.status(200).json(winnerArtworks);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

// collaboration Entries 탭에 작품 추가(=> 작품 등록)
router.post('/:collaboration_id/entries', async (req, res)=> {
    const collaboration_id = req.params.collaboration_id;
    const { user_id } = req.session;
    const {artwork_id} = req.body; // post는 query가 되려나요 ?

    // for test
    // const user_id = 'ss';

    try{
        if (user_id === undefined)
        return res.status(401).json('Error: Unauthorized');

        const success = await CollaborationServiceInstance.postEntriesArtworks(collaboration_id, artwork_id, user_id);
        res.status(201).json(success);
    }
    catch(err){
        return res.status(404).json(err.toString());
    }

})

// collaboration Entries 탭 작품들 조회 
router.get('/:collaboration_id/entries', async(req, res) => {
    const collaboration_id = req.params.collaboration_id;

    try{
        const entriesArtworks = await CollaborationServiceInstance.getEntriesArtworks(collaboration_id);
        res.status(200).json(entriesArtworks);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

export default router;
