import { Router } from "express";
import db from '../../models/index.js';
const router = Router();

// 특정 user의 username 가져오기
router.get('/:user_id/username', async(req, res) => {
    const user_id = req.params.user_id;

    const user_name = await db.User.findOne({
        attributes: ['name'],
        where : {id: user_id}
    });

    if(user_name === null){
        res.status(404).send('Not Found User');
    }
    else {
        // user name 데이터 반환
        res.status(200).json(user_name);
    }
})

// 특정 user의 username 수정하기
router.put('/:user_id/username', async(req, res) => {
    const user_id = req.params.user_id;
    const {new_user_name} = req.query;

    const user = await db.User.findOne({
        where : { id: user_id}
    });

    if(user === null) {
        res.status(404).send('Not Found User');
    }
    else {
        await user.update({name: new_user_name});
        await user.save();
        res.status(201).json(user);
    }

})

export default router;