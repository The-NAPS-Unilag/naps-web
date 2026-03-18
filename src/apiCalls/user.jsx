/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const apiUrl = import.meta.env.VITE_APP_NAPS_URL || "/api";

const getAccessToken = () => localStorage.getItem("accessToken");
const getAuthHeader = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};


const UsersCreate = async (data) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users`;
  const formData =
    data instanceof FormData
      ? data
      : Object.entries(data || {}).reduce((fd, [key, value]) => {
        if (value !== undefined && value !== null) {
          fd.append(key, value);
        }
        return fd;
      }, new FormData());

  console.log(data);
  try {
    const postsData = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",

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
    return err.message;
  }
};

const UsersConfirmEmail = async (email, otp) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/confirm`;
  const data = {
    email,
    otp,
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",

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
      return err.message;
    });
  }
};

const UsersResendOTP = async (email) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/resend-otp`;
  const data = {
    email,
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",

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
    password,
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",

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
    return err.message;
  }
};

const UsersLoginMatric = async (matric_no, password) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/login/matric`;
  const data = {
    matric_no,
    password,
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",

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
    email,
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",

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
  const url = `${apiUrl}/users/reset-password`;
  const data = {
    email,
    otp,
    new_password,
  };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",

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

const UsersUpdate = async (id, data) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/update/${id}`;
  // const data = {
  //   ...userData,
  // };

  console.log(data);
  console.log("accessToken", getAccessToken());
  try {
    const postsData = await axios.put(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",

        ...getAuthHeader(),
      },
    });
    console.log(postsData);
    if (postsData.status === 200) {
      MySwal.fire({
        title: "Success",
        icon: "success",
        text: postsData.data.message || "User updated successfully",
      });
    }
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
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
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

const UsersGetMe = async () => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/users/me`;

  try {
    const getsData = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        ...getAuthHeader(),
      },
    });
    return getsData;
  } catch (err) {
    console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
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

const UsersGetActivity = async (user_id) => {
  const url = `${apiUrl}/users/${user_id}/activity`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        ...getAuthHeader(),
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    return null;
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
        "Content-Type": "application/json;charset=UTF-8",
        ...getAuthHeader(),
      },
    });
    return getsData;
  } catch (err) {
    console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
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
  const url = `${apiUrl}/users/delete/${user_id}`;

  console.log(url);

  try {
    const getsData = await axios.delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        ...getAuthHeader(),
      },
    });
    return getsData;
  } catch (err) {
    console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
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
  UsersGetMe,
  UsersConfirmEmail,
  UsersForgotPassword,
  UsersLogin,
  UsersLoginMatric,
  UsersResendOTP,
  UsersResetPassword,
  UsersGetActivity,
};
