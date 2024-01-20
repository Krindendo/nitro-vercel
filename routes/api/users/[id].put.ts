import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { NewUser, users } from "../../../db/schema/user";
import { eq } from "drizzle-orm";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { fullName, email } = await readBody<NewUser>(event);
  const updatedUser = await db
    .update(users)
    .set({ fullName, email })
    .where(eq(users.id, Number(id)))
    .returning();
  return { data: updatedUser[0] };
});
