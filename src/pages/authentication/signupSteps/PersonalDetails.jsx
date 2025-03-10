/* eslint-disable react/prop-types */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PersonalDetails = ({ details, setDetails, setStep }) => {
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();

  const validations = {
    length: details.password.length >= 8 && details.password.length <= 16,
    uppercase: /[A-Z]/.test(details.password),
    lowercase: /[a-z]/.test(details.password),
    number: /[0-9]/.test(details.password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(details.password)
  };

  // const isPasswordValid = Object.values(validations).every(Boolean);

  return (
    <div>
      <p className="text-[36px] font-GeneralSans-Semibold text-[#282828]">
        Get Started
      </p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-[20px]">Create an account</p>
        <p className="text-[13px] font-GeneralSans-Italic">
          (All fields are required)
        </p>
      </div>
      <div className="w-full text-center">
        <p className="text-[16px] my-10 font-GeneralSans-Medium">Step 1 of 2</p>
      </div>
      <div>
        <p className="font-GeneralSans-Medium mb-2">Personal Details</p>
        <div className="space-y-2 mb-3">
          <Label htmlFor="name" className="font-GeneralSans-Medium">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            placeholder="Name"
          />
        </div>
        <div className="space-y-2 mb-3">
          <Label htmlFor="email" className="font-GeneralSans-Medium">
            Email Address
          </Label>
          <Input
            type="email"
            id="email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            placeholder="Email Address"
          />
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
              placeholder="Email Address"
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
          onClick={() => setStep(2)}
          className="bg-main text-[18px] rounded-lg text-white w-full"
        >
          Next
        </Button>
        <div className="mt-10 w-full flex justify-center">
          <div>
            <span>Already have an account? </span>
            <div
              onClick={() => navigate("/login")}
              className="text-main inline-block font-GeneralSans-Medium hover:border-b hover:border-main"
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
