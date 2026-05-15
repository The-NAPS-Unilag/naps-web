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
 * Get all forums
 * @returns {Promise} - List of forums
 */
const GetForums = async () => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums`;

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
    return null;
  }
};

/**
 * Explore forums (discover new forums)
 * @returns {Promise} - List of recommended/discoverable forums
 */
const ExploreForums = async () => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums/explore`;

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
    return null;
  }
};

/**
 * Get recommended forums for user
 * @returns {Promise} - List of recommended forums
 */
const GetRecommendedForums = async () => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums/recommended`;

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
    return null;
  }
};

/**
 * Get top contributors
 * @returns {Promise} - List of top contributors
 */
const GetTopContributors = async () => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums/top-contributors`;

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
    return null;
  }
};

/**
 * Create a new forum (Admin only)
 * @param {Object} data - Forum data
 * @param {string} data.name - Forum name
 * @param {string} data.description - Forum description
 * @param {boolean} data.is_general - Whether it's a general forum
 * @returns {Promise} - Created forum
 */
const CreateForum = async (data) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums`;

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
        text: "Forum created successfully",
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
 * Get the list of forum IDs the current user has joined
 * @returns {Promise} - { forum_ids: number[] }
 */
const GetMyMemberships = async () => {
  const url = `${apiUrl}/forums/my-memberships`;
  try {
    const response = await axios.get(url, { headers: getAuthHeader() });
    return response;
  } catch {
    return { data: { forum_ids: [] } };
  }
};

/**
 * Join a forum
 * @param {number} forumId - Forum ID to join
 * @returns {Promise} - Join response
 */
const JoinForum = async (forumId) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums/${forumId}/join`;

  try {
    const response = await axios.post(url, {}, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        ...getAuthHeader(),
      },
    });
    if (response.status === 200) {
      MySwal.fire({
        title: "Success",
        icon: "success",
        text: "Successfully joined forum",
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
 * Create a thread in a forum
 * @param {number} forumId - Forum ID
 * @param {Object} data - Thread data
 * @param {string} data.title - Thread title
 * @param {string} data.body - Thread body/content
 * @returns {Promise} - Created thread
 */
const CreateThread = async (forumId, data) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums/${forumId}/threads`;

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
        text: "Thread created successfully",
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
 * Get all threads in a forum
 * @param {number} forumId - Forum ID
 * @returns {Promise} - List of threads
 */
const GetForumThreads = async (forumId) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums/${forumId}/threads`;

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
    return null;
  }
};

/**
 * Get thread details with messages
 * @param {number} threadId - Thread ID
 * @returns {Promise} - Thread details and messages
 */
const GetThread = async (threadId) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums/threads/${threadId}`;

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
    return null;
  }
};

/**
 * Get messages for a thread
 * @param {number} threadId - Thread ID
 * @returns {Promise} - List of messages
 */
const GetMessages = async (threadId) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums/threads/${threadId}/messages`;

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
    return null;
  }
};

/**
 * Send a message in a thread
 * @param {number} threadId - Thread ID
 * @param {Object} data - Message data
 * @param {string} data.content - Message content
 * @param {number} [data.parent_message_id] - Optional parent message ID for replies
 * @param {File} [data.attachment] - Optional file attachment
 * @returns {Promise} - Sent message
 */
const SendMessage = async (threadId, data) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums/threads/${threadId}/messages`;

  const formData = new FormData();
  if (data.content) {
    formData.append("content", data.content);
  }
  if (data.parent_message_id) {
    formData.append("parent_message_id", data.parent_message_id);
  }
  if (data.attachment) {
    formData.append("attachment", data.attachment);
  }

  try {
    const response = await axios.post(url, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
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
    throw err;
  }
};

/**
 * Like a message
 * @param {number} messageId - Message ID
 * @returns {Promise} - Like response with updated like count
 */
const LikeMessage = async (messageId) => {
  const MySwal = withReactContent(Swal);
  const url = `${apiUrl}/forums/messages/${messageId}/like`;

  try {
    const response = await axios.post(url, {}, {
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
    throw err;
  }
};

export {
  GetForums,
  ExploreForums,
  GetRecommendedForums,
  GetTopContributors,
  GetMyMemberships,
  CreateForum,
  JoinForum,
  CreateThread,
  GetForumThreads,
  GetThread,
  GetMessages,
  SendMessage,
  LikeMessage,
};
