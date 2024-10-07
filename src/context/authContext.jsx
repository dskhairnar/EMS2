import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Verify the token with the server
          const response = await axios.get(
            "https://ems-rnvg.onrender.com/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setUser(response.data.user); // Set the logged-in user
          } else {
            setUser(null); // Token invalid, clear user
          }
        }
      } catch (error) {
        setUser(null); // Error handling
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    verifyUser();
  }, []); // Run on component mount

  const login = (newUser, token) => {
    setUser(newUser);
    localStorage.setItem("token", token); // Store the token in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Clear the token from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export default AuthProvider;
