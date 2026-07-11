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
    setLoading(false);
    try {
      setLoading(true);
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
    <div className="_social_login_content">
      <div className="_social_login_left_logo _mar_b28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/logo.svg" alt="Image" className="_left_logo" />
      </div>
      <p className="_social_login_content_para _mar_b8">Welcome back</p>
      <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>
      
      <button type="button" className="_social_login_content_btn _mar_b40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/google.svg" alt="Image" className="_google_img" />{" "}
        <span>Or sign-in with google</span>
      </button>

      <div className="_social_login_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>

      {error && (
        <div className="alert alert-danger p-2 mb-3" style={{ fontSize: "13px" }}>
          {error}
        </div>
      )}

      <form className="_social_login_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label className="_social_login_label _mar_b8">Email</label>
              <input
                type="email"
                className={`form-control _social_login_input ${errors.email ? "is-invalid" : ""}`}
                {...register("email")}
                placeholder="Enter email address"
              />
              {errors.email && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.email.message}
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label className="_social_login_label _mar_b8">Password</label>
              <input
                type="password"
                className={`form-control _social_login_input ${errors.password ? "is-invalid" : ""}`}
                {...register("password")}
                placeholder="Enter password"
              />
              {errors.password && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="form-check _social_login_form_check">
              <input
                className="form-check-input _social_login_form_check_input"
                type="checkbox"
                id="rememberMe"
                defaultChecked
              />
              <label className="form-check-label _social_login_form_check_label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="_social_login_form_left">
              <p className="_social_login_form_left_para" style={{ cursor: "pointer" }}>
                Forgot password?
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_login_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_login_form_btn_link _btn1"
                disabled={loading}
                style={{ width: "100%", border: "none" }}
              >
                {loading ? "Logging in..." : "Login now"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_login_bottom_txt">
            <p className="_social_login_bottom_txt_para">
              Don&apos;t have an account? <Link href="/register">Create New Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
