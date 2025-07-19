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
// import { useNavigate } from "react-router-dom";
import { Edit2Icon, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { UsersUpdate } from "../apiCalls/user";

const ProfileOverview = () => {
  //   const navigate = useNavigate();
  const [editVerification, setEditVerification] = useState(false);
  const [editPersonal, setEditPersonal] = useState(false);
  const { user, setUser, login } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [details, setDetails] = useState(user);

  const handleSave = async () => {
    setUser(details);
    let valid = false;
    handleOpen();
    console.log(details);
    // const apiKeyResponse = await GenerateAPIKey();
    // console.log(apiKeyResponse);
    const updateResponse = await UsersUpdate({
      current_level: details.curent_level,
      profile_picture: details?.profile_picture,
      bio: details.bio,
    });
    handleClose();
    console.log(updateResponse);
    if (updateResponse.status === 200) {
      valid = true;
    }

    if (valid) {
      login(updateResponse.data);
    }
    console.log("created");
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

  return (
    <div>
      <p className="text-[36px] font-GeneralSans-Semibold text-[#BB4259]">
        Profile Overview
      </p>
      <div className="w-full flex flex-col items-center">
        <div className="max-w-[450px] w-[450px]">
          <div>
            <div className="flex justify-between items-center space-y-2 mt-8">
              <p className="font-GeneralSans-Medium mb-2">Personal Details</p>
              {editPersonal ? (
                <Alert action={handleSave}>
                  <div className="flex items-center space-x-1 text-xs font-GeneralSans-Medium cursor-pointer">
                    <Save size={15} className="text-main" />
                    <span>save</span>
                  </div>
                </Alert>
              ) : (
                <div
                  onClick={() => {
                    setEditPersonal(!editPersonal);
                    setEditVerification(!editVerification);
                  }}
                  className="flex items-center space-x-1 text-xs font-GeneralSans-Medium cursor-pointer"
                >
                  <Edit2Icon size={15} className="text-main" />
                  <span>edit</span>
                </div>
              )}
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
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
                placeholder="Name"
              />
            </div>
            <div className="space-y-2 mb-3">
              <Label htmlFor="email" className="font-GeneralSans-Medium">
                Bio
              </Label>
              <textarea
                value={details.bio}
                disabled={!editPersonal}
                onChange={(e) =>
                  setDetails({ ...details, bio: e.target.value })
                }
                rows={5}
                placeholder="Tell us about yourself..."
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center space-y-2 my-4">
              <p className="font-GeneralSans-Medium mb-2">
                Verification Details
              </p>
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
                onValueChange={(value) =>
                  setDetails({ ...details, level: value })
                }
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

export default ProfileOverview;
