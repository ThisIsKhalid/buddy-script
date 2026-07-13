import RegisterForm from "@/components/auth/RegisterForm";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function RegisterPage() {
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

      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left illustration */}
          <div className="w-full lg:w-[58%] hidden lg:block">
            <div className="flex justify-center lg:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/registration.png"
                alt="Registration illustration"
                className="max-w-[720px] w-full block dark:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/registration1.png"
                alt="Registration illustration dark"
                className="max-w-[720px] w-full hidden dark:block"
              />
            </div>
          </div>
          {/* Right register card */}
          <div className="w-full lg:w-[42%] max-w-[480px] mx-auto">
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
