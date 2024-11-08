"use server";

import { validateRequest } from "@/auth";
import fetcher from "./fetcher";
export async function getUserContext()
{
    const session = await validateRequest();
    const userId = session?.user?.id;
    const userOnSession = userId
      ? await fetcher(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`
        )
      : null;

    return userOnSession;
}