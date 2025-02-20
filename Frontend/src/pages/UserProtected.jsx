import React, { useContext,useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'
const UserProtected = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const {user, setUser} = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      if (!token) {
        navigate("/login");
      }
  }, [token])
  
  axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }).then((res)=>{
    if(res.status === 200){
      setUser(res.data.user)
      setIsLoading(false)
    }
  }).catch(err=>{
    console.log(err)
    localStorage.removeItem('token')
    navigate('/login')
  })

  if(isLoading){
    return(
        <div>Loading....</div>
    )
  }

  return <>{children}</>;
};

export default UserProtected;
