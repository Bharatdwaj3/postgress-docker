import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

import {DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT} from "./env.config"
import dotenv from 'dotenv';

dotenv.config();



const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

pool.on('connect', () => {
  console.log('Connection pool established with database');
});

export default pool;