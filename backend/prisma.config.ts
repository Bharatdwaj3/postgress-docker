// prisma.config.ts
import 'dotenv/config';           // if you need to load .env
import { defineConfig, env } from '@prisma/config';

const user=env('PgSql_User');
const pword=env('PgSql_Password');
const db=env('PgSql_Database');

const EPword = encodeURIComponent(pword);

export default defineConfig({
  schema: 'prisma/schema.prisma',   // adjust path if your schema is elsewhere
  datasource: {
    url: `postgresql://${user}:${EPword}@db:5432/${db}?schema=public`,       // or process.env.DATABASE_URL if you prefer
  },
});