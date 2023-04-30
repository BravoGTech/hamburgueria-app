import { createContext, useState } from "react";
import {
  IMenuItemContext,
  IMenuItemData,
  IMenuItemInterfaceData,
  IMenuItemMutation,
  IMenuItemUpdateMutation,
} from "../interfaces/menuItem.interfaces";
import { IProvider } from "../interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IMenuItemUpdate } from "../interfaces/menuItem.interfaces";

export const MenuItemContext = createContext<IMenuItemContext>(
  {} as IMenuItemContext
);

export const MenuItemProvider = ({ children }: IProvider) => {
  const [menuItemDeatilData, setMenuItemDetailData] = useState<IMenuItemData>();

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
        setMenuItemDetailData(response);
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );

  const { mutate: createMenuItem } = useMutation(
    async (data: IMenuItemMutation): Promise<IMenuItemInterfaceData> => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return await api.post("/menuItem", data).then((response) => {
        return response.data;
      });
    },
    {
      onSuccess: (response: IMenuItemInterfaceData) => {
        toast.success("Item criado com sucesso");
        return response;
      },
      onError: (error: AxiosError) => {
        if (error.response?.status === 400) {
          toast.error(`${error.message}`);
        }
      },
    }
  );

  const { mutate: updateMenuItem } = useMutation(
    async ({
      newData,
      itemId,
    }: IMenuItemUpdateMutation): Promise<IMenuItemInterfaceData> => {
      const token = localStorage.getItem("@DownTown:Token");

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return await api
        .patch(`/menuItem/${itemId}`, newData)
        .then((response) => {
          return response.data;
        });
    },
    {
      onSuccess: (response) => {
        console.log(response);
      },
      onError: (error: AxiosError) => {
        console.log(error);
      },
    }
  );

  return (
    <MenuItemContext.Provider
      value={{
        data,
        isFetching,
        createMenuItem,
        listItemDetail,
        menuItemDeatilData,
        updateMenuItem,
      }}
    >
      {children}
    </MenuItemContext.Provider>
  );
};
