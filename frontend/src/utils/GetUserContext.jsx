"use server";
import LoadUser from "@/utils/LoadUser";
export async function getUserContext()
{
    const userOnSessionName = 'maxinho';
    const userOnSession= await LoadUser(userOnSessionName);

    return userOnSession;
}