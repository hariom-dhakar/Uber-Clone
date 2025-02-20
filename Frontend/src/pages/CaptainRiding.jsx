import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRide, setFinishRide] = useState(false);
  const finishRideRef = useRef(null);

  useGSAP(
    function () {
      if (finishRide) {
        gsap.to(finishRideRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(finishRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRide]
  );
  return (
    <div className="h-screen">
      <div className="fixed w-screen t-3 flex items-center justify-between p-4">
        <img
          className="w-16 "
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt=""
        />
        <Link
          to="/captains-login"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-2xl font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5 w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div
      onClick={()=>{
        setFinishRide(true)
      }} className="h-1/5 p-6 flex relative justify-between items-center bg-gray-300">
        <h5  className="absolute top-1 right-[50%] text-2xl">
          <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM Away</h4>
        <button className=" p-3 bg-green-600 text-white px-8 font-semibold rounded-4xl">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRideRef}
        className="fixed bg-white translate-y-full h-[70%] w-full py-6 px-3 z-10 bottom-0"
      >
        <FinishRide setFinishRide={setFinishRide} />
      </div>
    </div>
  );
};

export default CaptainRiding;
