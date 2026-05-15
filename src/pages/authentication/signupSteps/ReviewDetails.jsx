/* eslint-disable react/prop-types */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { Edit2Icon, Eye, EyeClosed, Save } from "lucide-react";
import ImageSelector from "../../../components/ImageSelector";
import { useAuth } from "../../../context/AuthContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { UsersCreate } from "../../../apiCalls/user";

const ReviewDetails = ({ details, setDetails }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [editVerification, setEditVerification] = useState(false);
  const [editPersonal, setEditPersonal] = useState(false);
  const { login } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    //console.log(details);
  };

  const handleCreateAccount = async () => {
    handleOpen();

    const signupResponse = await UsersCreate({
      firstname: details.name.split(" ")[0],
      lastname: details.name.split(" ")[1] || "",
      email: details.email.toLowerCase(),
      current_level: details.level,
      matric_no: details.matricNo,
      password: details.password,
    });
    handleClose();

    if (signupResponse?.status === 201 || signupResponse?.status === 200) {
      login(signupResponse.data);
      navigate(`/verifyAccount?fm=su&email=${details.email}`);
    }
  };

  const Alert = ({ children, action }) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Proceed to continue</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col">
            {/* Custom Cancel Button */}

            {/* Custom Action Button */}
            <AlertDialogAction asChild>
              <Button
                variant="ghost"
                onClick={() => action()}
                className="bg-main text-[18px] rounded-lg text-white w-full"
              >
                Proceed
              </Button>
            </AlertDialogAction>
            <AlertDialogCancel asChild>
              <Button
                variant="ghost"
                size="default"
                disabled={editPersonal || editVerification}
                className="text-main text-[18px] rounded-lg border border-main bg-white w-full"
              >
                Edit
              </Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const validations = {
    length: details.password.length >= 8 && details.password.length <= 16,
    uppercase: /[A-Z]/.test(details.password),
    lowercase: /[a-z]/.test(details.password),
    number: /[0-9]/.test(details.password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(details.password),
  };

  const isPasswordValid = Object.values(validations).every(Boolean);
  const isFormValid =
    details.name &&
    details.email &&
    isPasswordValid &&
    details.matricNo &&
    details.level;

  return (
    <div>
      <p className="text-[36px] font-GeneralSans-Semibold text-[#282828]">
        Review Details
      </p>

      <div>
        <div className="flex justify-between items-center space-y-2 mt-8">
          <p className="font-GeneralSans-Medium mb-2">Personal Details</p>
          <div
            onClick={() => setEditPersonal(!editPersonal)}
            className="cursor-pointer"
          >
            {editPersonal ? (
              <div className="flex items-center space-x-1 text-xs font-GeneralSans-Medium">
                <Save size={15} className="text-main" />
                <span>save</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-xs font-GeneralSans-Medium">
                <Edit2Icon size={15} className="text-main" />
                <span>edit</span>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2 mb-3">
          <Label htmlFor="name" className="font-GeneralSans-Medium">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            value={details.name}
            disabled={!editPersonal}
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
            disabled={!editPersonal}
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
              disabled={!editPersonal}
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
          {editPersonal && (
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
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center space-y-2 my-4">
          <p className="font-GeneralSans-Medium mb-2">Verification Details</p>
          <div
            onClick={() => setEditVerification(!editVerification)}
            className="cursor-pointer"
          >
            {editVerification ? (
              <div className="flex items-center space-x-1 text-xs font-GeneralSans-Medium">
                <Save size={15} className="text-main" />
                <span>save</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-xs font-GeneralSans-Medium">
                <Edit2Icon size={15} className="text-main" />
                <span>edit</span>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2 mb-3">
          <Label htmlFor="matric" className="font-GeneralSans-Medium">
            Matric Number
          </Label>
          <Input
            type="text"
            id="matric"
            value={details.matricNo}
            disabled={!editVerification}
            onChange={(e) =>
              setDetails({ ...details, matricNo: e.target.value })
            }
            placeholder="Enter your Matric Number"
          />
        </div>
        <div className="space-y-2 mb-3">
          <Label htmlFor="level" className="font-GeneralSans-Medium">
            Current Level
          </Label>
          <Select
            value={details.level}
            onValueChange={(value) => setDetails({ ...details, level: value })}
            disabled={!editVerification}
          >
            <SelectTrigger className="py-6 ">
              <SelectValue placeholder="Select your Current Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100">100 Level</SelectItem>
              <SelectItem value="200">200 Level</SelectItem>
              <SelectItem value="300">300 Level</SelectItem>
              <SelectItem value="400">400 Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 mb-3">
          <Label htmlFor="image" className="font-GeneralSans-Medium">
            Upload Proof of Departmental Dues (Optional)
          </Label>
          <div className="">
            <ImageSelector
              image={details.duesImage}
              setImage={(img) => setDetails({ ...details, duesImage: img })}
            />
            {details.duesImage && (
              <div className="flex flex-col items-center w-full">
                <Button
                  disabled={!editVerification}
                  onClick={() => setDetails({ ...details, duesImage: null })}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove Image
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Alert action={handleCreateAccount}>
          <Button
            variant="ghost"
            size="default"
            disabled={editPersonal || editVerification || !isFormValid}
            className="bg-main text-[18px] rounded-lg text-white w-full"
          >
            Create an account
          </Button>
        </Alert>

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

export default ReviewDetails;
