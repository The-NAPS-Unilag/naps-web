import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BackButton from "./BackButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DocumentSelector from "../DocumentSelector";
import { UploadResource } from "../../apiCalls/resources";

import { useAuth } from "../../context/AuthContext";

const AddResource = () => {
  const [form, setForm] = useState({
    title: "",
    course_title: "",
    level: "",
    author: "",
    contributors: "",
    file: null,
    url: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const MAX_FILE_SIZE_MB = 5;
  const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError("Only PDF or DOC files are allowed.");
        return;
      }
      // Validate file size
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError("Maximum file size allowed is 5MB.");
        return;
      }
      setError("");
      setForm((prev) => ({ ...prev, file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.course_title || !form.level || !form.author) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!form.file && !form.url) {
      setError("Please upload a file or provide a URL.");
      return;
    }

    setError("");
    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    if (form.file) {
      formData.append("file", form.file);
    }
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("course_title", form.course_title);
    formData.append("level", form.level);
    if (form.contributors) {
      formData.append("contributors", form.contributors.split(","));
    }
    if (form.url) {
      formData.append("url", form.url);
    }

    try {
      const updateResponse = await UploadResource(
        user?.id,
        formData,
        setUploadProgress
      );

      const status = updateResponse?.status;
      if (status === 200 || status === 201) {
        setForm({
          title: "",
          course_title: "",
          level: "",
          author: "",
          contributors: "",
          file: null,
          url: "",
        });
        await MySwal.fire({
          title: "Submitted for review",
          icon: "success",
          text: "Your resource was uploaded and is pending admin approval. You’ll be notified by email once it’s approved.",
          confirmButtonText: "OK",
        });
        navigate("/resources");
      } else if (updateResponse) {
        setError(
          updateResponse?.data?.message || "Failed to upload resource. Try again."
        );
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton />
      <div className="max-w-[448px] mx-auto text-sm">
        <h1 className="mb-6 text-[#CC8A0A] font-GeneralSans-Semibold text-[28px]">
          Add Resource
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-500 text-xs">{error}</p>}

          <div>
            <Label
              htmlFor="title"
              className="text-[#5B5C60] font-GeneralSans-Semibold"
            >
              Resource Title / Name *
            </Label>
            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter resource title"
              className="mt-2"
            />
          </div>

          <div>
            <Label
              htmlFor="course_title"
              className="text-[#5B5C60] font-GeneralSans-Semibold"
            >
              Course Title / Code *
            </Label>
            <Input
              id="course_title"
              name="course_title"
              value={form.course_title}
              onChange={handleChange}
              placeholder="Enter course title/code"
              className="mt-2"
            />
          </div>

          <div>
            <Label
              htmlFor="level"
              className="text-[#5B5C60] font-GeneralSans-Semibold"
            >
              Level *
            </Label>
            <Select
              value={form.level || ""}
              onValueChange={(value) => setForm({ ...form, level: value })}
            >
              <SelectTrigger className="mt-2 py-6 ">
                <SelectValue placeholder="Enter Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100 Level</SelectItem>
                <SelectItem value="200">200 Level</SelectItem>
                <SelectItem value="300">300 Level</SelectItem>
                <SelectItem value="400">400 Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="author"
              className="text-[#5B5C60] font-GeneralSans-Semibold"
            >
              Author / Source *
            </Label>
            <Input
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Enter author/source"
              className="mt-2"
            />
          </div>

          <div>
            <Label
              htmlFor="contributors"
              className="text-[#5B5C60] font-GeneralSans-Semibold"
            >
              Contributors (comma separated)
            </Label>
            <Input
              id="contributors"
              name="contributors"
              value={form.contributors}
              onChange={handleChange}
              placeholder="Enter contributors"
              className="mt-2"
            />
          </div>

          <div>
            <Label
              htmlFor="file"
              className="text-[#5B5C60] font-GeneralSans-Semibold"
            >
              Upload File
            </Label>
            <DocumentSelector
              file={form.file}
              setFile={(file) => setForm({ ...form, file })}
              isUploading={loading}
              uploadProgress={uploadProgress}
              setIsUploading={setLoading}
              setUploadProgress={setUploadProgress}
            />
          </div>

          <div>
            <Label
              htmlFor="url"
              className="text-[#5B5C60] font-GeneralSans-Semibold"
            >
              URL (if no file)
            </Label>
            <Input
              id="url"
              name="url"
              type="url"
              value={form.url}
              onChange={handleChange}
              placeholder="Enter URL"
              className="mt-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-[#2561ED] text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddResource;
