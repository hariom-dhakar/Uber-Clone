import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        navigate("/login");
      });
  }, [navigate, token]);

  return <div>Logging out...</div>;
};

export default UserLogout;
