import db from '../models/index.js';
import lightwallet from "eth-lightwallet";


class UserService {
    constructor(){
        this.User = db.User;
    }

    // 전체 유저 정보 불러오기
    async getAllUsers(){
        try{
            let users = await this.User.findAll();
            users = users.map((el) => {
                return { name : el.name, user_id : el.user_id,  balance : el.balance, donation_balance : el.donation_balance, total_sales : el.total_sales }
            })
            return users;
        }
        catch(err) {
            throw Error(err.toString());
        }
    }

    // 단순히 user가 존재 하는지 확인
    async isUser(user_id){
        try {
            const user = await this.User.findOne({
                where : { id: user_id}
            });

            if(user === null) {
                throw Error('Not Found User');
            }
            else {
                return true;
            }
        }
        catch(err) {
            throw Error(err.toString());
        }

    }

    // 특정 유저 정보 불러오기
    async getOneUser(user_id){
        try {
            const user = await this.User.findOne({
                where : { user_id : user_id}
            });

            if(user === null){
                throw Error('Not Found User');
            }
            else {
                return user;
            }
        }
        catch(err) {
            throw Error(err.toString());
        }
    }

    // 유저 데이터 수정
    async putOneUser(user_id, edit_user_name, edit_user_id, edit_user_password) {
        try{
            let user = await this.getOneUser(user_id);
            await user.update({name: edit_user_name, user_id: edit_user_id, password: edit_user_password});
            await user.save();
            return { name : user.name, user_id : user.user_id,  balance : user.balance, donation_balance : user.donation_balance, total_sales : user.total_sales, private_key : user.private_key}
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // 특정 유저 name 가져오기
    async getOneUserName(user_id){
        try {
            const user = await this.getOneUser(user_id);
            return user.name;
        }
        catch(err) {
            throw Error(err.toString());
        }
    }

    // 특정 유저 name 수정하기
    async putOneUserName(user_id, user_name){
        try {
            const user = await this.getOneUser(user_id);
            await user.update({name: user_name});
            await user.save();

            return user;
        }
        catch(err) {
            throw Error(err.toString());
        }

    }
    //// Artworks Page Top Creator 16명 Users 정보 가져오기 
    async getTopUsers(){
        try{ 
            const topUsers = [];  
            const profile = [];
            const users = await db.User.findAll({ // 판매량순으로 유저 정렬
                order: [["total_sales", "DESC"]],
            })
            for(let i = 0; i < 16; i ++){
                profile[i] = await db.Profile.findOne({ // 판매량순으로 정렬된 유저데이터로 프로필 테이블 조회 
                    where : { user_id : users[i].id}
                });
                topUsers[i] = { name : users[i].name, ProfileImg : profile[i].picture};
            }        
   
            return topUsers;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // 유저 회원가입
    async signUp(user_id, user_pw){
        try {
            let address;
            await db.User.findOrCreate({ // 조회에서 없으면 create 해주는 함수이다
                where: { 
                  user_id: user_id
                },
                default: {
                  password: user_pw
                }
              })
              .then(([userInfo, created]) => {
                if (!created) {
                  // 있으면 있다고 응답
                  throw Error("User exists");
                // 없으면 DB에 저장
                } else {
                  let mnemonic;
                  mnemonic = lightwallet.keystore.generateRandomSeed(); // 랜덤한 니모닉 시드 생성  
                  // 생성된 니모닉코드와 password로 keyStore, address 생성
                  lightwallet.keystore.createVault({
                    password: user_pw, 
                    seedPhrase: mnemonic,
                    hdPathString: "m/0'/0'/0'"
                  },
                  function (err, ks) {
                    ks.keyFromPassword(user_pw, function (err, pwDerivedKey) {
                      ks.generateNewAddress(pwDerivedKey, 1); // n개의 새로운 주소생성
                      
                      address = (ks.getAddresses()).toString();
                      let prv_key = ks.exportPrivateKey(address,pwDerivedKey);
                      let keyStore = ks.serialize();
            
                      db.User.update({
                        name: user_id,
                        password: user_pw,
                        balance: 0,
                        donation_balance: 0,
                        address: address,
                        private_key: prv_key,
                        total_sales: 0,
                      },
                        {
                          where: {
                            user_id: user_id
                          }
                        }
                      )
                      .catch(err => {
                        console.error(err);
                      })
                    });
                  });
                }
              }).then(()=>{
                console.log(address);
                return address
              })
        }
        catch(err){
            throw Error(err.toString());
        }
    }


    // 유저 로그아웃 세션 삭제
    async logout(session){
        try {
            if (session.user_id) { 
                session.destroy();
                return true;
            } else {
                throw Error('bad requset');
            }
        }
        catch(err) {
            throw Error(err.toString());
        }
    }

    // 유저 로그인 
    async login(user_id, user_pw, req){
        try {
            console.log(user_id, user_pw);
            const userInfo = await db.User.findOne({ // DB 아이디 비번일치확인
                where: { user_id : user_id, password: user_pw }
              }).catch(err => {
                console.error(err);
              });
              
              if (!userInfo) {
                throw Error('not authorized');
              } else { // 있으면 세션ID 생성 
                console.log(userInfo);
                req.session.user_id = req.body.user_id;
                req.session.save(function () { 
                });
                console.log(req.session);   
              }
        }
        catch(err) {
            throw Error(err.toString());
        }
   
    }
}

export default UserService;
