/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { GetToken, SetToken } from "../../token";

const apiUrl = import.meta.env.VITE_APP_ZAVE_URL;
const apiUrl2 = import.meta.env.VITE_APP_KUBU_URL;

const AddRole = async (data) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/roles/add`;
  // const data = {
  //   orgID,
  //   name,
  //   descrip
  // };

  console.log(data);
  try {
    const postsData = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "token-1": GetToken()
      }
    });
    SetToken(postsData);
    console.log(postsData);
    return postsData;
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

const GetRoles = async (orgID) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/roles/getForOrganization/${orgID}`;

  console.log(url);
  // console.log(GetToken());

  try {
    const getsData = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "token-1": GetToken()
      }
    });
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

const GetPersonalByID = async (id) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/personal/get/${id}`;

  console.log(url);

  try {
    const getsData = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "token-1": GetToken()
      }
    });
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
const GetOrgByID = async (id) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl2}/company/get/${id}`;

  console.log(url);

  try {
    const getsData = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "token-1": GetToken()
      }
    });
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

const DeleteRoleByID = async (id) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/roles/delete/${id}`;

  console.log(url);

  try {
    const deleteData = await axios.delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "token-1": GetToken()
      }
    });
    SetToken(deleteData);
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

export { AddRole, GetRoles, GetPersonalByID, GetOrgByID, DeleteRoleByID };
