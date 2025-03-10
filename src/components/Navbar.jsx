// import React from 'react'
import NAPS_LOGO from "../assets/images/NAPS_LOGO.png";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between h-fit w-[95%] sm:w-[80%] m-3 font-GeneralSans-Medium">
      <div className="flex space-x-1 items-center text-main_grey">
        <img src={NAPS_LOGO} />
        <div className="flex flex-col -space-y-1">
          <span className="text-[12px]">Department of</span>
          <span className="text-[16px]">Psychology</span>
        </div>
      </div>
      <div>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate("/login")}
          className="text-main rounded-lg bg-white border border-main"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
