import axios from "axios";

const api = axios.create({
  baseURL: "https://khetbazaar-middlemanfreemandiplatform.onrender.com", // ✅ your new API URL
  withCredentials: true,
});

export default api;
