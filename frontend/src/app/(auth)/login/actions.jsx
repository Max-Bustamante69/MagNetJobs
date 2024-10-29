"use server"

import { isRedirectError } from "next/dist/client/components/redirect";
import {lucia} from "@/auth";
import { verify } from "@node-rs/argon2";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { json } from "docker/src/languages";

export async function login(credentials){
    try {
        
        const { username, password } = credentials;
        
        const existingUser = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/?search=${username}`
        );

        const data = await existingUser.json();
    
        if (data.length === 0) {
        return { error: "User not found" };
        }
        

        console.log(data);
        
    
        const user = data[0];

       

        if (!user || !user.password_hash) {
          return { error: `Iconrrect Username ${JSON.stringify(data)}` };
        }



    
        const isValidPassword = await verify(user.password_hash, password, {
          memoryCost: 19456,
          timeCost: 2,
          outputLen: 32,
          parallelism: 1,
        });
    
        if (!isValidPassword) {
        return { error: "Iconrrect  Password" };
        }


    
        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
        );
    
        return redirect("/");
    } catch (error) {
        if (isRedirectError(error)) throw error;
        console.error('the error ' + error);
        return { error : String(error) };
    }
}