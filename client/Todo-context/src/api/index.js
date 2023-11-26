// import necessary modules and utilities
import axios from "axios";
import { LocalStorage } from "../utils/index.js";

// Create an axios instance for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  timeout: 1_20_000,
  withCredentials: true,
});

// Add request interceptor to add authorization header with token before making the request
axios.interceptors.request.use(
  function (config) {
    // Retrive user token from local storage
    const user = LocalStorage.get(user);
    // set authorization header with Bearer token
    config.headers.Authorization = `Bearer ${user.token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// API functions for different actions

/**
 * LOGIN USER
 * @param {Object} data An object with email and password for login
 * @returns {Object} response from axios request
 */
const loginUser = async (data) => {
  return apiClient.post("/users/login", data);
};

/**
 * SIGN-UP USER
 * @param {Object} data An object with fullName, email and password for login
 * @returns {Object} response from axios request
 */
const signupUser = async (data) => {
  return apiClient.post("/users/signup", data);
};

export { loginUser, signupUser };
