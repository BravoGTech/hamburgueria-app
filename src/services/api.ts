import axios from "axios";

export const api = axios.create({
  // baseURL: "http://127.0.0.1:3000",
  // baseURL: "https://downtown-api.onrender.com",
  baseURL: "http://ec2-54-94-94-133.sa-east-1.compute.amazonaws.com:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
