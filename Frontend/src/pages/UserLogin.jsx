import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
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
          <h2 className="text-xl font-bold mt-2">User Login</h2>
        </div>
        <form
          className="space-y-4"
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <input
            value={email}
            onChange={(e) => {
              e.preventDefault;
              setEmail(e.target.value);
            }}
            required
            className="bg-gray-200 w-full rounded-lg px-4 py-2 border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="email"
            placeholder="email@example.com"
          />
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-gray-200 w-full rounded-lg px-4 py-2 border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="password"
            placeholder="Password"
          />
          <button className="bg-blue-500 hover:bg-blue-700 transition text-white font-semibold rounded-lg px-4 py-2 w-full text-lg">
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          New User?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Register Here
          </Link>
        </p>
        <Link
          to="/captains-login"
          className="mt-5 flex justify-center items-center bg-[#ffca61] font-semibold text-white rounded px-4 py-2 w-full text-lg  mb-4"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
