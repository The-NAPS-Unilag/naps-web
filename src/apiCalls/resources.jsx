/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const apiUrl = import.meta.env.VITE_APP_NAPS_URL;
const apiKey =
  "a89fe15dcd5331522b33cf860b62b9066e4e3358702c5fb74cc227fef06f6be1e820450036f3bf0d8986107a3bcf5a54e21ad4a8f0159c75632f2b865f9d75ca";
const accessToken = localStorage.getItem("accessToken");

const UploadResource = async (id, data, setUploadProgress) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/resources`;
  // const data = {
  //   ...userData,
  // };

  console.log(data);
  try {
    const postsData = await axios.put(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "x-api-key": apiKey,
        Authorization: `${accessToken}`,
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percent);
      },
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
    console.log(err.message);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
    });
  }
};

export { UploadResource };
