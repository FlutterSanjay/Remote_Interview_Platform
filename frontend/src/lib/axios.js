import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // browser will send the cookies automatically on ever single requuest by adding this line
});
