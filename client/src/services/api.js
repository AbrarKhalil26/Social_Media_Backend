import axios from "axios";
import { BASE_URL, PREFIX_USER } from "../config/config";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Create Axios Instance
export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request Interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken)
      config.headers["authorization"] = `${PREFIX_USER} ${accessToken}`;
    return config;
  },
  (err) => {
    console.error("Request error ::", err);
    return Promise.reject(err);
  },
);

// Response interceptor
AxiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      console.error("Response error :: ", err.response);

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `${PREFIX_USER} ${token}`;
            return AxiosInstance(originalRequest);
          })
          .catch((error) => Promise.reject(error));
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        console.log(res);
        
        const newToken = res.data.data.access_token;
        localStorage.setItem("token", newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `${PREFIX_USER} ${newToken}`;
        return AxiosInstance(originalRequest);

      } catch (error) {
        processQueue(error, null);
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
        return Promise.reject(error);
        
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  },
);
