/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const apiUrl = import.meta.env.VITE_APP_NAPS_URL;
const apiKey =
  "a89fe15dcd5331522b33cf860b62b9066e4e3358702c5fb74cc227fef06f6be1e820450036f3bf0d8986107a3bcf5a54e21ad4a8f0159c75632f2b865f9d75ca";

const GenerateAPIKey = async () => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/generate_api_key`;

  try {
    const postsData = await axios.post(
      url,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      }
    );
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

const UsersCreate = async (email, current_level, matric_no, password) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users`;
  const data = {
    email,
    current_level,
    matric_no,
    password
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
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
    console.log(err.message);
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

const UsersConfirmEmail = async (email, otp) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/confirm`;
  const data = {
    email,
    otp
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
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
    console.log(err.message);
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

const UsersResendOTP = async (email) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/resend-otp`;
  const data = {
    email
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
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
    console.log(err.message);
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

const UsersLogin = async (email, password) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/login`;
  const data = {
    email,
    password
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "x-api-key": apiKey
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
    console.log(err.message);
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

const UsersLoginMatric = async (matric_no, password) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/login/matric`;
  const data = {
    matric_no,
    password
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
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
    console.log(err.message);
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

const UsersForgotPassword = async (email) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/forgot-password`;
  const data = {
    email
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
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
    console.log(err.message);
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

const UsersResetPassword = async (email, otp, new_password) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/forgot-password`;
  const data = {
    email,
    otp,
    new_password
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
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
    console.log(err.message);
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

const UsersUpdate = async (userData) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/${userData.id}`;
  const data = {
    ...userData
  };

  console.log(data);
  try {
    const postsData = await axios.put(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
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
    console.log(err.message);
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

const UsersGetById = async (user_id) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/${user_id}`;

  console.log(url);

  try {
    const getsData = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      }
    });
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

const UsersGets = async () => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users`;

  console.log(url);

  try {
    const getsData = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      }
    });
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

const UsersDelete = async (user_id) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/${user_id}`;

  console.log(url);

  try {
    const getsData = await axios.delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      }
    });
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

export {
  UsersCreate,
  UsersGets,
  UsersDelete,
  UsersUpdate,
  UsersGetById,
  UsersConfirmEmail,
  UsersForgotPassword,
  UsersLogin,
  UsersLoginMatric,
  UsersResendOTP,
  UsersResetPassword,
  GenerateAPIKey
};
