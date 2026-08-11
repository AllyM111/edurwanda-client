
import axios from "axios";

// =================================
// API BASE URL
// =================================

// Production:
// VITE_API_URL=https://edurwanda-server-production.up.railway.app
//
// Local development:
// VITE_API_URL=http://localhost:5000

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

// =================================
// API INSTANCE
// =================================

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 30000,
});

// =================================
// REQUEST INTERCEPTOR
// =================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Do not manually set Content-Type for FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =================================
// RESPONSE INTERCEPTOR
// =================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized API request.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    if (status === 403) {
      console.warn(
        "You do not have permission for this action."
      );
    }

    if (status === 404) {
      console.warn(
        "Requested resource not found:",
        error.config?.url
      );
    }

    if (status >= 500) {
      console.error(
        "Server error. Try again later."
      );
    }

    return Promise.reject(error);
  }
);

export default api;
