import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const FinishRide = (props) => {
  const navigate = useNavigate();
  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      navigate("/captains-home");
    }
  }
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Finish This Ride</h3>
      <h5
        onClick={() => {
          props.setFinishRide(false);
        }}
        className="absolute top-5 right-6 text-2xl"
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <div className="p-2 flex items-center justify-between shadow-xl border-2 border-amber-300 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://preview.redd.it/aishwarya-rai-through-the-years-in-kollywood-v0-2fjgcwl14bfd1.jpg?width=540&format=pjpg&auto=webp&s=9cde9bfad5a97c7f361280eb7ade4804593c5b68"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user?.fullname?.firstname +
              " " +
              props.ride?.user?.fullname?.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2km</h5>
      </div>
      <div className="flex justify-between flex-col items-center">
        <div className="w-full mt-5 p-2">
          <div className="flex border-b-1  border-b-gray-400 items-center gap-5">
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

        <div className="flex justify-center items-center w-full fixed bottom-0 p-3">
          <button
            onClick={endRide}
            className="w-1/2 flex justify-center items-center p-3 bg-green-600 text-white mb-4 font-semibold rounded-4xl"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
