import axios from 'axios';
import Cookies from "js-cookie";

export const apiClient = () => {
  const token = Cookies.get("token");

  return axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
    timeout: 10000,
  });
}
