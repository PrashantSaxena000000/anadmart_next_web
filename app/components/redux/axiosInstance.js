import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.PUBLIC_API_KEY,
});

export default axiosInstance;
