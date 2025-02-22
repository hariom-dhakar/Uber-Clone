import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captain
    );

    if (response.status === 200) {
      const data = response.data;

      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captains-home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            className="w-16"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt="Captain Icon"
          />
          <h2 className="text-xl font-bold mt-2">Captain Login</h2>
        </div>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div>
          <label className="block text-gray-700 font-medium mb-1">
              What's your email?
            </label>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-gray-200 w-full rounded-lg px-4 py-2 border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="email"
            placeholder="email@example.com"
          />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Enter Password
            </label>
            <input
              className="bg-gray-200 w-full rounded-lg px-4 py-2 border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="Password"
            />
          </div>
          <button className="bg-black hover:bg-gray-800 transition text-white font-semibold rounded-lg px-4 py-2 w-full text-lg">
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Join a fleet?{" "}
          <Link to="/captains-signup" className="text-blue-600 font-semibold">
            Register as a Captain
          </Link>
        </p>
        <Link
          to="/login"
          className="mt-6 flex justify-center items-center bg-orange-500 hover:bg-orange-600 transition text-white font-semibold rounded-lg px-4 py-2 w-full text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
