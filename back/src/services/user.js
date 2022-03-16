import db from '../models/index.js';

class UserService {
    constructor(){
        this.User = db.User;
    }

    // 전체 유저 정보 불러오기
    async getAllUsers(){
        try{
            const users = await this.User.findAll();
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
                where : { id: user_id}
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
    async putOneUserName(user_id, new_user_name){
        try {
            const user = await this.getOneUser(user_id);
            await user.update({name: new_user_name});
            await user.save();

            return user;
        }
        catch(err) {
            throw Error(err.toString());
        }

    }

}

export default UserService;