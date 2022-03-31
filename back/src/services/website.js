import db from '../models/index.js';
import UserService from './user.js';

class WebsiteService {
    constructor(){
            this.Website = db.Website;
            this.User = db.User;
            this.UserServiceInterface = new UserService();
    }

    // 전체 website 정보 불러오기
    async getAllWebsites() {
        try{
            const websites = await this.Website.findAll();
            return websites;
        }
        catch(err){
            throw Error (err.toString());
        }
    }

    // 특정 유저의 Website 정보 불러오기
    async getUserWebsites(user_id){
        try{
            await this.UserServiceInterface.isUser(user_id); // 유저가 있는지 확인. 없다면 error 발생
            let userId = await this.User.findOne({where: {user_id: user_id}}).catch((err) => {
                console.log(err);
            })
            userId = userId.dataValues.id
            const user_websites = await this.Website.findAll({where : { user_id : userId }});

            return user_websites;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // 특정 유저의 특정 웹사이트 가져오기
    async getUserOneWebsite(user_id, website_id){
        try{
            console.log(user_id, website_id);
            await this.UserServiceInterface.isUser(user_id); // 유저가 있는지 확인. 없다면 error 발생
            const user_website = await this.Website.findOne({
                where : { id: website_id, user_id: user_id}
            });
            console.log(user_website);
            if(user_website === null) {
                throw Error ('Not Found User Website');
            }
            else{
                return user_website;
            }
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async postUserWebsite(user_id, user_site){
        try{
            await this.UserServiceInterface.isUser(user_id); // 유저가 있는지 확인. 없다면 error 발생
            let userId = await this.User.findOne({where: {user_id: user_id}}).catch((err) => {
                console.log(err);
            })
            userId = userId.dataValues.id
            const user_website = await this.Website.create({
                site: user_site,
                user_id: userId
            });

            return user_website;
        }
        catch(err){
           throw Error(err.toString());
        }
    }

    async putUserWebsite(user_id, user_site, website_id) {
        try{
            const user_website = await this.getUserOneWebsite(user_id, website_id);
            await user_website.update({site: user_site});
            await user_website.save();
                
            return user_website;

        }
        catch(err){
            throw Error(err.toString());
        }
    }
    
    async deleteUserAllWebsites(user_id) {
        try {
            const user_websites = await this.getUserWebsites(user_id);
            await this.Website.destroy({ where : { user_id: user_id}});

            return user_websites;

        }
        catch (err) { 
            throw Error(err.toString());
        }
    }

    async deleteUserWebsite(user_id, website_id){
        try{
            let userId = await this.User.findOne({where: {user_id: user_id}}).catch((err) => {
                console.log(err);
            })
            userId = userId.dataValues.id
            console.log(userId);
            const user_website = await this.getUserOneWebsite(userId, website_id);
            console.log(user_website);
            await user_website.destroy();
            await user_website.save();

            return user_website // 삭제한 website 객체 반환
            
        }
        catch(err){
            throw Error(err.toString());
        }
    }

}

export default WebsiteService;
