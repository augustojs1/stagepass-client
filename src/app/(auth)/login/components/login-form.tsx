"use client";

import { Input } from "@/app/components";
import { Button } from "@/app/components/ui/form/button";
import Link from "next/link";

export function LoginForm() {
  return (
    <div className="max-w-[551px] w-full bg-white rounded-md py-9 px-8">
      <div className="mb-10">
        <h1 className="font-display font-bold text-black-3 text-[48px] text-center">
          Welcome back.
        </h1>
        <p className="font-display text-[18px] font-500 text-gray-4 text-center">
          Sign in to continue
        </p>
      </div>
      <form className="max-w-[359px] w-full mx-auto flex flex-col gap-7">
        <Input label="Email" placeholder="email@email.com" type="text" />
        <Input label="Password" placeholder="password" type="password" />
        <Button className="mt-2" variant="primary" block>
          Login
        </Button>
      </form>
      <p className="text-center mt-8 text-[14px] font-[400] text-black-3">
        Don&apos;t have an account?
        <Link
          href="/sign-up"
          className="text-primary text-[14px] font-[700] ml-1"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
