"use client";

import Link from "next/link";

import { Input } from "@/app/components";
import { Button } from "@/app/components/ui/form/button";

export function SignUpForm() {
  return (
    <div className="max-w-[551px] w-full bg-white rounded-md py-9 px-8">
      <div className="mb-10">
        <h1 className="font-display font-bold text-black-3 text-[48px] text-center">
          Welcome.
        </h1>
        <p className="font-display text-[18px] font-500 text-gray-4 text-center">
          Create an account
        </p>
      </div>
      <form className="max-w-[359px] w-full mx-auto flex flex-col gap-2">
        <Input label="First Name" placeholder="Joe" type="text" />
        <Input label="Last Name" placeholder="Doe" type="text" />
        <Input label="Email" placeholder="email@email.com" type="email" />
        <Input label="Password" placeholder="*********" type="password" />
        <Input
          label="Confirm Password"
          placeholder="*********"
          type="password"
        />
        <Button className="mt-2" variant="primary" block>
          Sign Up
        </Button>
      </form>
      <p className="text-center mt-8 text-[14px] font-[400] text-black-3">
        Already have an account?
        <Link
          href="/login"
          className="text-primary text-[14px] font-[700] ml-1"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
