/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { GetToken, SetToken } from "../../token";

const apiUrl = import.meta.env.VITE_APP_EKOATLANTIC_URL;

const UploadFile = async (file, key, type, orgID, setProgress, setLoading) => {
  const MySwal = withReactContent(Swal);
  const formData = new FormData();
  console.log("TYPO", key, type);
  formData.append("file", file);
  const url = `${apiUrl}/media/uploadFile?key=${key}&type=${type}&orgID=${orgID}`;
  const data = formData;

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json;charset=UTF-8"
      //   },
      onUploadProgress: (progressEvent) => {
        console.log("prog", progressEvent);
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      }
    });
    console.log(postsData);
    // if (postsData.status !== 201 || postsData.status !== 200) {
    //   MySwal.fire({
    //     title: postsData.AxiosError.code,
    //     icon: "error",
    //     text: postsData.AxiosError.message
    //   });
    // }

    return postsData;
  } catch (err) {
    console.log(err);
    setLoading(false);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message
    }).then(() => {
      if (err?.response?.data?.message === "Expired Access") {
        window.location.replace("/");
      }
      if (err?.response?.data?.message === "Token Does Not Exist") {
        window.location.replace("/");
      }
      if (err?.response?.data?.message === "Unauthorized Access") {
        window.location.replace("/");
      }
    });
  }
};
const DeleteFile = async (key) => {
  const MySwal = withReactContent(Swal);
  const { orgID } = JSON.parse(localStorage.getItem("user1"));
  const url = `${apiUrl}/media/delete/${orgID}/${key}`;

  try {
    const deleteData = await axios.delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "token-1": GetToken()
      }
    });
    SetToken(deleteData);
    console.log("Delete", deleteData);
    // if (deleteData.status !== 201 || deleteData.status !== 200) {
    //   MySwal.fire({
    //     title: deleteData.AxiosError.code,
    //     icon: "error",
    //     text: deleteData.AxiosError.message
    //   });
    // }

    return deleteData;
  } catch (err) {
    console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message
    }).then(() => {
      if (err?.response?.data?.message === "Expired Access") {
        window.location.replace("/");
      }
      if (err?.response?.data?.message === "Token Does Not Exist") {
        window.location.replace("/");
      }
      if (err?.response?.data?.message === "Unauthorized Access") {
        window.location.replace("/");
      }
    });
  }
};

const GetS3Urls = async (name) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/media/getS3Urls/${name}`;

  console.log(url);

  try {
    const getsData = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "token-1": GetToken()
      }
    });
    console.log(getsData);
    SetToken(getsData);
    return getsData;
  } catch (err) {
    console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message
    }).then(() => {
      if (err?.response?.data?.message === "Expired Access") {
        window.location.replace("/");
      }
      if (err?.response?.data?.message === "Token Does Not Exist") {
        window.location.replace("/");
      }
      if (err?.response?.data?.message === "Unauthorized Access") {
        window.location.replace("/");
      }
    });
  }
};

export { UploadFile, DeleteFile, GetS3Urls };
