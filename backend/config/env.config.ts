import 'dotenv/config';

const DB_USER = process.env.DB_USER || 'some_pgSql_db_user';
const DB_HOST =  process.env.DB_HOST || 'some_pgSql_db_host'
const DB_PORT = process.env.DB_PORT || 'some_pgSql_db_port';
const DB_NAME =  process.env.DB_NAME || 'some_pgSql_db_name';
const DB_PASSWORD = process.env.DB_PASSWORD || 'some_pgSql_db_password';


const SESSION_SECRECT = process.env.SESSION_SECRECT || 'defaultSessionsecret';

const JWT_REF_SECRECT = process.env.JWT_REF_SECRECT || 'defaultjwtsecret';
const JWT_REF_EXPIRES_IN = process.env.JWT_REF_EXPIRES_IN || '1d';

const JWT_ACC_SECRECT = process.env.JWT_ACC_SECRECT || 'defaultjwtsecret';
const JWT_ACC_EXPIRES_IN = process.env.JWT_ACC_EXPIRES_IN || '15m';


const DISCORD_CLIENT_SECRET=process.env.DISCORD_CLIENT_SECRET || 'some secret';
const DISCORD_CLIENT_ID=process.env.DISCORD_CLIENT_ID || 'some id';
const DISCORD_CALLBACK_URI=process.env.DISCORD_CALLBACK_URI || 'some uri';

const GOOGLE_CLIENT_SECRET=process.env.Google_CLIENT_SECRET || 'some secret';
const GOOGLE_CLIENT_ID=process.env.Google_CLIENT_ID || 'some id';
const GOOGLE_CALLBACK_URI=process.env.Google_CALLBACK_URI || 'some uri';

const EMAIL_FROM=process.env.EMAIL_FROM || 'no-reply@yourapp.com';
const  OTP_EXPIRES_MINUTES=15;

const SMTP_HOST=process.env.SMTP_HOST ||  'smtp.gmail.com';
const SMTP_PORT=process.env.SMTP_PORT || 345
const SMTP_SECURE=process.env.SMTP_SECURE || true
const SMTP_USER=process.env.SMTP_USER || 'some smtp user'
const SMTP_PASS=process.env.SMTP_PASS  || 'some smtp secret'

export {
    DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT,
    SESSION_SECRECT, 
    JWT_ACC_EXPIRES_IN, JWT_ACC_SECRECT, JWT_REF_EXPIRES_IN, JWT_REF_SECRECT,
    GOOGLE_CALLBACK_URI, GOOGLE_CLIENT_ID,  GOOGLE_CLIENT_SECRET,
    DISCORD_CALLBACK_URI, DISCORD_CLIENT_ID,  DISCORD_CLIENT_SECRET,
    EMAIL_FROM,
    OTP_EXPIRES_MINUTES,
    SMTP_HOST, SMTP_PORT, SMTP_SECURE,SMTP_USER, SMTP_PASS, 
};