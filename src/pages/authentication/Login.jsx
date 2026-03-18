import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UsersLogin } from "../../apiCalls/user";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const { login, accessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    let valid = false;
    const newErrors = { username: "", password: "" };
    handleOpen();

    const loginResponse = await UsersLogin(
      details.username.toLowerCase(),
      details.password
    );
    console.log(loginResponse);
    if (loginResponse.status === 200) {
      valid = true;
    }

    setErrors(newErrors);
    const data = loginResponse.data;

    if (valid) {
      //       const usersResponse = await UsersLogin(
      //   details.username.toLowerCase(),
      //   details.password
      // );
      login(data);
      // Proceed with actual login logic here
      navigate("/dashboard");
    }
    handleClose();
  };

  const isFormValid = details.username && details.password;

  return (
    <div className="w-full h-full place-items-center pt-4 bg-white font-GeneralSans">
      <Navbar />
      <div className="relative m-4 w-full max-w-full px-4 sm:w-[500px] sm:max-w-[500px] text-text_grey">
        <div>
          <p className="text-[36px] font-GeneralSans-Semibold text-[#282828]">
            Welcome back!
          </p>
          <div className="mt-2">
            <p className="text-[18px]">
              Sign in to access resources and connect with your Psychology
              community
            </p>
          </div>
          <div className="mt-8">
            <div className="space-y-2 mb-3">
              <Label htmlFor="email" className="font-GeneralSans-Medium">
                Matric Number / Email Address
              </Label>
              <Input
                type="text"
                id="email"
                value={details.username}
                onChange={(e) =>
                  setDetails({ ...details, username: e.target.value })
                }
                placeholder="Matric Number / Email Address"
                className={`${errors.username ? "border border-red-500" : ""}`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs">{errors.username}</p>
              )}
            </div>
            <div className="space-y-2 mb-3">
              <Label htmlFor="password" className="font-GeneralSans-Medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={details.password}
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  id="password"
                  placeholder="Password"
                  className={`${errors.password ? "border border-red-500" : ""
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
              <div className="flex justify-end">
                <div
                  onClick={() => navigate("/forgotPassword")}
                  className="text-main_grey inline-block font-GeneralSans hover:border-b hover:border-main_grey text-xs cursor-pointer"
                >
                  Forgot password
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <Button
              variant="ghost"
              size="default"
              onClick={handleLogin}
              className="bg-main text-[18px] rounded-lg text-white w-full"
              disabled={!isFormValid}
            >
              Login
            </Button>
            <div className="mt-10 w-full flex justify-center">
              <div className="text-xs">
                <span>Don&apos;t have an account? </span>
                <div
                  onClick={() => navigate("/signup")}
                  className="text-main inline-block font-GeneralSans-Medium hover:border-b hover:border-main cursor-pointer"
                >
                  Signup
                </div>
              </div>
            </div>
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

export default Login;
