// src/utils/apiClient.js
import axios from "axios";

// Create an Axios instance
const API_CLIENT = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Ensure this is defined in your .env
});

// Add a request interceptor to include the token in headers
API_CLIENT.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage or AuthContext
    const token = localStorage.getItem("authToken"); // Adjust if using a different storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API_CLIENT;
