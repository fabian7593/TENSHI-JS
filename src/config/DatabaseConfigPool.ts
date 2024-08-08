import mariadb from 'mariadb';
import {default as config} from "@root/tenshi-config";

const pool = mariadb.createPool({
  host: config.DB.HOST,
  user: config.DB.USER,
  password: config.DB.PASSWORD,
  database: config.DB.NAME,
  port: config.DB.PORT,
  connectionLimit: 150,
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci'
});

export default pool;
