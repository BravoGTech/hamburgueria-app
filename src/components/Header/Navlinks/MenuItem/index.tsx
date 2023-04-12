import { Link, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface MenuItemProps {
  children: ReactNode;
  to: string;
  onToggle: () => void;
  isOpen: boolean;
  activeLink: string;
  handleClick: (path: string) => void;
}

export const MenuItem = ({
  children,
  to,
  onToggle,
  isOpen,
  activeLink,
  handleClick,
  ...rest
}: MenuItemProps) => {
  return (
    <Link onClick={onToggle} href={`/${to}`} _hover={{ textDecor: "none" }}>
      <Text
        textAlign={["left", "left", "center", "center"]}
        display={"flex"}
        alignItems="center"
        align={"center"}
        fontSize="20px"
        gap="2"
        fontFamily={"Montserrat, sans-serif"}
        color="primary-color"
        _hover={{ color: "logo-color" }}
        {...rest}
      >
        {children}
      </Text>
    </Link>
  );
};
