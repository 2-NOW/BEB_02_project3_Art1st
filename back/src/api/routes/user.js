import { Router } from "express";
import UserService from "../../services/user.js";
const router = Router();

const UserServiceInstance = new UserService();

// 전체 user 정보 가져오기
router.get('/', async (req, res) => {
    try{
        const users = await UserServiceInstance.getAllUsers();
        res.status(200).json(users);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
});

// 특정 user 정보 가져오기
router.get('/:user_id', async(req, res) => {
    const user_id = req.params.user_id;

    try{
        const user = await UserServiceInstance.getOneUser(user_id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
});

// 특정 user의 username 가져오기
router.get('/:user_id/username', async (req, res) => {
    const user_id = req.params.user_id;

    try{
        const user_name = await UserServiceInstance.getOneUserName(user_id);
        res.status(200).json(user_name);

    }
    catch(err) {
        res.status(404).json(err.toString());
    }

});

// 특정 user의 username 수정하기
router.put('/:user_id/username', async(req, res) => {
    const user_id = req.params.user_id;
    const {new_user_name} = req.query;

    try{
        const updated_user = await UserServiceInstance.putOneUserName(user_id, new_user_name);
        res.status(200).json(updated_user);
    }
    catch(err) {
        res.status(404).json(err.toString());
    }

})

export default router;