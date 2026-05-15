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
 * Apply to become a mentor
 * @param {Object} data - Mentor application data
 * @param {string} data.phone_no - Phone number
 * @param {string} data.academic_background - Academic background description
 * @param {string} data.area_of_expertise - Area of expertise
 * @param {string} data.preferred_mode - Preferred mode of communication
 * @returns {Promise} - Application response
 */
const ApplyAsMentor = async (data) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/mentorship/apply-mentor`;

  try {
    const response = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        ...getAuthHeader(),
      },
    });
    if (response.status === 201) {
      MySwal.fire({
        title: "Success",
        icon: "success",
        text: "Your mentor application has been submitted successfully!",
      });
    }
    return response;
  } catch (err) {
    console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
    });
    throw err;
  }
};

/**
 * Apply for mentorship as a student (mentee)
 * @param {Object} data - Mentee application data
 * @param {string} data.matric_no - Matric number
 * @param {string} data.level - Current level
 * @param {string[]} data.areas_of_interest - Areas of interest
 * @returns {Promise} - Application response
 */
const ApplyAsMentee = async (data) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/mentorship/apply`;

  try {
    const response = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        ...getAuthHeader(),
      },
    });
    if (response.status === 201) {
      MySwal.fire({
        title: "Success",
        icon: "success",
        text: "Your mentorship application has been submitted successfully!",
      });
    }
    return response;
  } catch (err) {
    console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
    });
    throw err;
  }
};

/**
 * Get user's mentorship relationships
 * @returns {Promise} - User's mentorship relationships (as mentor and mentee)
 */
const GetMyMentorships = async () => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/mentorship/my-mentorships`;

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
    // Don't show error for empty mentorships
    if (err?.response?.status !== 404) {
      MySwal.fire({
        title: err?.response?.data?.status || "Error",
        icon: "error",
        text: err?.response?.data?.message || err.message,
      });
    }
    return { data: { as_mentor: [], as_mentee: [] } };
  }
};

/**
 * Schedule a mentorship session
 * @param {Object} data - Session schedule data
 * @param {number} data.mentorship_id - Mentorship relationship ID
 * @param {string} data.scheduled_time - Scheduled time (ISO datetime)
 * @param {number} data.duration - Duration in minutes
 * @param {string} data.notes - Session notes
 * @returns {Promise} - Session response
 */
const ScheduleSession = async (data) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/mentorship/schedule-session`;

  try {
    const response = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        ...getAuthHeader(),
      },
    });
    if (response.status === 201) {
      MySwal.fire({
        title: "Success",
        icon: "success",
        text: "Session scheduled successfully!",
      });
    }
    return response;
  } catch (err) {
    console.log(err);
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
    });
    throw err;
  }
};

/**
 * Get sessions for a mentorship
 * @param {number} mentorshipId - Mentorship ID
 * @returns {Promise} - List of sessions
 */
const GetMentorshipSessions = async (mentorshipId) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/mentorship/mentorships/${mentorshipId}/sessions`;

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
    MySwal.fire({
      title: err?.response?.data?.status || "Error",
      icon: "error",
      text: err?.response?.data?.message || err.message,
    });
  }
};

/**
 * Get the current user's own mentor application status
 */
const GetMyMentorApplication = async () => {
  const url = `${apiUrl}/mentorship/my-mentor-application`;
  try {
    const response = await axios.get(url, { headers: getAuthHeader() });
    return response;
  } catch (err) {
    console.log(err);
    return { data: { application: null } };
  }
};

/**
 * Get the current user's own mentee application status
 */
const GetMyMenteeApplication = async () => {
  const url = `${apiUrl}/mentorship/my-mentee-application`;
  try {
    const response = await axios.get(url, { headers: getAuthHeader() });
    return response;
  } catch (err) {
    console.log(err);
    return { data: { application: null } };
  }
};

export {
  ApplyAsMentor,
  ApplyAsMentee,
  GetMyMentorships,
  ScheduleSession,
  GetMentorshipSessions,
  GetMyMentorApplication,
  GetMyMenteeApplication,
};
