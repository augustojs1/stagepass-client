import { Metadata } from "next";

import { LoginForm } from "./components";

export const metadata: Metadata = {
  title: "StagePass | Login",
  description: "Login",
};

export default function LoginPage() {
  return (
    <section className="h-screen w-full flex justify-center items-center px-5">
      <LoginForm />
    </section>
  );
}
