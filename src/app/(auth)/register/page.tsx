import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
      {/* Decorative SVGs from design */}
      <div className="_shape_one">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape1.svg" alt="" className="_shape_img" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape2.svg" alt="" className="_shape_img" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_shape_three">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/shape3.svg" alt="" className="_shape_img" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>

      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/images/registration.png" alt="Image" />
                </div>
                <div className="_social_registration_right_image_dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/images/registration1.png" alt="Image" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
