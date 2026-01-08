const DB_USER = process.env.DB_USER || 'some_pgSql_db_user';
const DB_HOST =  process.env.DB_HOST || 'some_pgSql_db_host'
const DB_PORT = process.env.DB_PORT || 'some_pgSql_db_port';
const DB_NAME =  process.env.DB_NAME || 'some_pgSql_db_name';
const DB_PASSWORD = process.env.DB_PASSWORD || 'some_pgSql_db_password';

export {
    DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT,
}