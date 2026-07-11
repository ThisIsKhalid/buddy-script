import LoginForm from "@/components/auth/LoginForm";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function LoginPage() {
  return (
    <section className="relative min-h-screen bg-bg-page flex items-center overflow-hidden py-[100px] z-10 transition-colors duration-300">
      <ThemeToggle />

      {/* Shape One */}
      <div className="absolute top-0 left-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape1.svg" alt="" className="block dark:hidden w-full h-full" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/dark_shape.svg" alt="" className="hidden dark:block w-full h-full" />
      </div>

      {/* Shape Two */}
      <div className="absolute top-0 right-[20px] -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape2.svg" alt="" className="block dark:hidden w-full h-full" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/dark_shape1.svg" alt="" className="hidden dark:block opacity-5 w-full h-full" />
      </div>

      {/* Shape Three */}
      <div className="absolute bottom-0 right-[327px] -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape3.svg" alt="" className="block dark:hidden w-full h-full" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/dark_shape2.svg" alt="" className="hidden dark:block opacity-5 w-full h-full" />
      </div>

      <div className="w-full max-w-[1140px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left illustration */}
          <div className="w-full lg:w-2/3">
            <div className="flex justify-center lg:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/login.png"
                alt="Login illustration"
                className="max-w-[633px] w-full"
              />
            </div>
          </div>
          {/* Right login card */}
          <div className="w-full lg:w-1/3">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
