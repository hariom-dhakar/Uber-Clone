import React from "react";

const ConfirmedVehicle = (props) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>
      <h5
        onClick={() => {
          props.setConfirmRide(false);
        }}
        className="absolute top-5 right-6 text-2xl"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <div className="flex justify-between flex-col items-center">
        <img
          className="w-1/2"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
        />
        <div className="w-full mt-5 p-2">
          <div className="flex border-b-1 border-t-1 border-t-gray-700 border-b-gray-400 items-center gap-5">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-bold">562/11-A</h3>
              <p className="text-gray-600">{props.pickup}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="w-full p-2 ">
          <div className="flex border-b-1 border-b-gray-400 items-center gap-5">
            <i className="text-lg ri-map-pin-range-fill"></i>
            <div>
              <h3 className="text-lg font-bold">125-C</h3>
              <p className="text-gray-600">{props.destination}</p>
            </div>
          </div>
        </div>
        <div className="w-full p-2">
          <div className="flex  items-center gap-5">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-bold">₹{props.fare[props.vehicleType]}</h3>
              <p className="text-gray-600">cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRide(false);
            props.setVehiclePanel(false)
            props.createRide();
          }}
          className="w-full p-1 bg-green-600 text-white font-semibold rounded-4xl"
        >
          Confirm
        </button>
      </div>
    </div>
    
  );
};

export default ConfirmedVehicle;
