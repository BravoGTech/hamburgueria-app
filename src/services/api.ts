import axios from "axios";

export const api = axios.create({
  // baseURL: "http://127.0.0.1:3000",
  baseURL: "https://downtown-api.onrender.com",

  // baseURL: "https://bgm1qceg49.execute-api.sa-east-1.amazonaws.com/DonwTown/",

});
