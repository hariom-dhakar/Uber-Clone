import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            className="w-16"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt="User Icon"
          />
          <h2 className="text-xl font-bold mt-2">Create Your Account</h2>
        </div>
        <form
          className="space-y-4"
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="flex gap-4 mb-4">
            <input
              value={firstname}
              onChange={(e) => {
                e.preventDefault;
                setFirstname(e.target.value);
              }}
              required
              className="bg-gray-200 w-1/2  rounded-lg px-4 py-2 border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="First name"
            />
            <input
              value={lastname}
              onChange={(e) => {
                e.preventDefault;
                setLastname(e.target.value);
              }}
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              placeholder="Last name"
            />
          </div>
          <div className="mb-4">
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
          </div>
          <div className="mb-4">
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
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 transition text-white font-semibold rounded-lg px-4 py-2 w-full text-lg">
            Create Account
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login here
          </Link>
        </p>
        <Link
          to="/captains-login"
          className="mt-6 flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 transition text-white font-semibold rounded-lg px-4 py-2 w-full text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserSignup;
