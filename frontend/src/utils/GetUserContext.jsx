"use server";
import LoadUser from "@/utils/LoadUser";
export async function getUserContext()
{
    const userOnSessionName = 'maxinhos';
    const userOnSession= await LoadUser(userOnSessionName);

    return userOnSession;
}