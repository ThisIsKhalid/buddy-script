import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
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
                src="/assets/images/registration.png"
                alt="Registration illustration"
                className="max-w-full block"
              />
            </div>
          </div>
          {/* Right registration card */}
          <div className="w-full lg:w-1/3">
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
