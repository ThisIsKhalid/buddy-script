import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <section className="relative min-h-screen bg-[#F0F2F5] flex items-center overflow-hidden py-24">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 z-[-1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape1.svg" alt="" className="block" />
      </div>
      <div className="absolute bottom-0 right-0 z-[-1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape2.svg" alt="" className="block" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape3.svg" alt="" className="block" />
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
                className="max-w-full"
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
