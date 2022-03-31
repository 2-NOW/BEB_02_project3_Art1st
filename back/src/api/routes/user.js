import { Router } from "express";
import UserService from "../../services/user.js";
import KlaytnService from "../../services/klaytn.js";
const UserServiceInstance = new UserService();
const KlaytnServiceInstance = new KlaytnService();
const router = Router();

async function floating(fl){
  fl = fl.split('.');
  if(fl.length == 2) {
      fl[1] = fl[1].slice(0,2);
  }
  return fl.join('.');
}

// 스왑 후 잔액 변경
router.put('/balance', async(req, res)=> {
  const { balance, action } = req.body;
  const { user_id } = req.session;

  try{
    if(user_id === undefined) return res.status(400).json("Error: Bad Request");
     
    if(action === 'buy') { // klay -> token
      // balance 추가
      const updatedBalance = await UserServiceInstance.addUserBalance(user_id, balance);
      return res.status(201).json(updatedBalance);
    }
    else if (action === 'sell') { // token -> klay
      // balance 감소
      const updatedBalance = await UserServiceInstance.subUserBalance(user_id, balance);
      return res.status(201).json(updatedBalance);
    }
    else {
      return res.status(400).json("Error: Bad Request");
    }
  }
  catch(err){
      res.status(404).json(err.toString());
  }
})

// 스왑 가능한 토큰 잔액 확인
router.get('/balance', async(req, res) => {
  const {user_id} = req.session;

  try{
    // 스왑 가능한 토큰 잔액을 확인 (db상의 값과 onchain 상의 값 중 min 값 반환)
    const {exchangable_balance} = await KlaytnServiceInstance.getTokenBalance(user_id);
    res.status(200).json(exchangable_balance);
  }
  catch(err){
    res.status(500).json(err.toString()); // onchain 상의 토큰 잔액을 불러오지 못하는 경우는 -> server 문제
  }
})

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

// Artworks Page Top Creator 15명 Users 정보 가져오기 
router.get('/topCreator', async (req, res) => {
  try{
      const TopUsers = await UserServiceInstance.getTopUsers();
      res.status(200).json(TopUsers);
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
router.get('/specificUser', async(req, res) => {
  const {user_id} = req.body;
  if(user_id){
      try{
        const user = await UserServiceInstance.getOneUser(user_id);
        user.price = await floating(user.price);
        res.status(200).json(user);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
  } else {
    try{
      const user = await UserServiceInstance.getOneUser(req.session.user_id);
      res.status(200).json(user);
    }
    catch(err){
        res.status(404).json(err.toString());
    }
  }
});

// 특정 user 정보 수정
router.put('/specificUser', async(req, res) => {
    const {edit_user_name, edit_user_id, edit_user_password} = req.body;
    const { user_id } = req.session;
    try{
      if(user_id === undefined) return res.status(400).json("Error: Bad Request");
      const user = await UserServiceInstance.putOneUser(user_id, edit_user_name, edit_user_id, edit_user_password);
      user.price = await floating(user.price);
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
  const { user_id, user_pw } = req.body
  try {
    const address = await UserServiceInstance.signUp( user_id, user_pw);
    console.log(address);
    res.status(201).json(address);
  }
  catch(err){
    res.status(404).json(err.toString());
  }
});

export default router;
