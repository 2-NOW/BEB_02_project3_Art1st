import db from '../models/index.js';

export default async () => {
    db.sequelize.sync().then( () => {
        console.log(" DB 연결 성공");
    }).catch(err => {
        console.log("연결 실패");
        console.log(err)
    });
    return;
}
