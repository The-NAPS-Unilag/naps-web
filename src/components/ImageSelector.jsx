/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";

export default function ImageSelector({ image, setImage }) {
  //   const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const MAX_SIZE_MB = 2; // Maximum allowed size in MB

  const handleDrop = (e) => {
    e.preventDefault();
    setError("");

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));

    if (!imageFile) {
      setError("Only image files are allowed.");
      return;
    }

    if (imageFile.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image size must be less than ${MAX_SIZE_MB}MB.`);
      return;
    }

    setImage(imageFile);
  };

  const handleFileSelect = (e) => {
    setError("");

    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        return;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Image size must be less than ${MAX_SIZE_MB}MB.`);
        return;
      }

      setImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="border-2 border-dashed border-gray-400 p-6 w-full max-w-full h-48 flex flex-col items-center justify-center text-text_grey text-sm font-GeneralSans-Medium rounded-lg cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt="uploaded"
              className="w-full h-full object-cover rounded-md"
            />
            <p>{image.name}</p>
          </>
        ) : (
          <>
            <div className="text-center">
              <p className="mb-1">
                Drag your files or photos here to start uploading
              </p>
              <p className=" text-gray-500">
                (.img .jpeg & .png formats only )
              </p>
            </div>
            <div className="mt-8">
              <Button
                variant="ghost"
                size="default"
                onClick={() => document.getElementById("fileInput").click()}
                className="bg-main rounded-lg text-white flex items-center justify-center font-GeneralSans w-full"
              >
                <UploadIcon size={50} /> <span>Browse</span>
              </Button>
            </div>
          </>
        )}
      </div>

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
