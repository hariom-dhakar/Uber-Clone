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

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)

    if(response.status === 200){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token)
      navigate('/home')
    }

    setEmail("");
    setPassword("");
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
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              value={email}
              onChange={(e) => {
                e.preventDefault;
                setEmail(e.target.value);
              }}
              required
              className="bg-[#eeeeee] rounded px-4 py-2  w-full text-lg placeholder:text-base mb-4"
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
              className="bg-[#eeeeee] rounded px-4 py-2  w-full text-lg placeholder:text-base mb-4"
              type="password"
              placeholder="password"
            />
            <button className="bg-black font-semibold text-white rounded px-4 py-2 w-full text-lg mb-4">
              Login
            </button>
          </form>
          <p className="mb-5 text-center">
            New here? &nbsp;
            <Link to="/signup" className="text-blue-400">
              Create new account
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

export default UserLogin;
