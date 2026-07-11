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
    <div className="bg-white rounded-[6px] p-8 shadow-[7.5px_20px_7.5px_20px_rgba(108,126,147,0.15)]">
      {/* Logo */}
      <div className="mb-7">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/logo.svg" alt="Buddy Script" className="h-10 w-auto" />
      </div>

      <p className="text-[#1890FF] text-sm font-medium mb-2">Get Started Now</p>
      <h4 className="text-[#112032] text-[1.4rem] font-semibold mb-12 leading-tight">
        Registration
      </h4>

      {/* Google register button (decorative) */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-[#DFDFDF] rounded-[6px] py-3 px-4 mb-10 text-sm text-[#112032] font-medium hover:bg-[#f5f5f5] transition-colors"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/google.svg" alt="Google" className="w-5 h-5 flex-shrink-0" />
        <span>Register with google</span>
      </button>

      {/* Or divider */}
      <div className="relative flex items-center mb-10">
        <div className="flex-grow border-t border-[#DFDFDF]" />
        <span className="mx-4 text-sm text-[#666666]">Or</span>
        <div className="flex-grow border-t border-[#DFDFDF]" />
      </div>

      {/* Error alert */}
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 text-xs rounded-[6px] p-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div className="mb-[14px]">
          <label className="block text-[#112032] text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            className={`w-full border rounded-[6px] px-4 py-3 text-sm text-[#112032] placeholder-[#C4C4C4] bg-white focus:border-[#1890FF] focus:ring-0 focus:outline-none transition-colors ${
              errors.firstName ? "border-red-400" : "border-[#DFDFDF]"
            }`}
            placeholder="Enter first name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-[14px]">
          <label className="block text-[#112032] text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            className={`w-full border rounded-[6px] px-4 py-3 text-sm text-[#112032] placeholder-[#C4C4C4] bg-white focus:border-[#1890FF] focus:ring-0 focus:outline-none transition-colors ${
              errors.lastName ? "border-red-400" : "border-[#DFDFDF]"
            }`}
            placeholder="Enter last name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-[14px]">
          <label className="block text-[#112032] text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className={`w-full border rounded-[6px] px-4 py-3 text-sm text-[#112032] placeholder-[#C4C4C4] bg-white focus:border-[#1890FF] focus:ring-0 focus:outline-none transition-colors ${
              errors.email ? "border-red-400" : "border-[#DFDFDF]"
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
          <label className="block text-[#112032] text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className={`w-full border rounded-[6px] px-4 py-3 text-sm text-[#112032] placeholder-[#C4C4C4] bg-white focus:border-[#1890FF] focus:ring-0 focus:outline-none transition-colors ${
              errors.password ? "border-red-400" : "border-[#DFDFDF]"
            }`}
            placeholder="Enter password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-[14px]">
          <label className="block text-[#112032] text-sm font-medium mb-2">Repeat Password</label>
          <input
            type="password"
            className={`w-full border rounded-[6px] px-4 py-3 text-sm text-[#112032] placeholder-[#C4C4C4] bg-white focus:border-[#1890FF] focus:ring-0 focus:outline-none transition-colors ${
              errors.confirmPassword ? "border-red-400" : "border-[#DFDFDF]"
            }`}
            placeholder="Repeat password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms checkbox */}
        <div className="flex items-center gap-2 mb-10 mt-4">
          <input
            type="checkbox"
            id="termsCheckbox"
            defaultChecked
            className="w-4 h-4 accent-[#1890FF]"
          />
          <label htmlFor="termsCheckbox" className="text-sm text-[#666666] cursor-pointer">
            I agree to terms &amp; conditions
          </label>
        </div>

        {/* Submit */}
        <div className="mb-15">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1890FF] hover:bg-[#0e7fe6] text-white font-semibold py-3 rounded-[6px] text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register now"}
          </button>
        </div>
      </form>

      {/* Login link */}
      <p className="text-sm text-[#666666] text-center mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-[#1890FF] font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
