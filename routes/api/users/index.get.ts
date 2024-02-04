import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { User, users } from "../../../db/schema/user";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

export default eventHandler(async () => {
  const result: User[] = await db.select().from(users);

  return result;
});
