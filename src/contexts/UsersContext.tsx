import { createContext } from "react";
import { IProvider } from "../interfaces/ContextInterface";
import { useMutation } from "@tanstack/react-query";
import {
  ICreateUserMutation,
  IResponseCreateUser,
  IUserContextData,
} from "../interfaces/users.interfaces";
import { api } from "../services/api";

export const UsersContext = createContext<IUserContextData>(
  {} as IUserContextData
);

export const UsersProvider = ({ children }: IProvider) => {
  const { mutate: createUser } = useMutation(
    async ({ data }: ICreateUserMutation): Promise<IResponseCreateUser> => {
      return await api.post(`/users`, data).then((response) => {
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        console.log(response);

        return response;
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
  return (
    <UsersContext.Provider value={{ createUser }}>
      {children}
    </UsersContext.Provider>
  );
};
