import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5002/api"
      : "/api",
  withCredentials: true,
  timeout: 10000,
});

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't show toast for auth check failures (expected on first load)
    if (error.config?.url?.includes("/auth/check")) {
      return Promise.reject(error);
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);