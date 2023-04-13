import { createContext } from "react";
import { IMenuItemContext } from "../interfaces/ContextInterface/menuItem.interfaces";
import { IProvider } from "../interfaces/ContextInterface";
import { useQuery } from "@tanstack/react-query";
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

  return (
    <MenuItemContext.Provider value={{ data, isFetching }}>
      {children}
    </MenuItemContext.Provider>
  );
};
