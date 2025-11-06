"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorBadge, Input } from "@/components";
import { Button } from "@/components/ui/form/button";
import { SignInFormData, signUpSchema } from "@/schemas";
import { signUpAction } from "@/actions";
import type {
  ApiResponse,
  LoginResponse,
  SignUpFormData,
  SignUpPayload,
} from "@/models";

export function SignUpForm() {
  const [signUpResponse, setsignUpResponse] = React.useState<
    ApiResponse<LoginResponse>
  >({
    success: false,
    message: null,
    data: null,
  });
  const [showApiError, setShowApiError] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: SignUpFormData) => {
    const payload: SignUpPayload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    const { data, message, success } = await signUpAction(payload);

    if (!success) {
      setShowApiError(true);
    }

    setsignUpResponse({
      data: data,
      message: message,
      success: success,
    });
  };

  const hideApiErrorBadge = () => {
    setShowApiError(false);
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
        {showApiError && (
          <ErrorBadge
            message={signUpResponse.message}
            showErrorBadge={hideApiErrorBadge}
          />
        )}
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
