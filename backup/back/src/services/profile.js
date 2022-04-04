import db from '../models/index.js';
import UserService from './user.js';

class ProfileService {
    constructor() {
        this.Profile = db.Profile;
        this.UserServiceInterface = new UserService();
        this.User = db.User;
    }


    // 특정 유저 profile 가져오기
    async getUserProfile(user_id) {
        try{
            let userId = await this.User.findOne({where: {user_id: user_id}}).catch((err) => {
                console.log(err);
            })
            userId = userId.dataValues.id
            const profile = await this.Profile.findOne({where : { user_id : userId }});
            if(profile === null){
                // 실제 있는 사용자인지 확인
                await this.UserServiceInterface.isUser(user_id); 
    
                // user 정보는 있는데 profile 정보는 없음 
                // -> post로 만들어 주어야 함
                // (website는 선택 사항이지만, profile은 선택 사항이 아님. 기본적인 사항)
                throw Error ('Not Found User Profile');
            }
            else {
                return profile;
            }
        }
        catch(err){
            throw Error (err.toString());
        }

    }

    // 유저 더미 프로필 데이터 추가
    async postUserProfile(user_id) {
        try{
            if(await this.Profile.findOne({where : { user_id : user_id }})){
                // 이미 profile이 존재
                throw Error ('User Profile data already exists');
            }
            else {
                console.log(user_id)
                let userId = await this.User.findOne({where: {user_id: user_id}}).catch((err) => {
                    console.log(err);
                })
                userId = userId.dataValues.id
                const user_profile= await db.Profile.create({
                    picture: '',
                    description: '',
                    user_id: userId
                });

                return user_profile;
            }
        }
        catch(err) {
            throw Error(err.toString());
        }
    }

    // 프로필 - 유저 설명만 가져오기
    async getUserDesc(user_id) {
        try{
            const user_profile = await this.getUserProfile(user_id);
            return user_profile.description;
        }
        catch(err){
            throw Error (err.toString());
        }
    }

    // 프로필 - 유저 정보 업데이트
    async putUserProfile(user_id, user_desc, user_pic) {
        try{
            const user_profile = await this.getUserProfile(user_id);
            await user_profile.update({description: user_desc, picture: user_pic});
            await user_profile.save();

            return user_profile;
        }
        catch(err){
            throw Error (err.toString());
        }
    }

    // 프로필 - 유저 설명 등록 -> 이미 더미 데이터가 있으니 모두 다 수정 api를 쓰는 것이 좋을 듯. 로직은 같음.
    async putUserDesc(user_id, user_desc) {
        try{
            const user_profile = await this.getUserProfile(user_id);
            await user_profile.update({description: user_desc});
            await user_profile.save();

            return user_profile;
        }
        catch(err) {
            throw Error (err.toString());
        }
    }

    // 프로필 - 유저 프로필 사진 가져오기
    async getUserPic(user_id) {
        try{
            const user_profile = await this.getUserProfile(user_id);
            return user_profile.picture;
        }
        catch(err){
            throw Error (err.toString());
        }
    }

    // 프로필 - 유저 프로필 사진 등록하기 -> 이미 더미 데이터가 있으니 모두 다 수정 api를 쓰는 것이 좋을 듯. 로직은 같음.
    async putUserPic(user_id, user_pic) {
        try{
            const user_profile = await this.getUserProfile(user_id);
            await user_profile.update({picture: user_pic});
            await user_profile.save();
            
            return user_profile;
        }
        catch(err) {
            throw Error (err.toString());
        }
    }
}

export default ProfileService;
