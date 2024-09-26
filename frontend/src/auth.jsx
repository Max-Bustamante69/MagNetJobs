import { Lucia } from "lucia";
import { NeonHTTPAdapter } from "@lucia-auth/adapter-postgresql";
import { neon } from "@neondatabase/serverless";
import { cache } from "react";
import { cookies } from "next/headers";

const sql = neon(process.env.DATABASE_URL);

const adapter = new NeonHTTPAdapter(sql, {
  user: "magnetJobs_users",
  session: "magnetJobs_session",
});



export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: async (user) => {
    const { id, email, username, avatar_image, google_id } = user;
    return { id, email, username, avatar_image, google_id };
  },
});

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!result.session) {
      const cookie = lucia.createBlankSessionCookie();
      cookies.set(cookie.name, cookie.value, cookie.attributes);
    }
  } catch (error) {
    console.log(error);
  }

  return result;
});
