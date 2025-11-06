"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input, Button, ErrorBadge } from "@/components";
import { loginSchema, LoginFormData } from "@/schemas";
import { loginAction } from "@/actions";
import { ApiResponse, LoginResponse } from "@/models";

export function LoginForm() {
  const [loginResponse, setLoginResponse] = React.useState<
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
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (payload: LoginFormData) => {
    const formData = new FormData();
    Object.entries(payload).forEach(([k, v]) => formData.append(k, v));

    const response = await loginAction(formData);

    if (!response.success) {
      setShowApiError(true);
    }

    setLoginResponse({
      data: response.data,
      message: response.message,
      success: response.success,
    });
  };

  const hideApiErrorBadge = () => {
    setShowApiError(false);
  };

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
      <form
        className="max-w-[359px] w-full mx-auto flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Email"
          placeholder="email@email.com"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          maxLength={50}
        />
        <Input
          label="Password"
          placeholder="*********"
          type="password"
          {...register("password")}
          error={errors.password?.message}
          maxLength={50}
        />
        <Button
          className="mt-2"
          variant="primary"
          block
          disabled={isSubmitting ? true : false}
        >
          {isSubmitting ? "Loading..." : "Login"}
        </Button>
        {showApiError && (
          <ErrorBadge
            message={loginResponse.message}
            showErrorBadge={hideApiErrorBadge}
          />
        )}
      </form>
      <p className="text-center mt-3 text-[14px] font-[400] text-black-3">
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
