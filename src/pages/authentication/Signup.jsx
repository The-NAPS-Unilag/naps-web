import { useState } from "react";
import Navbar from "../../components/Navbar";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import PersonalDetails from "./signupSteps/PersonalDetails";
import VerificationDetails from "./signupSteps/VerificationDetails";
import ReviewDetails from "./signupSteps/ReviewDetails";

const Signup = () => {
  // const { login } = useAuth();
  // const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    matricNo: "",
    level: "",
    duesImage: null
  });

  // const handleLogin = () => {
  //   login({ name: "User" }); // Mock login
  //   navigate("/dashboard");
  // };

  return (
    <div className="w-full h-full place-items-center bg-white font-GeneralSans">
      <Navbar />
      <div className="relative m-4 w-full max-w-full px-4 sm:w-[500px] sm:max-w-[500px] text-text_grey">
        {step === 1 ? (
          <PersonalDetails
            details={details}
            setDetails={setDetails}
            setStep={setStep}
          />
        ) : step === 2 ? (
          <VerificationDetails
            details={details}
            setDetails={setDetails}
            setStep={setStep}
          />
        ) : (
          <ReviewDetails details={details} setDetails={setDetails} />
        )}
      </div>
    </div>
  );
};

export default Signup;
