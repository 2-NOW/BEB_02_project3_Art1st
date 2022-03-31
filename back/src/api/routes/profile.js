import { Router } from "express";
import ProfileService from "../../services/profile.js";
const router = Router();

const ProfileServiceInstance = new ProfileService();

// 특정 유저(user_id)프로필 전체(사진, 설명) 가져오기
router.get('/', async (req, res) => {
    const user_id = req.body.user_id;
    try{
        if(user_id === null) { // 특정 유저 조회 (프로필 수정 페이지)
            const user_profiles = await ProfileServiceInstance.getUserProfile(req.session.user_id);
            res.status(200).json(user_profiles);
        }
        else { // 특정 유저 조회
            const user_profile = await ProfileServiceInstance.getUserProfile(user_id);
            res.status(200).json(user_profile);
        }
    }
    catch(err){
        res.status(404).json(err.toString());
    }

})

// 유저 더미 프로필 데이터 추가
router.post('/', async (req, res)=> {
    const user_id = req.session.user_id;

    try{
        if(user_id === undefined) return res.status(400).json("Error: Bad Request");
        const user_profile = await ProfileServiceInstance.postUserProfile(user_id);
        res.status(201).json(user_profile);
    }
    catch(err){
        res.status(404).json(err.toString());
    }

})

// 유저 정보 업데이트
router.put('/', async (req, res) => {
    const user_id = req.session.user_id;
    const {user_desc, user_pic} = req.body;

    try{
        if(user_id === undefined) return res.status(400).json("Error: Bad Request");
        const user_profile = await ProfileServiceInstance.putUserProfile(user_id, user_desc, user_pic);
        res.status(201).json(user_profile);
    }
    catch(err){
        res.status(404).json(err.toString());
    }

})

// 프로필 - 유저 설명만 가져오기
router.get('/description', async (req, res) => {
    const user_id = req.user_id;

    try{
        if(user_id === undefined) return res.status(400).json("Error: Bad Request");
        const user_desc = await ProfileServiceInstance.getUserDesc(user_id);
        res.status(200).json({user_desc});
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

// 프로필 - 유저 설명 등록 -> 이미 더미 데이터가 있으니 모두 다 수정 api를 쓰는 것이 좋을 듯. 로직은 같음.
router.post('/description', async (req, res) => {
    const user_id = req.user_id;
    const user_desc = req.body.user_desc;

    try{
        if(user_id === undefined) return res.status(400).json("Error: Bad Request");
        const user_profile = await ProfileServiceInstance.putUserDesc(user_id, user_desc);
        res.status(201).json(user_profile);
    }
    catch(err){
        res.status(404).json(err.toString());
    }

})

// 프로필 - 유저 설명 수정
router.put('/description', async (req, res) => {
    const user_id = req.user_id;
    const user_desc = req.body.user_desc;

    try{
        if(user_id === undefined) return res.status(400).json("Error: Bad Request");
        const user_profile = await ProfileServiceInstance.putUserDesc(user_id, user_desc);
        res.status(201).json(user_profile);
    }
    catch(err){
        res.status(404).json(err.toString());
    }

})

// 프로필 - 유저 프로필 사진 가져오기
router.get('/picture', async (req, res) => {
    const user_id = req.user_id;

    try{
        if(user_id === undefined) return res.status(400).json("Error: Bad Request");
        const user_pic = await ProfileServiceInstance.getUserPic(user_id);
        res.status(200).json({user_pic});
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

// 프로필 - 유저 프로필 사진 등록하기
router.post('/picture', async (req, res) => {
    const user_id = req.user_id;
    const user_pic = req.body.user_pic;

    try{
        if(user_id === undefined) return res.status(400).json("Error: Bad Request");
        const user_profile = await ProfileServiceInstance.putUserPic(user_id, user_pic);
        res.status(201).json(user_profile);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

// 프로필 - 유저 프로필 수정하기
router.put('/picture', async (req, res) => {
    const user_id = req.user_id;
    const user_pic = req.body.user_pic;

    try{
        if(user_id === undefined) return res.status(400).json("Error: Bad Request");
        const user_profile = await ProfileServiceInstance.putUserPic(user_id, user_pic);
        res.status(201).json(user_profile);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

export default router;
