import { Router } from "express";
import db from '../../models/index.js';
const router = Router();

// 전체 유저 or 특정 유저(user_id)의 전체 website 가져오기
router.get('/', async (req, res) => {
    const user_id = req.query.user_id;

    if(user_id === undefined){
        const user_websites = await db.Website.findAll();
        // 유저 website 데이터가 하나도 없다면 빈 배열 반환
        // 기본적인 api라 따로 404 처리는 해주지 않음.
        res.status(200).json(user_websites);
    }
    else {
        const user_websites = await db.Website.findAll({where : { user_id : user_id }});
        if(user_websites === null){
            // 실제 있는 사용자인지 확인
            const user = await db.User.findOne({where: {id : user_id}});
            if(user === null){
                // 유저 id에 해당하는 유저 자체가 없음
                res.status(404).send('Not Found User');
            }
            else {
                // 유저 id에 해당하는 유저는 있지만 websites 데이터는 없음 -> 빈 리스트 반환
                res.status(200).json([]);
            }
        }
        else {
            // user profile 데이터 반환
            res.status(200).json(user_websites);
        }
    }

})

// websites 데이터 하나 추가하기
router.post('/', async (req, res) => {
    const {user_site, user_id} = req.query;

    const user_website = await db.Website.create({
        site: user_site,
        user_id: user_id
    })

    res.status(201).json(user_website);
})

// 특정 website 수정하기(유저의 website 맞는지 확인)
router.put('/:website_id', async(req, res) => {
    const website_id = req.params.website_id;
    const {user_site, user_id} = req.query;

    const user_website = await db.Website.findOne({
        where : { id: website_id, user_id: user_id}
    });

    if(user_website === null) {
        res.status(404).send('Not Found User Website');
    }
    else {
        await user_website.update({site: user_site});
        await user_website.save();
        res.status(201).json(user_website);
    }

})

// 특정 website 삭제하기(유저의 website 맞는지 확인)
router.delete('/:website_id', async(req, res) => {
    const website_id = req.params.website_id;
    const {user_id} = req.query;

    const user_website = await db.Website.findOne({
        where : { id: website_id, user_id: user_id}
    });

    if(user_website === null) {
        res.status(404).send('Not Found User Website');
    }
    else {
        await user_website.destroy();
        await user_website.save();
        res.status(201).json(user_website); // 삭제한 website 객체 반환
    }

})

export default router;