"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/validation/auth.schema";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "An error occurred during registration");
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
    <div className="bg-card p-6 sm:p-8 md:p-10 rounded-[6px] shadow-card transition-colors duration-300">
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-[30px] w-auto max-w-[161px]" />
      </div>

      <p className="text-text-body text-[16px] text-center mb-1">Get Started Now</p>
      <h4 className="text-text-dark text-[28px] font-semibold text-center mb-8 leading-tight">
        Registration
      </h4>

      {/* Google register button (decorative) */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-border bg-card rounded-[6px] py-3 px-4 mb-6 text-[16px] text-text-dark font-medium hover:bg-bg-page transition-colors cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5 flex-shrink-0 mr-2" />
        <span>Register with google</span>
      </button>

      {/* Or divider */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-full h-[1px] bg-border rounded-[6px]" />
        <span className="bg-card px-4 text-[14px] text-[#C4C4C4] z-10">Or</span>
      </div>

      {/* Error alert */}
      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-xs rounded-[6px] p-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First & Last Name Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* First Name */}
          <div>
            <label className="block text-text-muted text-[16px] font-medium mb-2">First Name</label>
            <input
              type="text"
              className={`w-full h-[48px] bg-card border rounded-[6px] px-4 text-sm text-text-dark placeholder-[#C4C4C4] focus:border-primary focus:outline-none transition-colors ${
                errors.firstName ? "border-red-400" : "border-border"
              }`}
              placeholder="Enter first name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-text-muted text-[16px] font-medium mb-2">Last Name</label>
            <input
              type="text"
              className={`w-full h-[48px] bg-card border rounded-[6px] px-4 text-sm text-text-dark placeholder-[#C4C4C4] focus:border-primary focus:outline-none transition-colors ${
                errors.lastName ? "border-red-400" : "border-border"
              }`}
              placeholder="Enter last name"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
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
        <div className="mb-4">
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

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-text-muted text-[16px] font-medium mb-2">Repeat Password</label>
          <input
            type="password"
            className={`w-full h-[48px] bg-card border rounded-[6px] px-4 text-sm text-text-dark placeholder-[#C4C4C4] focus:border-primary focus:outline-none transition-colors ${
              errors.confirmPassword ? "border-red-400" : "border-border"
            }`}
            placeholder="Repeat password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms checkbox */}
        <div className="flex items-center gap-2 mb-6 mt-4">
          <input
            type="checkbox"
            id="termsCheckbox"
            defaultChecked
            className="w-4 h-4 accent-primary cursor-pointer"
          />
          <label htmlFor="termsCheckbox" className="text-[14px] text-text-body cursor-pointer">
            I agree to terms &amp; conditions
          </label>
        </div>

        {/* Submit */}
        <div className="mb-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1890FF] hover:bg-primary-dark text-white font-semibold py-[12px] rounded-[6px] text-[16px] transition-colors leading-[1.4] border border-[#1890FF] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Registering..." : "Register now"}
          </button>
        </div>
      </form>

      {/* Login link */}
      <p className="text-[14px] text-text-muted text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
