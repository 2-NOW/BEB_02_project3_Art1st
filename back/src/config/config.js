import dotenv from 'dotenv';
dotenv.config();
console.log(`환경변수 ${process.env.MYSQL_USER}`);

// // MySQL & Sequelize configuration
// const development = {
//   username: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PW,
//   database: process.env.MYSQL_NAME,
//   host: "127.0.0.1",
//   dialect: "mysql",
//   port: 3306, // mysql은 3306 port 사용
//   timezone: "+09:00",
//   //logging: true
// };

// const production = {
//   username: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PW,
//   database: 'Project5_test',
//   host: "127.0.0.1",
//   dialect: "mysql",
// };

// const test = {
//   username: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PW,
//   database: "Project5_production",
//   host: "127.0.0.1",
//   dialect: "mysql",
// };

// export default { development, production, test };




// MySQL & Sequelize configuration
const development = {
  username: 'root',
  password: '153945',
  database: 'Project5',
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3306, // mysql은 3306 port 사용
  timezone: "+09:00",
  //logging: true
};

const production = {
  username: 'root',
  password: '153945',
  database: 'Project5_test',
  host: "127.0.0.1",
  dialect: "mysql",
};

const test = {
  username: 'root',
  password: '153945',
  database: "Project5_production",
  host: "127.0.0.1",
  dialect: "mysql",
};

export default { development, production, test };

