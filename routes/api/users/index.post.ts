import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { NewUser, users } from "../../../db/schema/user";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

export default eventHandler(async (event) => {
  const body = await readBody<NewUser>(event);

  const newUser = await db.insert(users).values(body).returning();

  return newUser[0];
});
