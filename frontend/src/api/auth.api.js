import { axiosInstance } from "../lib/axios.js";

export const authApi = {
  signup: (data) => axiosInstance.post("/auth/signup", data),
  login: (data) => axiosInstance.post("/auth/login", data),
  logout: () => axiosInstance.post("/auth/logout"),
  checkAuth: () => axiosInstance.get("/auth/check"),
  updateProfile: (data) => axiosInstance.put("/auth/update-profile", data),
};
