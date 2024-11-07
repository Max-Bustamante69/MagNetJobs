"use server";

import { validateRequest } from "@/auth";
export async function getUserContext()
{
    const session  = await validateRequest();
    const userId = session?.user?.id;
    
    const user = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`);
    const userOnSession = await user.json();


    return userOnSession;
}