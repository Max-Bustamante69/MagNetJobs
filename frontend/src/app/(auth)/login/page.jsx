import Image from "next/image";
import Link from "next/link";
import LogInForm from "./LogInForm";

export const metadata = {
  title: "Log In",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Log in to MagNetJobs</h1>
            <p className="text-muted-foreground">
              A place where even <span className="italic">you</span> can find a
              friend.
            </p>
          </div>
          <div className="space-y-5">
            <LogInForm />
            <Link href="/signup" className="block text-center text-black hover:underline">
              Dont have and account? Register
            </Link>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1719937206168-f4c829152b91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="hidden w-1/2 object-cover md:block"
          width={1035}
          height={1380}
        />
      </div>
    </main>
  );
}
