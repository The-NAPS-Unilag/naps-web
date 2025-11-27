/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  //   const { user } = useAuth();
  // console
  //   if (!user) {
  //     return <Navigate to="/login" />;
  //   }
  const { login } = useAuth();
  useEffect(() => {
    console.log("Checking user authentication...");
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log(user);
      if (user && storedAccessToken) {
        login({ user, access_token: storedAccessToken });
        // User is logged in, you can set the user state or context here if needed
      } else {
        // User is not logged in, redirect to login
        handleRedirectToLogin();
      }
    } else {
      // No user found, redirect to login
      handleRedirectToLogin();
    }
  }, []);

  const handleRedirectToLogin = () => {
    console.log("Redirecting to login...");
    return <Navigate to="/login" />;
  };

  return <div className="font-GeneralSans">{children}</div>;
};

export default ProtectedRoute;
