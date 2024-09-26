"use server";

import { signUpSchema } from "@/lib/validation";
import { lucia } from "@/auth";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";

var hash_pass = ''

export async function signUp(credentials) {
  try {
    const { email, password, username } = signUpSchema.parse(credentials);

    // Hash the password
    const hashPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Generate a unique user ID
    const userId = generateIdFromEntropySize(10); // Ensure this is string-based

    // Check for existing username
    // Check for existing username
    const existingUsernameResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/?search=${username}`
    );
    const dataUsername = await existingUsernameResponse.json();

    // Since dataUsername is an array, we need to check if any user has the same username
    const usernameExists = dataUsername.some(
      (user) => user.username === username
    );
    if (usernameExists) {
      return { error: "Username already exists" };
    }

    // Check for existing email
    const existingEmailResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/?search=${email}`
    );
    const dataEmail = await existingEmailResponse.json();

    // Similarly, check if any user has the same email
    const emailExists = dataEmail.some((user) => user.email === email);
    if (emailExists) {
      return { error: "Email already exists" };
    }

    // Create the user
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId, // This should match the Users model
        username,
        email,
        password_hash: hashPassword,
      }),
    });

    // Create a session for the user
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log("Error:", error);
    return { error: String(error) + ' ' + hash_pass };
  }
}
