import { axiosInstance } from "../lib/axios.js";

export const messageApi = {
  getUsers: () => axiosInstance.get("/messages/users"),
  getMessages: (userId, params = {}) =>
    axiosInstance.get(`/messages/${userId}`, { params }),
  sendMessage: (userId, data) =>
    axiosInstance.post(`/messages/send/${userId}`, data),
};
