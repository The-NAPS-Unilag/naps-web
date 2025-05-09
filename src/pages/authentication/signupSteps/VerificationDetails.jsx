/* eslint-disable react/prop-types */

// import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import ImageSelector from "../../../components/ImageSelector";

const VerificationDetails = ({ details, setDetails, setStep }) => {
  const navigate = useNavigate();
  const isFormValid = details.matricNo && details.level;

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
        <p className="text-[16px] my-10 font-GeneralSans-Medium">Step 2 of 2</p>
      </div>
      <div>
        <p className="font-GeneralSans-Medium mb-2">Verification Details</p>
        <div className="space-y-2 mb-3">
          <Label htmlFor="matric" className="font-GeneralSans-Medium">
            Matric Number
          </Label>
          <Input
            type="text"
            id="matric"
            value={details.matricNo}
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
          <div>
            <ImageSelector
              image={details.duesImage}
              setImage={(img) => setDetails({ ...details, duesImage: img })}
            />
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Button
          variant="ghost"
          size="default"
          onClick={() => setStep(3)}
          className="bg-main text-[18px] rounded-lg text-white w-full"
          disabled={!isFormValid}
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

export default VerificationDetails;
