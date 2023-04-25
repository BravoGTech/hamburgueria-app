import { createContext } from "react";
import { IProvider } from "../interfaces/ContextInterface/index";
import { ILoginContextData, ILoginData } from "../interfaces/login.interfaces";
import { api } from "../services/api";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

export const LoginContext = createContext<ILoginContextData>(
  {} as ILoginContextData
);

export const LoginProvider = ({ children }: IProvider) => {
  const login = async (data: ILoginData) => {
    await api
      .post("/login", data)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("@DownTown:Token", token);
        const decoded = jwt_decode<any>(token);
        toast.success("Login realizado com sucesso");

        if (decoded.isAdmin) {
          console.log("ir para pagina de admin");
        } else {
          console.log("ir para pagina de usuario");
        }
      })
      .catch((error) => toast.error("Email ou senha inválidos"));
  };
  return (
    <LoginContext.Provider value={{ login }}>{children}</LoginContext.Provider>
  );
};
