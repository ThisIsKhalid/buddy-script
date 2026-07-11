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
    <div className="bg-white p-8 md:p-12 rounded-[6px] shadow-sm w-full font-sans border border-[#E8E8E8]">
      <div className="mb-7 flex justify-center lg:justify-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/logo.svg" alt="Image" className="max-w-[161px] h-auto" />
      </div>
      <p className="text-[#2D3748] text-sm md:text-base leading-normal text-center lg:text-left mb-2">
        Get Started Now
      </p>
      <h4 className="text-xl md:text-2xl font-semibold text-[#1A202C] text-center lg:text-left mb-8">
        Registration
      </h4>
      
      <button
        type="button"
        className="w-full py-3 px-6 border border-[#F0F2F5] bg-white rounded-[6px] flex items-center justify-center gap-2 hover:bg-gray-50 hover:shadow-md transition-all mb-8"
        onClick={() => alert("Google Login is simulated.")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/google.svg" alt="Image" className="max-w-[20px]" />{" "}
        <span className="font-medium text-base text-[#312000]">Register with google</span>
      </button>

      {/* Or Divider */}
      <div className="flex items-center my-8">
        <div className="flex-grow border-t border-[#DFDFDF] h-[1px]"></div>
        <span className="mx-4 text-sm text-[#C4C4C4]">Or</span>
        <div className="flex-grow border-t border-[#DFDFDF] h-[1px]"></div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-4 text-xs">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block font-medium text-sm text-[#4A5568] mb-2 text-left">
            First Name
          </label>
          <input
            type="text"
            className={`w-full h-12 bg-white border ${
              errors.firstName ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-[#F5F5F5] focus:ring-primary focus:border-primary"
            } rounded-[6px] px-4 text-sm text-[#2D3748] placeholder-[#C4C4C4] focus:outline-none focus:ring-1 focus:border-primary transition-all`}
            {...register("firstName")}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <div className="text-red-500 mt-1 text-xs text-left">
              {errors.firstName.message}
            </div>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm text-[#4A5568] mb-2 text-left">
            Last Name
          </label>
          <input
            type="text"
            className={`w-full h-12 bg-white border ${
              errors.lastName ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-[#F5F5F5] focus:ring-primary focus:border-primary"
            } rounded-[6px] px-4 text-sm text-[#2D3748] placeholder-[#C4C4C4] focus:outline-none focus:ring-1 focus:border-primary transition-all`}
            {...register("lastName")}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <div className="text-red-500 mt-1 text-xs text-left">
              {errors.lastName.message}
            </div>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm text-[#4A5568] mb-2 text-left">
            Email
          </label>
          <input
            type="email"
            className={`w-full h-12 bg-white border ${
              errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-[#F5F5F5] focus:ring-primary focus:border-primary"
            } rounded-[6px] px-4 text-sm text-[#2D3748] placeholder-[#C4C4C4] focus:outline-none focus:ring-1 focus:border-primary transition-all`}
            {...register("email")}
            placeholder="Enter email address"
          />
          {errors.email && (
            <div className="text-red-500 mt-1 text-xs text-left">
              {errors.email.message}
            </div>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm text-[#4A5568] mb-2 text-left">
            Password
          </label>
          <input
            type="password"
            className={`w-full h-12 bg-white border ${
              errors.password ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-[#F5F5F5] focus:ring-primary focus:border-primary"
            } rounded-[6px] px-4 text-sm text-[#2D3748] placeholder-[#C4C4C4] focus:outline-none focus:ring-1 focus:border-primary transition-all`}
            {...register("password")}
            placeholder="Enter password"
          />
          {errors.password && (
            <div className="text-red-500 mt-1 text-xs text-left">
              {errors.password.message}
            </div>
          )}
        </div>

        <div>
          <label className="block font-medium text-sm text-[#4A5568] mb-2 text-left">
            Repeat Password
          </label>
          <input
            type="password"
            className={`w-full h-12 bg-white border ${
              errors.confirmPassword ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-[#F5F5F5] focus:ring-primary focus:border-primary"
            } rounded-[6px] px-4 text-sm text-[#2D3748] placeholder-[#C4C4C4] focus:outline-none focus:ring-1 focus:border-primary transition-all`}
            {...register("confirmPassword")}
            placeholder="Repeat password"
          />
          {errors.confirmPassword && (
            <div className="text-red-500 mt-1 text-xs text-left">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        {/* Terms checkbox */}
        <div className="pt-2 text-left">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary"
              type="checkbox"
              id="termsCheckbox"
              defaultChecked
            />
            <span className="text-sm text-[#4A5568]">I agree to terms & conditions</span>
          </label>
        </div>

        {/* Submit */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-[6px] font-medium text-base hover:bg-primary-hover hover:shadow-lg focus:outline-none transition-all disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register now"}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-[#666666]">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
