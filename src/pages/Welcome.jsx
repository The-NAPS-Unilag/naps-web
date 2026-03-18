// import { useState } from "react";
import { Button } from "../components/ui/button";
// import { Card, CardContent, CardTitle } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

function Welcome() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);
  return (
    <>
      <div className="w-full h-screen bg-white flex flex-col items-center justify-center font-GeneralSans">
        {/* <div> */}
        <div className="text-main_grey text-[56px] font-GeneralSans-Semibold">
          <span>Welcome to the </span>
          <span className="text-main">Psychology Hub!</span>
        </div>
        <div className="text-main_grey text-[32px] font-GeneralSans-Medium">
          <span>Dive into </span>
          <span className="text-main">Learning, Collaboration </span>
          <span>and </span>
          <span className="text-main">Opportunities</span>
        </div>
        <div className="mt-14 space-y-6 flex flex-col">
          <Button
            variant="ghost"
            size="default"
            onClick={() => navigate("/signup")}
            className="bg-main text-[18px] rounded-lg text-white w-[350px]"
          >
            Sign up
          </Button>
          <Button
            variant="secondary"
            size="default"
            onClick={() => navigate("/login")}
            className="bg-white text-[18px] rounded-lg text-main border border-main w-[350px]"
          >
            Sign in
          </Button>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default Welcome;
