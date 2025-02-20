import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CaptainLogout = () => {
 const navigate = useNavigate();
   const token = localStorage.getItem("token");

   React.useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("token");
          navigate("/captains-login");
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        navigate("/captains-login");
      });
  }, [navigate, token]);

  return <div>Logging out...</div>;
};

export default CaptainLogout