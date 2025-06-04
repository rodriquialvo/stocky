import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

import React from 'react'
import { ROUTES } from "../../constants/Routes";
import { useSessionStore } from "../../store/session/slice";

const MenuSales = () => {
    const isAdminUser = useSessionStore(state => state.isAdminUser);
    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="link"
                _hover={{ color: "pink.600" }}
                color={"#ec0868"}
            >
                Ventas
            </MenuButton>
            <MenuList>
                <MenuItem as={Link} href={ROUTES.SALES_LIST}>
                    Lista
                </MenuItem>
                <MenuItem as={Link} href={ROUTES.SALES_WEEK}>
                    Semana
                </MenuItem>
            </MenuList>
        </Menu>)
}

export default MenuSales
