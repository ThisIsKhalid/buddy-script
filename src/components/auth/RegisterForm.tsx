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
    <div className="_social_registration_content">
      <div className="_social_registration_right_logo _mar_b28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/logo.svg" alt="Image" className="_right_logo" />
      </div>
      <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
      <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
      
      <button type="button" className="_social_registration_content_btn _mar_b40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/google.svg" alt="Image" className="_google_img" />{" "}
        <span>Register with google</span>
      </button>

      <div className="_social_registration_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>

      {error && (
        <div className="alert alert-danger p-2 mb-3" style={{ fontSize: "13px" }}>
          {error}
        </div>
      )}

      <form className="_social_registration_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">First Name</label>
              <input
                type="text"
                className={`form-control _social_registration_input ${errors.firstName ? "is-invalid" : ""}`}
                {...register("firstName")}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.firstName.message}
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">Last Name</label>
              <input
                type="text"
                className={`form-control _social_registration_input ${errors.lastName ? "is-invalid" : ""}`}
                {...register("lastName")}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.lastName.message}
                </div>
              )}
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">Email</label>
              <input
                type="email"
                className={`form-control _social_registration_input ${errors.email ? "is-invalid" : ""}`}
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
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">Password</label>
              <input
                type="password"
                className={`form-control _social_registration_input ${errors.password ? "is-invalid" : ""}`}
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
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">Repeat Password</label>
              <input
                type="password"
                className={`form-control _social_registration_input ${errors.confirmPassword ? "is-invalid" : ""}`}
                {...register("confirmPassword")}
                placeholder="Repeat password"
              />
              {errors.confirmPassword && (
                <div className="text-danger mt-1" style={{ fontSize: "12px" }}>
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
            <div className="form-check _social_registration_form_check">
              <input
                className="form-check-input _social_registration_form_check_input"
                type="checkbox"
                id="termsCheckbox"
                defaultChecked
              />
              <label className="form-check-label _social_registration_form_check_label" htmlFor="termsCheckbox">
                I agree to terms & conditions
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_registration_form_btn_link _btn1"
                disabled={loading}
                style={{ width: "100%", border: "none" }}
              >
                {loading ? "Registering..." : "Register now"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_registration_bottom_txt">
            <p className="_social_registration_bottom_txt_para">
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
