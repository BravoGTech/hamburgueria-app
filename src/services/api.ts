import axios from "axios";

export const api = axios.create({
  // baseURL: "http://127.0.0.1:3000",
  // baseURL: "https://downtown-api.onrender.com",
  baseURL: "https://ec2-18-231-111-149.sa-east-1.compute.amazonaws.com:3000",
});
