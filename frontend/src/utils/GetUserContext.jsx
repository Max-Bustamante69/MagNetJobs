"use server";
import LoadUser from "@/utils/LoadUser";
export async function getUserContext()
{
    const userOnSessionName = 'maxinhos69';
    const userOnSession= await LoadUser(userOnSessionName);

    return userOnSession;
}