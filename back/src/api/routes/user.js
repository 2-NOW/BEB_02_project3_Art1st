import { Router } from "express";
import lightwallet from "eth-lightwallet";
import db from "../../models/index.js";
import UserService from "../../services/user.js";
const UserServiceInstance = new UserService();
const router = Router();


router.post('/login', async (req, res) => { 
  console.log(req.body);
  const userInfo = await db.User.findOne({ // DB 아이디 비번일치확인
    where: { email : req.body.userId, password: req.body.password }
  }).catch(err => {
    console.error(err);
  });

  if (!userInfo) { // 없으면 400
    res.status(400).send({ data: null, message: 'not authorized' });
  } else { // 있으면 세션ID 생성 
    req.session.save(function () { 
      req.session.userId = req.body.userId; 
      res.status(200).json({ message: 'ok' }); 
    }); 
  }
})  

router.delete('/logout', (req, res) => {
  if (!req.session.userId) { 
    res.status(400).send('bad requset');
  } else {
    req.session.destroy();
    res.status(200).json({ data: null, message: 'done' });
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
  const { userId, password, name} = req.body
  console.log( userId, password, name);
  await db.User.findOrCreate({ // 조회에서 없으면 create 해주는 함수이다
    where: { 
      email: userId
    },
    default: {
      password: password
    }
  })
  .then(([userInfo, created]) => {
    console.log('done!!!!!')
    if (!created) {
      // 있으면 있다고 응답
      res.status(404).send("User exists");
    // 없으면 DB에 저장
    } else {
      let mnemonic;
      mnemonic = lightwallet.keystore.generateRandomSeed(); // 랜덤한 니모닉 시드 생성  
      // 생성된 니모닉코드와 password로 keyStore, address 생성
      lightwallet.keystore.createVault({
        password: password, 
        seedPhrase: mnemonic,
        hdPathString: "m/0'/0'/0'"
      },
      function (err, ks) {
        ks.keyFromPassword(password, function (err, pwDerivedKey) {
          ks.generateNewAddress(pwDerivedKey, 1); // n개의 새로운 주소생성
          
          let address = (ks.getAddresses()).toString();  
          let prv_key = ks.exportPrivateKey(address,pwDerivedKey);
          let keyStore = ks.serialize();

          db.User.update({
            name: name,
            password: password,
            balance: 0,
            donation_balance: 0,
            address: address,
            private_key: prv_key,
            total_sales: 0,
          },
            {
              where: {
                email: userId
              }
            }
          )  
          .then(result => {
            // 주소를 보여준다
            res.status(200).send(address);
          })
          .catch(err => {
            console.error(err);
          })
        });
      });
    }
  })
  .catch(err => {
    console.error(err);
  })
});

export default router;
