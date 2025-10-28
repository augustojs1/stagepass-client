"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/app/components";
import { Button } from "@/app/components/ui/form/button";
import { SignInFormData, signUpSchema } from "../../login/schemas";
import { signUpAction } from "../../login/actions";
import { SignUpFormData, SignUpPayload } from "@/app/models";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormData) => {
    const payload: SignUpPayload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
    };

    const formData = new FormData();

    Object.entries(payload).forEach(([k, v]) => {
      console.log(`${k}: ${v}`);

      formData.append(k, v);
    });

    const response = await signUpAction(formData);
  };

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
      <form
        className="max-w-[359px] w-full mx-auto flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="First Name"
          placeholder="Joe"
          type="text"
          maxLength={50}
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          type="text"
          maxLength={50}
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <Input
          label="Email"
          placeholder="email@email.com"
          type="email"
          maxLength={50}
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          placeholder="*********"
          type="password"
          maxLength={50}
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          placeholder="*********"
          type="password"
          maxLength={50}
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <Button
          className="mt-2"
          variant="primary"
          block
          disabled={isSubmitting ? true : false}
        >
          {isSubmitting ? "Loading..." : "Sign Up"}
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
