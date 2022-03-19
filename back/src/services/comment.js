import db from '../models/index.js'

// mysql> desc comments;
// +------------+----------+------+-----+---------+----------------+
// | Field      | Type     | Null | Key | Default | Extra          |
// +------------+----------+------+-----+---------+----------------+
// | id         | int      | NO   | PRI | NULL    | auto_increment |
// | content    | text     | NO   |     | NULL    |                |
// | createdAt  | datetime | NO   |     | NULL    |                |
// | updatedAt  | datetime | NO   |     | NULL    |                |
// | user_id    | int      | YES  | MUL | NULL    |                |
// | artwork_id | int      | YES  | MUL | NULL    |                |
// +------------+----------+------+-----+---------+----------------+

class CommentService {
    constructor() {
        this.Comment = db.Comment;
    }

    // artworkd의 Comment 조회
    async getArtworkComment(artwork_id) {
        try{
            const comments = await this.Comment.findAll({
                where: {
                    artwork_id : artwork_id
                }
            })
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
                user_id: user_id,
                artwork_id: artwork_id
            })
            return comment;
        }
        catch(err) {
            throw Error(err.toString());
        }
    }
}

export default CommentService;