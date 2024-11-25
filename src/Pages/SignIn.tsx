import GoogleLogin from "../GoogleLogin";
import { Carousel } from "@material-tailwind/react";

export const SignIn = () => {
  return (
    <div className="w-full h-[100dvh] flex items-center justify-center bg-[url('./assets/BackgroundImg.png')]">
      <div className="w-[70%] bg-white h-[90%] rounded-[3%] flex p-20 gap-10 items-start justify-between">
        <div className="flex-col flex h-full w-full gap-[50px]">
          <div className="flex items-center gap-3">
            <img src="/assets/Icon.png" className="h-10 w-10" />
            <p className="text-[20px]">Mail Assistant</p>
          </div>
          <p className="font-bold text-[40px]">Get Started</p>
          <div className="flex items-start flex-col gap-5">
            <p className="w-80">
              Welcome! Please use your Google account to log in and get started.
            </p>
            <GoogleLogin />
          </div>
        </div>
        <div className="h-full w-full">
          <Carousel
            className="rounded-xl"
            transition={{ duration: 1 }}
            autoplay
            placeholder={null}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <img
              src="/assets/Carousel1.jpg"
              alt="image 1"
              className="h-full w-full object-cover"
              width={"100%"}
            />
            <img
              width={"100%"}
              src="/assets/carousel 2.jpg"
              alt="image 2"
              className="h-full w-full object-cover"
            />
            <img
              width={"100%"}
              src="/assets/20943953.jpg"
              alt="image 3"
              className="h-full w-full object-cover"
            />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
