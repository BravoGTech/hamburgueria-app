import { LoginProvider } from "../contexts/LoginContext";
import { MenuItemProvider } from "../contexts/MenuItemContext";
import { OrderProvider } from "../contexts/OrdersContext";
import { IProvider } from "../interfaces/ContextInterface";

export const Providers = ({ children }: IProvider) => {
  return (
    <>
      <OrderProvider>
        <MenuItemProvider>
          <LoginProvider>{children}</LoginProvider>
        </MenuItemProvider>
      </OrderProvider>
    </>
  );
};
