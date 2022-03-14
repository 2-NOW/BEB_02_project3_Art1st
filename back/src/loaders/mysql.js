import db from '../models/index.js';

export default async () => {
    db.sequelize.sync();
    
    return;
}