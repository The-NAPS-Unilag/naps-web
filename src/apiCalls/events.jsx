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

/**
 * Get all approved events
 * @returns {Promise} - List of events
 */
const GetEvents = async () => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/events`;

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
    //console.log(err);
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

/**
 * Get events the current user has RSVP'd to
 * @returns {Promise} - List of RSVP'd events
 */
const GetUserRsvps = async () => {
  const url = `${apiUrl}/events/user-rsvps`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response;
  } catch (err) {
    //console.log(err);
    return null;
  }
};

/**
 * Get event by ID
 * @param {number} eventId - ID of the event to retrieve
 * @returns {Promise} - Event details
 */
const GetEventById = async (eventId) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/events/${eventId}`;

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
    //console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
    });
  }
};

/**
 * Get events filtered by type
 * @param {string} eventType - Type of events to filter (e.g., 'seminar', 'tutorial', 'social')
 * @returns {Promise} - List of filtered events
 */
const GetEventsByType = async (eventType) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/events/type/${eventType}`;

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
    //console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
    });
  }
};

/**
 * RSVP to an event
 * @param {number} eventId - ID of the event to RSVP to
 * @returns {Promise} - RSVP response
 */
const RSVPEvent = async (eventId) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/events/${eventId}/rsvp`;

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          ...getAuthHeader(),
        },
      }
    );
    if (response.status === 200) {
      MySwal.fire({
        title: "Success",
        icon: "success",
        text: "You have successfully RSVP'd to this event!",
      });
    }
    return response;
  } catch (err) {
    //console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
    });
    throw err;
  }
};

/**
 * Cancel RSVP for an event
 * @param {number} eventId - ID of the event to cancel RSVP for
 * @returns {Promise} - Cancel RSVP response
 */
const CancelRSVP = async (eventId) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/events/${eventId}/cancel_rsvp`;

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          ...getAuthHeader(),
        },
      }
    );
    if (response.status === 200) {
      MySwal.fire({
        title: "Success",
        icon: "success",
        text: "Your RSVP has been cancelled.",
      });
    }
    return response;
  } catch (err) {
    //console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
    });
    throw err;
  }
};

/**
 * Propose a new event (goes to admin for approval)
 * @param {FormData} formData - Event form data including optional image file
 * @returns {Promise}
 */
const CreateEvent = async (formData) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/events/`;

  try {
    const response = await axios.post(url, formData, {
      headers: {
        ...getAuthHeader(),
        // Let axios set Content-Type automatically for FormData (includes boundary)
      },
    });
    return response;
  } catch (err) {
    //console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
    });
    throw err;
  }
};

export {
  GetEvents,
  GetEventById,
  GetEventsByType,
  GetUserRsvps,
  RSVPEvent,
  CancelRSVP,
  CreateEvent,
};
