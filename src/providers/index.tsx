import { CategoriesProvider } from "../contexts/CategoriesContext";
import { LoginProvider } from "../contexts/LoginContext";
import { MenuItemProvider } from "../contexts/MenuItemContext";
import { OrderProvider } from "../contexts/OrdersContext";
import { UsersProvider } from "../contexts/UsersContext";
import { IProvider } from "../interfaces";

export const Providers = ({ children }: IProvider) => {
  return (
    <>
      <OrderProvider>
        <MenuItemProvider>
          <CategoriesProvider>
            <UsersProvider>
              <LoginProvider>{children}</LoginProvider>
            </UsersProvider>
          </CategoriesProvider>
        </MenuItemProvider>
      </OrderProvider>
    </>
  );
};
