import axios from "axios";

export default axios.create({
  // baseURL: process.env.API_URL || "https://sistema-academico-api.onrender.com/",
  baseURL: process.env.API_URL || "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
  },
});
