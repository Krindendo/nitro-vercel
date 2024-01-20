import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { User, users } from "../../../db/schema/user";
import { eq } from "drizzle-orm";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const result: User[] = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)));
  return { data: result[0] };
});
