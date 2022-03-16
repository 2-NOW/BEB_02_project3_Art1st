import { Router } from "express";
import WebsiteService from "../../services/website.js";
const router = Router();

const WebsiteServiceInstance = new WebsiteService();

// 전체 유저 or 특정 유저(user_id)의 전체 website 가져오기
router.get('/', async (req, res) => {
    const user_id = req.query.user_id;

    try{
        if(user_id === undefined){ // 전체 website
            const websites = await WebsiteServiceInstance.getAllWebsites();
            res.status(200).json(websites);
        }
        else {
            const websites = await WebsiteServiceInstance.getUserWebsites(user_id);
            res.status(200).json(websites);
        }
    }
    catch(err){
        res.status(404).json(err.toString());
    }

})

// websites 데이터 하나 추가하기
router.post('/', async (req, res) => {
    const {user_site, user_id} = req.query;

    try{
        const user_websites = await WebsiteServiceInstance.postUserWebsite(user_id, user_site);
        res.status(201).json(user_websites);

    }
    catch(err) {
        res.status(404).json(err.toString());
    }

})

// 특정 website 수정하기(유저의 website 맞는지 확인)
router.put('/:website_id', async(req, res) => {
    const website_id = req.params.website_id;
    const {user_site, user_id} = req.query;

    try{
        const user_website = await WebsiteServiceInstance.putUserWebsite(user_id, user_site, website_id);
        res.status(201).json(user_website);
    }
    catch(err){
        res.status(404).json(err.toString());
    }

})

// 특정 website 삭제하기(유저의 website 맞는지 확인)
router.delete('/:website_id', async(req, res) => {
    const website_id = req.params.website_id;
    const {user_id} = req.query;

    try{
        const user_website = await WebsiteServiceInstance.deleteUserWebsite(user_id, website_id);
        res.status(201).json(user_website);
    }
    catch(err) {
        res.status(404).json(err.toString());
    }

})

export default router;