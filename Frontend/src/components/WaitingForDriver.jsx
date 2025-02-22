import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitingDriver(false);
        }}
        className="absolute top-2 left-[50%] text-2xl"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <div className="mt-3 flex items-center justify-between">
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium ">{props.ride?.captain?.fullname.firstname+" "+props.ride?.captain?.fullname.lastname}</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain?.vehicle.plate}</h4>
          <p className="text-sm text-gray-600">Alto 800</p>
          <h1 className='text-lg font-semibold'>OTP: {props.ride?.otp} </h1>
        </div>
      </div>
      <div className="flex justify-between flex-col items-center">
        <div className="w-full mt-5 p-2">
          <div className="flex border-b-1 border-t-1 border-t-gray-700 border-b-gray-400 items-center gap-5">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-bold">562/11-A</h3>
              <p className="text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="w-full p-2 ">
          <div className="flex border-b-1 border-b-gray-400 items-center gap-5">
            <i className="text-lg ri-map-pin-range-fill"></i>
            <div>
              <h3 className="text-lg font-bold">125-C</h3>
              <p className="text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>
        </div>
        <div className="w-full p-2">
          <div className="flex  items-center gap-5">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-bold">₹{props.ride?.fare}</h3>
              <p className="text-gray-600">cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
