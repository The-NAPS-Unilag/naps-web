/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadIcon, X, RefreshCw } from "lucide-react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

export default function DocumentSelector({
  file,
  setFile,
  isUploading,
  setIsUploading,
  uploadProgress,
  setUploadProgress,
}) {
  const [error, setError] = useState("");

  const MAX_SIZE_MB = 5;
  const ACCEPTED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];

  //   const MySwal = withReactContent(Swal);

  const handleDrop = (e) => {
    e.preventDefault();
    setError("");

    const files = Array.from(e.dataTransfer.files);
    const docFile = files.find((file) => ACCEPTED_TYPES.includes(file.type));

    if (!docFile) {
      setError("Only PDF, DOC, and PPT files are allowed.");
      return;
    }

    if (docFile.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size must be less than ${MAX_SIZE_MB}MB.`);
      return;
    }

    setFile(docFile);
  };

  const handleFileSelect = (e) => {
    setError("");
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
        setError("Only PDF, DOC, and PPT files are allowed.");
        return;
      }
      if (selectedFile.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`File size must be less than ${MAX_SIZE_MB}MB.`);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleRemove = () => {
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className="border-2 border-dashed border-gray-400 p-6 w-full max-w-full h-48 flex flex-col items-center justify-center text-gray-600 text-sm font-GeneralSans-Medium rounded-lg cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <>
            <p className="text-center">{file.name}</p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("fileInput").click()}
                className="flex items-center"
              >
                <RefreshCw size={16} className="mr-1" /> Replace
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="flex items-center"
              >
                <X size={16} className="mr-1" /> Remove
              </Button>
            </div>

            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div
                  className="bg-main h-2.5 rounded-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-center">
              <p className="mb-1">Drag your files here to start uploading</p>
              <p className="text-gray-500">
                (.pdf, .doc, .ppt formats only — max {MAX_SIZE_MB}MB)
              </p>
            </div>
            <div className="mt-6">
              <Button
                variant="ghost"
                size="default"
                onClick={() => document.getElementById("fileInput").click()}
                className="bg-main rounded-lg text-white flex items-center justify-center font-GeneralSans w-full"
              >
                <UploadIcon size={20} className="mr-2" /> Browse
              </Button>
            </div>
          </>
        )}
      </div>

      <input
        id="fileInput"
        type="file"
        accept=".pdf,.doc,.docx,.ppt,.pptx"
        className="hidden"
        onChange={handleFileSelect}
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
