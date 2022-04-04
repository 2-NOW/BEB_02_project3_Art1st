import dotenv from 'dotenv';
dotenv.config();
const env = process.env;

// MySQL & Sequelize configuration
const development = {
  username: env.MYSQL_USER,
  password: env.MYSQL_PW,
  database: env.MYSQL_NAME,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  dialectOptions: {
    useUTC: false,
    charset: "utf8mb4",
    dateStrings: true,
    typeCast: true
  },
  port: env.MYSQL_PORT,
  timezone: "+09:00",
  //logging: true
};

const production = {
  username: env.MYSQL_USER,
  password: env.MYSQL_PW,
  database: env.MYSQL_NAME,
  host: env.MYSQL_HOST,
  dialect: "mysql",
};

const test = {
  username: env.MYSQL_USER,
  password: env.MYSQL_PW,
  database: env.MYSQL_NAME,
  host: env.MYSQL_HOST,
  dialect: "mysql",
};

export default { development, production, test };