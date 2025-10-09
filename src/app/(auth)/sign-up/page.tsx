import { Metadata } from "next";

import { SignUpForm } from "./components";

export const metadata: Metadata = {
  title: "StagePass | Sign Up",
  description: "Sign Up",
};

export default function SignUpPage() {
  return (
    <section className="h-screen w-full flex justify-center items-center px-5">
      <SignUpForm />
    </section>
  );
}
