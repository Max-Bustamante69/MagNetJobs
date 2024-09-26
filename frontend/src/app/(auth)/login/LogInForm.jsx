"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "./actions";
import { loginSchema } from "@/lib/validation";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition, useState } from "react";
import  LoadingButton  from "@/components/LoadingButton";

function LogInForm() {

        const [error, setError] = useState(undefined);
        const [isPending, startTransition] = useTransition();

        const form = useForm({
            resolver: zodResolver(loginSchema),
            defaultValues: { password: "", username: "" },
        });

        async function onSubmit(data) {
            setError(undefined);
            startTransition(async () => {
  
                const { error } = await login(data);
                if (error) {
                    console.log(error)
                    setError(error);
                }
            });
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
          <LoadingButton loading={isPending} type="submit">
            Log In
          </LoadingButton>
        </form>
      </Form>
    );
}

export default LogInForm;