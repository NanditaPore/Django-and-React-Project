import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN , REFRESH_TOKEN } from "../constants";
import {toast,Toaster} from "react-hot-toast";
// import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

export const Form = ({route,method}) => {
    const [username , setUsername]=useState("")
    const [password ,  setPassword]=useState("")
    const [loading , setLoading]=useState(false)

    const navigate =useNavigate()
    const name = method === "login" ? "Login" :"Register"
     const text =()=>{
        if(method === "login"){
            return(
                <span> Don't have an account? {" "}
                <button className="text-rose-800" onClick={()=>navigate('/register')}>
                    Register now
                </button>
                </span>
                
            )
        }else{
            return(
                <span> Already have an account? {" "}
                <button className=" text-rose-800" onClick={()=>navigate('/login')}>
                    Login now
                </button>
                </span>
            )
            }
           
     };

    const handleSubmit= async (e)=>{
        setLoading(true);
        e.preventDefault();
        
        try {
        const res = await api.post(route,{username,password})
        if (method === 'login'){
            localStorage.setItem(ACCESS_TOKEN,res.data.access);
            localStorage.setItem(REFRESH_TOKEN,res.data.resfresh);
            navigate("/")
        } else if (res.status === 401) {
          // Handle Unauthorized: Invalid credentials or not registered
          toast.error("You are not registered or Invalid Username/Password");
        } else if (res.status === 400) {
          // Handle Bad Request: Often caused by missing fields or invalid inputs
          toast.error("Bad Request. Please check your input fields.");
        }
        else{
            toast.success('Successfully Registered you are moving to Login Page');
            navigate("/login")
        }
            
        } catch (error) {
    
            alert(error)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
    >
      <h1 className="text-2xl font-bold text-center mb-6">{name}</h1>

      {/* Username Input */}
      <input
        className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-700"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      {/* Password Input */}
      <input
        className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-700"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center mb-4">
          <LoadingIndicator />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        {name}
      </button>
      <div className="p-2 text-center">
         
     {text()}
      </div>
    </form>
  </div>
  )
}

