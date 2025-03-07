import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
const Riding = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();
  const ride = location.state?.ride;

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full top-2 right-2"
      >
        <i className="text-2xl font-medium ri-home-5-line"></i>
      </Link>
      <div className="h-1/2 w-screen">
      <LiveTracking />
      </div>
      <div className="h-1/2 p-4">
        <div className="mt-3 flex items-center justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize ">
              {ride?.captain?.fullname.firstname +
                " " +
                ride?.captain?.fullname.lastname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain?.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">Alto 800</p>
          </div>
        </div>
        <div className="flex justify-between flex-col items-center">
          <div className="w-full p-2 ">
            <div className="flex border-b-1 border-b-gray-400 items-center gap-5">
              <i className="text-lg ri-map-pin-range-fill"></i>
              <div>
                <h3 className="text-lg font-bold">125-C</h3>
                <p className="text-gray-600">{ride?.destination}</p>
              </div>
            </div>
          </div>
          <div className="w-full p-2">
            <div className="flex  items-center gap-5">
              <i className="text-lg ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-bold">₹{ride?.fare}</h3>
                <p className="text-gray-600">cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full p-1 bg-green-600 text-white font-semibold rounded-4xl">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
