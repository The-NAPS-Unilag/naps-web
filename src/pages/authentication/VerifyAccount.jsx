import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { UsersConfirmEmail, UsersResendOTP } from "../../apiCalls/user";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const VerifyAccount = () => {
  const [details, setDetails] = useState({
    otp: ""
  });
  const [errors, setErrors] = useState({
    otp: ""
  });
  const [userEmail, setUserEmail] = useState("");
  const [from, setFrom] = useState("");
  const [trialsLeft, setTrialsLeft] = useState(3);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    const fromParam = params.get("fm");
    if (emailParam) {
      setUserEmail(emailParam);
      setFrom(fromParam);
    }
  }, [location.search]);

  const handleSend = async () => {
    let valid = false;
    const newErrors = { otp: "" };
    handleOpen();

    const verifyResponse = await UsersConfirmEmail(
      userEmail.toLowerCase(),
      details.otp
    );
    handleClose();
    console.log(verifyResponse);
    if (verifyResponse?.status === 200) {
      valid = true;
    }

    setErrors(newErrors);

    // if (!details.otp) {
    //   newErrors.otp = "This is a wrong code";
    //   valid = false;
    //   setTrialsLeft((prev) => Math.max(prev - 1, 0));
    // }

    setErrors(newErrors);

    if (valid) {
      if (from === "fp") {
        navigate(`/resetPassword?email=${userEmail}`);
      } else if (from === "su") {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  };

  const resendOTP = async () => {
    handleOpen();
    // let valid = false;

    const resendResponse = await UsersResendOTP(userEmail.toLowerCase());
    handleClose();
    console.log(resendResponse);
    if (resendResponse.status === 200) {
      setTrialsLeft((prev) => Math.max(prev - 1, 0));

      MySwal.fire({
        title: "SUCCESS",
        icon: "success",
        text: resendResponse.data.message
      });
    }
  };
  const isFormValid = details.otp;

  return (
    <div className="w-full h-full place-items-center bg-white font-GeneralSans">
      <Navbar />
      <div className="relative m-4 w-full max-w-full px-4 sm:w-[500px] sm:max-w-[500px] text-text_grey">
        <div>
          <p className="text-[36px] font-GeneralSans-Semibold text-[#282828]">
            Verify your Account
          </p>
          <div className="mt-8">
            <div className="space-y-2 mb-3">
              <Label htmlFor="email" className="font-GeneralSans-Medium">
                Enter the 6 Digit OTP sent to {userEmail}
              </Label>
              <Input
                type="number"
                id="otp"
                value={details.otp}
                onChange={(e) =>
                  setDetails({ ...details, otp: e.target.value })
                }
                placeholder="Enter OTP"
                className={`${errors.otp ? "border border-red-500" : ""}`}
              />
              {errors.otp && (
                <p className="text-red-500 text-xs">{errors.otp}</p>
              )}
              <div className="w-full flex items-center justify-between">
                {trialsLeft > 0 ? (
                  <div
                    onClick={() => resendOTP()}
                    className="text-main inline-block font-GeneralSans hover:border-b hover:border-main cursor-pointer"
                  >
                    Resend
                  </div>
                ) : (
                  <div></div>
                )}
                <div
                  className={`font-GeneralSans-Medium text-xs text-end ${
                    trialsLeft < 2 ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  <p>
                    {trialsLeft} Trial{trialsLeft !== 1 ? "s" : ""} Left
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <Button
              variant="ghost"
              size="default"
              onClick={handleSend}
              className="bg-main text-[18px] rounded-lg text-white w-full"
              disabled={!isFormValid}
            >
              Verify
            </Button>
          </div>
        </div>
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default VerifyAccount;
