import { createContext, useState } from "react";
import {
  IMenuItemContext,
  IMenuItemData,
} from "../interfaces/menuItem.interfaces";
import { IProvider } from "../interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const MenuItemContext = createContext<IMenuItemContext>(
  {} as IMenuItemContext
);

export const MenuItemProvider = ({ children }: IProvider) => {
  const listMenuItem = async () => {
    const response = await api.get("/menuItem");
    return response.data;
  };

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["cardapio"],
    queryFn: listMenuItem,
  });

  const { mutate: listItemDetail } = useMutation(
    async (itemId: string): Promise<IMenuItemData> => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return await api.get(`/menuItem/${itemId}/`).then((response) => {
        return response.data;
      });
    },
    {
      onSuccess: (response) => {
        return response;
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );

  return (
    <MenuItemContext.Provider value={{ data, isFetching, listItemDetail }}>
      {children}
    </MenuItemContext.Provider>
  );
};
