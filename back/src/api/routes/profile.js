import { Router } from "express";
import db from '../../models/index.js';
const router = Router();


// 전체 유저 or 특정 유저(user_id)프로파일 전체(사진, 설명) 가져오기
router.get('/', async (req, res) => {
    const user_id = req.query.user_id;

    if(user_id === undefined) { // 전체 유저 조회
        const user_profiles = await db.Profile.findAll();
        // 유저 profile 데이터가 하나도 없다면 빈 배열 반환
        // 기본적인 api라 따로 404 처리는 해주지 않음.
        res.status(200).json(user_profiles);
    }
    else { // 특정 유저 조회
        const user_profile = await db.Profile.findOne({where : { user_id : user_id }});
        if(user_profile === null){
            // 실제 있는 사용자인지 확인
            const user = await db.User.findOne({where: {id : user_id}});
            if(user === null){
                // 유저 id에 해당하는 유저 자체가 없음
                res.status(404).send('Not Found User');
            }
            else {
                // 유저 id에 해당하는 유저는 있지만 profile 데이터는 없음 -> post /profile 으로 데이터 생성 가능
                res.status(404).send('Not Found User Profile');
            }
        }
        else {
            // user profile 데이터 반환
            res.status(200).json(user_profile);
        }
    }
})

// 유저 더미 프로파일 데이터 추가
router.post('/', async (req, res)=> {
    const user_id = req.query.user_id;

    if(await db.Profile.findOne({where : { user_id : user_id }})){
        // 이미 profile이 존재
        res.status(409).send('Confilt: User Profile data already exists')
    }
    else {
        const user_profile= await db.Profile.create({
            picture: '',
            description: '',
            user_id: user_id
        });

        res.status(201).json(user_profile);
    }
})

// 프로파일 - 유저 설명만 가져오기
router.get('/description', async (req, res) => {
    const user_id = req.query.user_id;

    const user_description = await db.Profile.findOne({
        attributes: ['description'],
        where : { user_id : user_id }
    });

    if(user_description === null){
        // 실제 있는 사용자인지 확인
        const user = await db.User.findOne({where: {id : user_id}});
        if(user === null){
            // 유저 id에 해당하는 유저 자체가 없음
            res.status(404).send('Not Found User');
        }
        else {
            // 유저 id에 해당하는 유저는 있지만 profile 데이터는 없음 -> post /profile 으로 데이터 생성 가능
            res.status(404).send('Not Found User Profile');
        }
    }
    else {
        // user profile 데이터 반환
        res.status(200).json(user_description);
    }
})

// 프로파일 - 유저 설명 등록 -> 이미 더미 데이터가 있으니 모두 다 수정 api를 쓰는 것이 좋을 듯. 로직은 같음.
router.post('/description', async (req, res) => {
    const user_id = req.query.user_id;
    const user_desc = req.body.user_desc;

    const user_profile = await db.Profile.findOne({
        where : { user_id : user_id }
    });

    if(user_profile === null){
        // 실제 있는 사용자인지 확인
        const user = await db.User.findOne({where: {id : user_id}});
        if(user === null){
            // 유저 id에 해당하는 유저 자체가 없음
            res.status(404).send('Not Found User');
        }
        else {
            // 유저 id에 해당하는 유저는 있지만 profile 데이터는 없음 -> post /profile 으로 데이터 생성 가능
            res.status(404).send('Not Found User Profile');
        }
    }
    else {
        // user profile 데이터 반환
        await user_profile.update({description: user_desc});
        await user_profile.save();
        res.status(201).json(user_profile);
    }
})

// 프로파일 - 유저 설명 수정
router.put('/description', async (req, res) => {
    const user_id = req.query.user_id;
    const user_desc = req.body.user_desc;

    const user_profile = await db.Profile.findOne({
        where : { user_id : user_id }
    });

    if(user_profile === null){
        // 실제 있는 사용자인지 확인
        const user = await db.User.findOne({where: {id : user_id}});
        if(user === null){
            // 유저 id에 해당하는 유저 자체가 없음
            res.status(404).send('Not Found User');
        }
        else {
            // 유저 id에 해당하는 유저는 있지만 profile 데이터는 없음 -> post /profile 으로 데이터 생성 가능
            res.status(404).send('Not Found User Profile');
        }
    }
    else {
        // user profile 데이터 반환
        await user_profile.update({description: user_desc});
        await user_profile.save();
        res.status(201).json(user_profile);
    }
})

// 프로파일 - 유저 프로파일 가져오기
router.get('/picture', async (req, res) => {
    const user_id = req.query.user_id;

    const user_picture = await db.Profile.findOne({
        attributes: ['picture'],
        where : { user_id : user_id }
    });

    if(user_picture === null){
        // 실제 있는 사용자인지 확인
        const user = await db.User.findOne({where: {id : user_id}});
        if(user === null){
            // 유저 id에 해당하는 유저 자체가 없음
            res.status(404).send('Not Found User');
        }
        else {
            // 유저 id에 해당하는 유저는 있지만 profile 데이터는 없음 -> post /profile 으로 데이터 생성 가능
            res.status(404).send('Not Found User Profile');
        }
    }
    else {
        // user profile 데이터 반환
        res.status(200).json(user_picture);
    }
})

// 프로파일 - 유저 프로파일 등록하기
router.post('/picture', async (req, res) => {
    const user_id = req.query.user_id;
    const user_pic = req.body.user_pic;

    const user_profile = await db.Profile.findOne({
        where : { user_id : user_id }
    });

    if(user_profile === null){
        // 실제 있는 사용자인지 확인
        const user = await db.User.findOne({where: {id : user_id}});
        if(user === null){
            // 유저 id에 해당하는 유저 자체가 없음
            res.status(404).send('Not Found User');
        }
        else {
            // 유저 id에 해당하는 유저는 있지만 profile 데이터는 없음 -> post /profile 으로 데이터 생성 가능
            res.status(404).send('Not Found User Profile');
        }
    }
    else {
        // user profile 데이터 반환
        await user_profile.update({picture: user_pic});
        await user_profile.save();
        res.status(201).json(user_profile);
    }
})

// 프로파일 - 유저 프로파일 수정하기
router.put('/picture', async (req, res) => {
    const user_id = req.query.user_id;
    const user_pic = req.body.user_pic;

    const user_profile = await db.Profile.findOne({
        where : { user_id : user_id }
    });

    if(user_profile === null){
        // 실제 있는 사용자인지 확인
        const user = await db.User.findOne({where: {id : user_id}});
        if(user === null){
            // 유저 id에 해당하는 유저 자체가 없음
            res.status(404).send('Not Found User');
        }
        else {
            // 유저 id에 해당하는 유저는 있지만 profile 데이터는 없음 -> post /profile 으로 데이터 생성 가능
            res.status(404).send('Not Found User Profile');
        }
    }
    else {
        // user profile 데이터 반환
        await user_profile.update({picture: user_pic});
        await user_profile.save();
        res.status(201).json(user_profile);
    }
})

export default router;