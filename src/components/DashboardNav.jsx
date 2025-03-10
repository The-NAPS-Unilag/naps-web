// import React from 'react'
import { LogOut } from "lucide-react";
import NAPS_LOGO from "../assets/images/NAPS_LOGO.png";
// import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardNav = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex justify-between h-fit w-[95%] m-3 font-GeneralSans-Medium">
      <div className="flex space-x-1 items-center text-main_grey">
        <img src={NAPS_LOGO} />
        <div className="flex flex-col -space-y-1">
          <span className="text-[12px]">Department of</span>
          <span className="text-[16px]">Psychology</span>
        </div>
      </div>
      <div>
        <div
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center space-x-2 hover:border px-4 py-[6px] text-main_grey rounded-lg"
        >
          <LogOut /> <span>Sign out</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
