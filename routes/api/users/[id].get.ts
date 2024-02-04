import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { User, users } from "../../../db/schema/user";
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

  const result: User[] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

  return result[0];
});
