"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validation/auth.schema";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Invalid email or password");
        return;
      }

      setUser(result);
      router.push("/feed");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-8 md:p-12 rounded-[6px] shadow-card transition-colors duration-300">
      {/* Logo */}
      <div className="mb-7 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-[30px] w-auto max-w-[161px]" />
      </div>

      <p className="text-text-body text-[16px] text-center mb-2">Welcome back</p>
      <h4 className="text-text-dark text-[28px] font-semibold text-center mb-[50px] leading-tight">
        Login to your account
      </h4>

      {/* Google sign-in button (decorative) */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-border bg-card rounded-[6px] py-3 px-4 mb-10 text-[16px] text-text-dark font-medium hover:bg-bg-page transition-colors cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5 flex-shrink-0 mr-2" />
        <span>Or sign-in with google</span>
      </button>

      {/* Or divider */}
      <div className="relative flex items-center justify-center mb-10">
        <div className="absolute left-0 w-[108px] h-[2px] border-t border-border rounded-[6px]" />
        <span className="bg-card px-4 text-[14px] text-[#C4C4C4] z-10">Or</span>
        <div className="absolute right-0 w-[108px] h-[2px] border-t border-border rounded-[6px]" />
      </div>

      {/* Error alert */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-xs rounded-[6px] p-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-[14px]">
          <label className="block text-text-muted text-[16px] font-medium mb-2">Email</label>
          <input
            type="email"
            className={`w-full h-[48px] bg-card border rounded-[6px] px-4 text-sm text-text-dark placeholder-[#C4C4C4] focus:border-primary focus:outline-none transition-colors ${
              errors.email ? "border-red-400" : "border-border"
            }`}
            placeholder="Enter email address"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-[14px]">
          <label className="block text-text-muted text-[16px] font-medium mb-2">Password</label>
          <input
            type="password"
            className={`w-full h-[48px] bg-card border rounded-[6px] px-4 text-sm text-text-dark placeholder-[#C4C4C4] focus:border-primary focus:outline-none transition-colors ${
              errors.password ? "border-red-400" : "border-border"
            }`}
            placeholder="Enter password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between mb-10 mt-6">
          <label className="flex items-center gap-2 text-[14px] text-text-body cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 accent-primary cursor-pointer"
            />
            Remember me
          </label>
          <p className="text-[14px] text-primary cursor-pointer font-medium hover:underline">
            Forgot password?
          </p>
        </div>

        {/* Submit */}
        <div className="mb-15">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1890FF] hover:bg-primary-dark text-white font-semibold py-[12px] rounded-[6px] text-[16px] transition-colors leading-[1.4] border border-[#1890FF] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Logging in..." : "Login now"}
          </button>
        </div>
      </form>

      {/* Register link */}
      <p className="text-[14px] text-text-muted text-center mt-6">
        Dont have an account?{" "}
        <Link href="/register" className="text-primary font-medium hover:underline">
          Create New Account
        </Link>
      </p>
    </div>
  );
}
