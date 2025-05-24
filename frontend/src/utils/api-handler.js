import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const BASE_URL = "http://localhost:8000/api/";

// Helper to get token from localStorage
const getToken = (key) => {
  const token = localStorage.getItem(key);
  return token && token !== "undefined" ? token : null;
};

let accessToken = getToken("accessToken");
let refreshToken = getToken("refreshToken");

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  },
});

// Helper to update tokens in memory and headers
export function setAuthToken(token) {
  accessToken = token;
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
}

// Request Interceptor: Refresh token if expired
AxiosInstance.interceptors.request.use(
  async (req) => {
    accessToken = getToken("accessToken");
    refreshToken = getToken("refreshToken");

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          req.headers.Authorization = `Bearer ${accessToken}`;
          return req;
        }

        // Token expired, try to refresh
        if (!refreshToken) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
          return Promise.reject("No refresh token");
        }

        const response = await axios.post(`${BASE_URL}token/refresh/`, {
          refresh: refreshToken,
        });

        if (response.data.access) {
          const newAccessToken = response.data.access;
          localStorage.setItem("accessToken", newAccessToken);
          setAuthToken(newAccessToken);
          req.headers.Authorization = `Bearer ${newAccessToken}`;
          return req;
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return req;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Log errors
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
