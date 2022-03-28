import { Router } from "express";
import db from "../../models/index.js";
import UserService from "../../services/user.js";
const UserServiceInstance = new UserService();
const router = Router();


router.post('/login', async (req, res) => {
  const { user_id, user_pw } = req.body 
  try {
    await UserServiceInstance.login(user_id, user_pw, req).then(()=>{
      res.status(200).json({ message: 'ok' }); 
    });
  }
  catch(err){
    res.status(404).send({ data: null, message: 'not authorized' });
  }
})  

router.delete('/logout', (req, res) => {
  try {
    const isLogout = UserServiceInstance.logout(req.session);
    if(isLogout){
      res.status(200).json({ data: null, message: 'done' });
    } else {
      res.status(404).json(err.toString());
    }
  }
  catch(err){
    res.status(404).json(err.toString());
  }
});

router.get('/loginCheck', (req, res) => {
  try {
    const IsLogin = UserServiceInstance.loginCheck(req.session);
    if(IsLogin){
      res.send({loggedIn : true, loginData: req.session.userId});
    } else {
      res.status(404).json({loggedIn : false, loginData: null});
    }
  }
  catch(err){
    res.status(404).json(err.toString());
  }
});


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

// 특정 user 정보 수정
router.put('/:user_id', async(req, res) => {
    const user_id = req.params.user_id;
    const {user_name, user_email, user_password} = req.body;

    try{
        const user = await UserServiceInstance.putOneUser(user_id, user_name, user_email, user_password);
        res.status(201).json(user);
        
    }
    catch(err){
        res.status(404).json(err.toString());
    }
})

// 특정 user의 username 가져오기
router.get('/:user_id/username', async (req, res) => {
    const user_id = req.params.user_id;

    try{
        const user_name = await UserServiceInstance.getOneUserName(user_id);
        res.status(200).json({user_name});

    }
    catch(err) {
        res.status(404).json(err.toString());
    }

});

// 특정 user의 username 수정하기
router.put('/:user_id/username', async(req, res) => {
    const user_id = req.params.user_id;
    const {user_name} = req.body;

    try{
        const updated_user = await UserServiceInstance.putOneUserName(user_id, user_name);
        res.status(201).json(updated_user);
    }
    catch(err) {
        res.status(404).json(err.toString());
    }

})

router.post('/signup', async(req,res) => {
  // 포스트맨에서 userName, password를 넣으면
  const { user_id, user_pw, user_name } = req.body
  try {
    const address = await UserServiceInstance.signUp( user_id, user_pw, user_name);
    console.log(address);
    res.status(201).json(address);
  }
  catch(err){
    res.status(404).json(err.toString());
  }
});

export default router;
