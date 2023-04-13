import { MenuItemProvider } from "../contexts/MenuItemContext"
import { IProvider } from "../interfaces/ContextInterface"

export const Providers = ({children}: IProvider) => {
  return (
    <>
    <MenuItemProvider>
      {children}
    </MenuItemProvider>
    </>
  )
}