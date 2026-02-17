import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // dev mode
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
