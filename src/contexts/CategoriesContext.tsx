import { createContext } from "react";
import { IProvider } from "../interfaces";
import {
  ICategoryData,
  categoriesContextData,
} from "../interfaces/categories.intefaces";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export const CategoriesContext = createContext<categoriesContextData>(
  {} as categoriesContextData
);

export const CategoriesProvider = ({ children }: IProvider) => {
  const listCategories = async (): Promise<ICategoryData[] | undefined> => {
    try {
      const response = await api.get("/category");
      return response.data;
    } catch (error) {
      // console.log(error);
    }
  };

  const { data, isFetching, error } = useQuery({
    queryKey: ["categories"],
    queryFn: listCategories,
  });
  return (
    <CategoriesContext.Provider value={{ data, isFetching }}>
      {children}
    </CategoriesContext.Provider>
  );
};
