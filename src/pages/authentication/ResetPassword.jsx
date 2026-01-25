import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { UsersResetPassword } from "../../apiCalls/user";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ResetPassword = () => {
  const [details, setDetails] = useState({
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: ""
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setUserEmail(emailParam);
    }
  }, [location.search]);

  const handleReset = async () => {
    let valid = true;
    if (details.password !== details.confirmPassword) {
      setErrors({ password: "passwords do not match" });
      return;
    }
    handleOpen();

    const resetResponse = await UsersResetPassword(
      userEmail,
      "789900",
      details.password
    );
    handleClose();
    console.log(resetResponse);
    if (resetResponse.status === 200) {
      valid = true;
      MySwal.fire({
        title: "SUCCESS",
        icon: "success",
        text: resetResponse.data.message
      });
    }

    if (valid) {
      navigate("/login");
    }
  };

  const validations = {
    length: details.password.length >= 8 && details.password.length <= 16,
    uppercase: /[A-Z]/.test(details.password),
    lowercase: /[a-z]/.test(details.password),
    number: /[0-9]/.test(details.password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(details.password)
  };
  const isFormValid = details.password && details.confirmPassword;

  return (
    <div className="w-full h-full place-items-center bg-white font-GeneralSans">
      <Navbar />
      <div className="relative m-4 w-full max-w-full px-4 sm:w-[500px] sm:max-w-[500px] text-text_grey">
        <div>
          <p className="text-[36px] font-GeneralSans-Semibold text-[#282828]">
            Reset Password
          </p>
          <div className="mt-6">
            <div className="space-y-2 mb-3">
              <Label htmlFor="password" className="font-GeneralSans-Medium">
                Enter New Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={details.password}
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  id="password"
                  placeholder="New Password"
                  className={`${
                    errors.password ? "border border-red-500" : ""
                  }`}
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-3 text-gray-600 cursor-pointer"
                >
                  {!showPassword ? <EyeClosed /> : <Eye />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>
            <div className="space-y-2 mb-3">
              <Label htmlFor="password" className="font-GeneralSans-Medium">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={details.confirmPassword}
                  onChange={(e) =>
                    setDetails({ ...details, confirmPassword: e.target.value })
                  }
                  id="password"
                  placeholder="Confirm New Password"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-3 text-gray-600"
                >
                  {!showPassword ? <EyeClosed /> : <Eye />}
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm font-GeneralSans-Medium">
                <li className="flex items-center space-x-2">
                  <div
                    className={`${
                      validations.length ? "bg-green-500" : "bg-red-500"
                    } h-2 w-2 rounded-full inline-block`}
                  ></div>
                  <span>8-16 characters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div
                    className={`${
                      validations.uppercase ? "bg-green-500" : "bg-red-500"
                    } h-2 w-2 rounded-full inline-block`}
                  ></div>
                  <span>Uppercase letters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div
                    className={`${
                      validations.lowercase ? "bg-green-500" : "bg-red-500"
                    } h-2 w-2 rounded-full inline-block`}
                  ></div>
                  <span>Lowercase letters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div
                    className={`${
                      validations.specialChar ? "bg-green-500" : "bg-red-500"
                    } h-2 w-2 rounded-full inline-block`}
                  ></div>
                  <span>Special characters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div
                    className={`${
                      validations.number ? "bg-green-500" : "bg-red-500"
                    } h-2 w-2 rounded-full inline-block`}
                  ></div>
                  <span>Numbers</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16">
            <Button
              variant="ghost"
              size="default"
              onClick={handleReset}
              className="bg-main text-[18px] rounded-lg text-white w-full"
              disabled={!isFormValid}
            >
              Reset Password
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

export default ResetPassword;
