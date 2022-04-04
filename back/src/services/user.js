import db from '../models/index.js';
import lightwallet from 'eth-lightwallet';
import { addAmount, subAmount, floating } from './utils/calculateKlay.js';

class UserService {
  constructor() {
    this.User = db.User;
    this.Profile = db.Profile;
    this.Website = db.Website;
  }

  // 전체 유저 정보 불러오기
  async getAllUsers() {
    try {
      let users = await this.User.findAll();
      users = users.map((el) => {
        return {
          name: el.name,
          user_id: el.user_id,
          balance: el.balance,
          donation_balance: el.donation_balance,
          total_sales: el.total_sales,
        };
      });
      return users;
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // 단순히 user가 존재 하는지 확인
  async isUser(user_id) {
    try {
      const user = await this.User.findOne({
        where: { id: user_id },
      });

      if (user === null) {
        throw Error('Not Found User');
      } else {
        return true;
      }
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // 특정 유저 정보 user_id로 불러오기
  async getOneUser(user_id) {
    try {
      const user = await this.User.findOne({
        where: { user_id: user_id },
      });

      if (user === null) {
        throw Error('Not Found User');
      }

      return user;
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // 유저 정보 id로 불러오기
  async getOneUserWithID(id) {
    try {
      const user = await this.User.findOne({
        where: { id: id },
      });

      if (user === null) {
        throw Error('Not Found User');
      }

      return user;
    } catch (err) {
      throw Error(err.toString());
    }
<<<<<<< HEAD
  }

  // 특정 유저 정보(내 정보임)불러오기
  async getMyUserInfo(user_id) {
    try {
      const user = await this.User.findOne({
        attributes: [
          'id',
          'name',
          'user_id',
          'balance',
          'donation_balance',
          'address',
          'total_sales',
        ],
        where: { user_id: user_id },
      });

      user.balance = await floating(user.balance);
      user.donation_balance = await floating(user.donation_balance);
      user.total_sales = await floating(user.total_sales);

      if (user === null) {
        throw Error('Not Found User');
      }

      const user_profile = await this.Profile.findOne({
        attributes: [
          'id',
          'picture',
          'description',
          'instargram',
          'tweeter',
          'facebook',
        ],
        where: { user_id: user.id },
      });

      return {
        user: user,
        user_profile: user_profile,
      };
    } catch (err) {
      throw Error(err.toString());
=======

    // 특정 유저 정보(내 정보임)불러오기
    async getMyUserInfo(user_id){
        try {
            const user = await this.User.findOne({
                attributes: ['id', 'name', 'user_id', 'balance', 'donation_balance', 'address', 'total_sales'],
                where : { user_id : user_id}
            });

            // user.balance = await floating(user.balance);
            // user.donation_balance = await floating(user.donation_balance);
            // user.total_sales = await floating(user.total_sales);

            if(user === null){
                throw Error('Not Found User');
            }
    
            const user_websites = await this.Website.findAll({
                attributes : ['id', 'site'],
                where : {user_id : user.id}
            });
    
            const user_profile = await this.Profile.findOne({
                attributes: ['id', 'picture', 'description'],
                where : {user_id : user.id}
            });
    
            return { user : user, user_profile : user_profile, user_websites: user_websites};
        }
        catch(err) {
            throw Error(err.toString());
        }
>>>>>>> 7a8bf30f1b8fea7aaa56073fef220ee3f074866e
    }
  }

  // 유저 정보 id로 불러오기
  async getOtherUserInfo(id) {
    try {
      const user = await this.User.findOne({
        attributes: ['id', 'name', 'user_id', 'address'],
        where: { id: id },
      });

      if (user === null) {
        throw Error('Not Found User');
      }

      const user_profile = await this.Profile.findOne({
        attributes: [
          'id',
          'picture',
          'description',
          'instargram',
          'tweeter',
          'facebook',
        ],
        where: { user_id: id },
      });

      return {
        user: user,
        user_profile: user_profile,
      };
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // 내 유저 데이터 수정
  async putMyUserInfo(
    user_id,
    new_user_desc,
    new_user_picture,
    new_user_name,
    instargram,
    tweeter,
    facebook
  ) {
    try {
      const { user, user_profile } = await this.getMyUserInfo(user_id);

      await user.update({ name: new_user_name });
      await user.save();

      await user_profile.update({
        picture: new_user_picture,
        description: new_user_desc,
        instargram: instargram,
        tweeter: tweeter,
        facebook: facebook,
      });
      await user_profile.save();

      return { user, user_profile };
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // klay->token 스왑 이후 balance 추가
  async addUserBalance(user_id, balance) {
    // 여기서 balance 단위는 klay 단위(10e18을 곱하지 않은 형태)로 들어와야 함

    const user = await this.getOneUser(user_id);
    await user.update({
      // 유저 balance 수정
      balance: await addAmount(user.balance, balance),
    });
    await user.save();

    return user.balance; // 변경 후의 balance를 반환
  }

  // token->klay 스왑 이후 balance 차감
  async subUserBalance(user_id, balance) {
    const user = await this.getOneUser(user_id);
    await user.update({
      balance: await subAmount(user.balance, balance),
    });
    await user.save();

    return user.balance; // 변경 후의 balance를 반환
  }

  // Artworks Page Top Creator 16명 Users 정보 가져오기
  async getTopUsers() {
    try {
      const topUsers = [];
      const users = await db.User.findAll({
        // 판매량순으로 유저 정렬
        order: [
          [db.Sequelize.cast(db.Sequelize.col('total_sales'), 'FLOAT'), 'DESC'],
        ],
        limit: 16,
        where: {
          [db.Sequelize.Op.not]: [{ name: 'server' }],
        },
      });

      for (let i = 0; i < users.length; i++) {
        let profile = await db.Profile.findOne({
          // 판매량순으로 정렬된 유저데이터로 프로필 테이블 조회
          where: { user_id: users[i].id },
        });

        if (profile === null) {
          break;
        }
        topUsers[i] = {
          id: users[i].id,
          name: users[i].name,
          ProfileImg: profile.picture,
        };
      }

      return topUsers;
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // 유저 회원가입
  async signUp(user_id, user_pw) {
    try {
      let address;
      await db.User.findOrCreate({
        // 조회에서 없으면 create 해주는 함수이다
        where: {
          user_id: user_id,
        },
        default: {
          password: user_pw,
        },
      })
        .then(([userInfo, created]) => {
          if (!created) {
            // 있으면 있다고 응답
            throw Error('User exists');
            // 없으면 DB에 저장
          } else {
            let mnemonic;
            mnemonic = lightwallet.keystore.generateRandomSeed(); // 랜덤한 니모닉 시드 생성
            // 생성된 니모닉코드와 password로 keyStore, address 생성
            lightwallet.keystore.createVault(
              {
                password: user_pw,
                seedPhrase: mnemonic,
                hdPathString: "m/0'/0'/0'",
              },
              async function (err, ks) {
                ks.keyFromPassword(user_pw, function (err, pwDerivedKey) {
                  ks.generateNewAddress(pwDerivedKey, 1); // n개의 새로운 주소생성

                  address = ks.getAddresses().toString();
                  let prv_key = ks.exportPrivateKey(address, pwDerivedKey);
                  let keyStore = ks.serialize();

                  db.User.update(
                    {
                      name: user_id,
                      password: user_pw,
                      balance: '0',
                      donation_balance: '0',
                      address: address,
                      private_key: prv_key,
                      total_sales: 0,
                    },
                    {
                      where: {
                        user_id: user_id,
                      },
<<<<<<< HEAD
                    }
                  ).catch((err) => {
                    console.error(err);
                  });

                  db.Profile.create({
                    picture:
                      'https://i.pinimg.com/564x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg',
                    description: '',
                    instargram: '',
                    tweeter: '',
                    facebook: '',
                    user_id: userInfo.id,
                  });
                });
=======
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
                // req.session.save(function () { 
                // });
                console.log(req.session);   
>>>>>>> 7a8bf30f1b8fea7aaa56073fef220ee3f074866e
              }
            );
          }
        })
        .then(() => {
          return address;
        });
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // 유저 로그아웃 세션 삭제
  async logout(session) {
    try {
      if (session.user_id) {
        session.destroy();
        return true;
      } else {
        throw Error('bad requset');
      }
    } catch (err) {
      throw Error(err.toString());
    }
  }

  // 유저 로그인
  async login(user_id, user_pw, req) {
    try {
      console.log(user_id, user_pw);
      const userInfo = await db.User.findOne({
        // DB 아이디 비번일치확인
        where: { user_id: user_id, password: user_pw },
      }).catch((err) => {
        console.error(err);
      });

      if (!userInfo) {
        throw Error('not authorized');
      } else {
        // 있으면 세션ID 생성
        req.session.user_id = req.body.user_id;
        req.session.save(() => {
          console.log(req.session);
        });
        console.log(req.session);
      }
    } catch (err) {
      throw Error(err.toString());
    }
  }
}

export default UserService;
