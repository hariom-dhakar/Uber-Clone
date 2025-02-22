import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captains-home");
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };
  return (
    <div className="flex flex-col justify-between min-h-screen px-6 py-8 bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <img
          className="w-10 mb-3 mx-auto"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />

        <form
          className="space-y-6"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">Captain's name</h3>
          <div className="flex gap-4">
            <input
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">Captain's Email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-gray-200 w-full rounded-lg px-4 py-2 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-gray-200 w-full rounded-lg px-4 py-2 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="password"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4">
            <input
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
            />
            <input
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <input
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
            />
            <select
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
            >
              <option value="" disabled>
                Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button className="w-full py-3 text-white bg-black font-semibold rounded-lg hover:bg-gray-800 transition">
            Create Captain Account
          </button>
        </form>
        <p className="text-center mt-4">
          Already have a account?{" "}
          <Link to="/captains-login" className="text-blue-600 active:underline">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <div className="text-center text-xs text-gray-500">
          <p className="mt-6 leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
