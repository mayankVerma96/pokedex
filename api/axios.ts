import axios from "axios";

const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL as string) || "https://pokeapi.co/api/v2/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
