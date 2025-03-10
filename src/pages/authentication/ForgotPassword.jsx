import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [details, setDetails] = useState({
    username: ""
  });
  const [errors, setErrors] = useState({
    username: ""
  });

  const navigate = useNavigate();

  const handleSend = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!details.username) {
      newErrors.username = "This email address does not exist.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Proceed with actual login logic here
      navigate(`/verifyAccount?fm=fp&email=${details.username}`);
    }
  };

  return (
    <div className="w-full h-full place-items-center bg-white font-GeneralSans">
      <Navbar />
      <div className="relative m-4 w-full max-w-full px-4 sm:w-[500px] sm:max-w-[500px] text-text_grey">
        <div>
          <p className="text-[36px] font-GeneralSans-Semibold text-[#282828]">
            Forgot Password
          </p>
          <div className="mt-2">
            <p className="text-[18px]">
              Don&apos;t worry! We&apos;ll help you reset it and get back to
              learning in no time.
            </p>
          </div>
          <div className="mt-8">
            <div className="space-y-2 mb-3">
              <Label htmlFor="email" className="font-GeneralSans-Medium">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                value={details.username}
                onChange={(e) =>
                  setDetails({ ...details, username: e.target.value })
                }
                placeholder="Email Address"
                className={`${errors.username ? "border border-red-500" : ""}`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs">{errors.username}</p>
              )}
            </div>
          </div>
          <div className="mt-16">
            <Button
              variant="ghost"
              size="default"
              onClick={handleSend}
              className="bg-main text-[18px] rounded-lg text-white w-full"
            >
              Send OTP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
