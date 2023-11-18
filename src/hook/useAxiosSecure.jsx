import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthProvider from "../Provider/AuthProvider";
import useAuth from "./useAuth";
import { getAuth, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";


const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
})

const useAxiosSecure = () => {
  const auth = getAuth(app)
 
  // const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(res => {
      return res;
    }, error => {
      if(error.response.status === 401 || error.response.status === 403){
        
        console.log('log out the user')
        signOut(auth)
        .then(() => {
          // navigate('/login')
        })
        .catch(error => console.log(error))
      }
    })
  },[auth])
  
  return axiosSecure;
};

export default useAxiosSecure;