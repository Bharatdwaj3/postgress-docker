import 'dotenv/config';

const Fbase_project_id=process.env.Fbase_project_id||"some_firebase_project_id";
const Fbase_public_key=process.env.Fbase_public_key||"firebase_project_public_key"; 
const Fbase_private_key_id=process.env.Fbase_private_key_id||"firebase_project_private_key_id"; 
const Fbase_client_email=process.env.Fbase_client_email||"firebase_project_client_email_id";
const Fbase_client_id=process.env.Fbase_client_id||"firebase_project_client_id";
const Fbase_auth_uri=process.env.Fbase_auth_uri||"google_auth_uri";
const Fbase_token_uri=process.env.Fbase_token_uri||"google_auth_token";
const Fbase_auth_provider_x509_cert_url=process.env.Fbase_auth_provider_x509_cert_url||"auth_provider"; 
const Fbase_client_x509_cert_url=process.env.Fbase_client_x509_cert_url||"auth_provider_url"; 
const Fbase_universe_domain=process.env.Fbase_universe_domain||"google_universal_domain";


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
    Fbase_project_id, Fbase_public_key, Fbase_private_key_id, Fbase_client_email,Fbase_client_id,Fbase_auth_uri,Fbase_token_uri,Fbase_auth_provider_x509_cert_url, Fbase_client_x509_cert_url, Fbase_universe_domain,     
    //F_API_KEY, F_AUTH_DOMAIN, F_PROJECT_ID, F_STORAGE_BUCKET, F_MSG_ID, F_APP_ID,
    DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT,
    SESSION_SECRECT, 
    JWT_ACC_EXPIRES_IN, JWT_ACC_SECRECT, JWT_REF_EXPIRES_IN, JWT_REF_SECRECT,
    GOOGLE_CALLBACK_URI, GOOGLE_CLIENT_ID,  GOOGLE_CLIENT_SECRET,
    DISCORD_CALLBACK_URI, DISCORD_CLIENT_ID,  DISCORD_CLIENT_SECRET,
    EMAIL_FROM,
    OTP_EXPIRES_MINUTES,
    SMTP_HOST, SMTP_PORT, SMTP_SECURE,SMTP_USER, SMTP_PASS, 
};