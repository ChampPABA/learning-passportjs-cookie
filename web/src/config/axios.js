import axios from "axios";
import { getAccessToken } from "../utils/cookie";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
  (config) => {
    /*
    วิธีนี้ ทำไม่ได้ เพราะว่า httpOnly ดังนั้น ต้องเปลี่ยนใหม่ ส่งไปทั้ง cookie แม่งเลย
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    */
    config.withCredentials = true; // แนบ cookies ส่งไปหลังบ้าน
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
