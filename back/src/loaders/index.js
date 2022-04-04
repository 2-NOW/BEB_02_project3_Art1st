import expressLoader from './express.js';
import mysqlLoader from './mysql.js';

export default async ({expressApp}) => {
    await mysqlLoader();
    console.log('mySQL Initialized');
    
    await expressLoader({app: expressApp});
    console.log('Express Initialized');
}