import db from '../models/index.js'
import UserService from './user.js';
import OrderService from './order.js';

class CommentService {
    constructor() {
        this.Comment = db.Comment;
        this.User = db.User;
        this.Profile = db.Profile;
        this.OrderServiceInterface = new OrderService();
    }

    // 작성자의 id number 확인
    async getWriterId(user_id){
        try{
            const user = await this.User.findOne({where: {user_id: user_id}});
            if(user){
                return user.id;
            }
            else {
                throw Error('Not Found User');
            }
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // artworkd의 Comment 조회
    async getArtworkComment(artwork_id) {
        try{
            const comments = await this.Comment.findAll({
                attributes: ['content', 'createdAt', 
                            [db.Sequelize.col('user.id'), 'id'],
                            [db.Sequelize.col('user.name'), 'name'], 
                            [db.Sequelize.col('user.profile.picture'), 'picture']],
                where: {
                    artwork_id : artwork_id
                },
                order: [['createdAt', 'DESC']],
                include: {
                    model: this.User,
                    attributes: [],
                    include: {
                        model: this.Profile,
                        attributes: []
                    }
                },
                nest: true
            })  

            console.log(comments);

            return comments;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    // artwork_id에 댓글 하나 추가
    async postArtworkComment(artwork_id, content, user_id) {
        try{
            const comment = await this.Comment.create({
                content: content,
                user_id: await this.getWriterId(user_id),
                artwork_id: artwork_id
            })
            this.OrderServiceInterface.compensate(user_id, 1);
            return true;
        }
        catch(err) {
            throw Error(err.toString());
        }
    }
}

export default CommentService;
