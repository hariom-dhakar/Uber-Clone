import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

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
      localStorage.setItem('token',data.token)
      navigate('/home')
    }
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };
  return (
    <>
      <div className="p-7 h-screen flex flex-col justify-between ">
        <div>
          <img
            className="w-18 mb-8"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
          />
          <form
            action=""
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2">What's your name</h3>
            <div className="flex gap-4">
              <input
                value={firstname}
                onChange={(e) => {
                  e.preventDefault;
                  setFirstname(e.target.value);
                }}
                required
                className="bg-[#eeeeee] rounded w-1/2 px-4 py-2 text-base placeholder:text-base mb-4"
                type="text"
                placeholder="First name"
              />
              <input
                value={lastname}
                onChange={(e) => {
                  e.preventDefault;
                  setLastname(e.target.value);
                }}
                className="bg-[#eeeeee] rounded w-1/2 px-4 py-2 text-base placeholder:text-base mb-4"
                type="text"
                placeholder="Last name"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              value={email}
              onChange={(e) => {
                e.preventDefault;
                setEmail(e.target.value);
              }}
              required
              className="bg-[#eeeeee] rounded px-4 py-2  w-full text-base placeholder:text-base mb-4"
              type="email"
              placeholder="email@example.com"
            />
            <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
            <input
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-[#eeeeee] rounded px-4 py-2  w-full text-base placeholder:text-base mb-4"
              type="password"
              placeholder="Password"
            />
            <button className="bg-black font-semibold text-white rounded px-4 py-2 w-full text-lg mb-4">
              Create Account
            </button>
          </form>
          <p className="mb-5 text-center">
            Already have an account? &nbsp;
            <Link to="/login" className="text-blue-400">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/captains-login"
            className="flex justify-center items-center bg-[#ffca61] font-semibold text-white rounded px-4 py-2 w-full text-lg  mb-4"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserSignup;
