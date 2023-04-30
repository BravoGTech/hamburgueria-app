import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
});
