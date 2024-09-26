'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/validation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "./actions";
import  LoadingButton  from "@/components/LoadingButton";
import { useTransition, useState } from "react";

export const metadata = {
  title: "Sign Up",
  description: "Sign up for an account",
};

function SignUpForm() {

    const [error, setError] = useState(undefined);
    const [isPending, startTransition] = useTransition();


  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", username: "" },
  });

  async function onSubmit(data) {
    setError(undefined);
    startTransition(async () => {
        console.log(data)
        const {error} = await signUp(data);
        if (error) {
            setError(error);
        }

    })

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-red-500">{error}</p>}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black" htmlFor={field.name}>
                Username
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black bg-black bg-opacity-5"
                  placeholder="Username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black" htmlFor={field.name}>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="text-black bg-black bg-opacity-5"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black" htmlFor={field.name}>
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="text-black bg-black bg-opacity-5"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add more fields for email, password as needed */}
        <LoadingButton  loading={isPending} type="submit">
          Create Account
        </LoadingButton>
      </form>
    </Form>
  );
}

export default SignUpForm;
