import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <section className="relative w-full min-h-screen bg-body-bg flex items-center justify-center py-12 px-4 overflow-hidden font-sans">
      {/* Decorative SVGs from design */}
      <div className="absolute top-0 left-0 -z-10 w-[300px] md:w-[450px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape1.svg" alt="" className="w-full h-auto block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/dark_shape.svg" alt="" className="hidden w-full h-auto" />
      </div>
      <div className="absolute top-0 right-[20px] -z-10 w-[300px] md:w-[450px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape2.svg" alt="" className="w-full h-auto block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/dark_shape1.svg" alt="" className="hidden w-full h-auto" />
      </div>
      <div className="absolute bottom-0 right-[327px] -z-10 w-[300px] md:w-[450px] hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape3.svg" alt="" className="w-full h-auto block" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/dark_shape2.svg" alt="" className="hidden w-full h-auto" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column (Illustration) */}
          <div className="hidden lg:flex w-full lg:w-7/12 justify-center">
            <div className="max-w-[633px] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/login.png" alt="Image" className="w-full h-auto object-contain" />
            </div>
          </div>
          
          {/* Right Column (Form) */}
          <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
