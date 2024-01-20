import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema/*.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: true,
  },
} satisfies Config;
