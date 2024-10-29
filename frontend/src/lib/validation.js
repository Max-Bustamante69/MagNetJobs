import { z } from "zod"

const requiredString = z.string().trim().min(1, "Required")

export const signUpSchema = z.object({
    first_name: requiredString,
    last_name: requiredString,
    email: requiredString.email("Invalid email address"),
    password: requiredString.min(8, "Password must be at least 8 characters"),
    username: requiredString.regex(/^[a-zA-Z0-9_-]+$/, "Invalid username, only letters, numbers, underscores, and hyphens are allowed"),
    })

export const loginSchema = z.object({
    username: requiredString,
    password: requiredString,
    })
