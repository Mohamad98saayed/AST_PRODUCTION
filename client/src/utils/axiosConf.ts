import axios from "axios";

const axiosConf = axios.create({
  baseURL: "/api",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Accept: "multipart/form-data",
  },
});

export default axiosConf;
