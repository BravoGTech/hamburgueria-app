import { LoginProvider } from "../contexts/LoginContext";
import { MenuItemProvider } from "../contexts/MenuItemContext";
import { OrderProvider } from "../contexts/OrdersContext";
import { UsersProvider } from "../contexts/UsersContext";
import { IProvider } from "../interfaces/ContextInterface";

export const Providers = ({ children }: IProvider) => {
  return (
    <>
      <OrderProvider>
        <MenuItemProvider>
          <UsersProvider>
            <LoginProvider>{children}</LoginProvider>
          </UsersProvider>
        </MenuItemProvider>
      </OrderProvider>
    </>
  );
};
