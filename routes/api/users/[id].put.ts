import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { NewUser, users } from "../../../db/schema/user";
import { eq } from "drizzle-orm";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

export default eventHandler(async (event) => {
  const userId = parseInt(getRouterParam(event, "id"));

  if (!Number.isInteger(userId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID should be an integer",
    });
  }

  const { fullName, email } = await readBody<NewUser>(event);

  const updatedUser = await db
    .update(users)
    .set({ fullName, email })
    .where(eq(users.id, userId))
    .returning();

  return updatedUser[0];
});
