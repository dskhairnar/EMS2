import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const {login}= useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      console.log(response.data);
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token",response.data.token)
        if(response.data.user.role==="admin"){
          navigate('/admin-dashboard')
        }else{
          navigate('/employee-dashboard')
        }
      }
    } catch (error) {
      // Set error message if login fails
      setError(error.response ? error.response.data.error : "Login failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col justify-center items-center">
      {/* Company Name Heading */}
      <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-10 tracking-tight">
        Employee Management System
      </h2>

      {/* Login Form */}
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center text-gray-600">
              <input
                type="checkbox"
                className="form-checkbox text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
