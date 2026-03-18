import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url;
    if (status === 401) {
      // eslint-disable-next-line no-console
      console.warn("401 Unauthorized from API", url);
    }
    return Promise.reject(error);
  }
);

export default axios;
