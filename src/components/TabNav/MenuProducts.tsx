import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

import React from 'react'
import { ROUTES } from "../../constants/Routes";
import { useSessionStore } from "../../store/session/slice";

const MenuProducts = () => {
    const isAdminUser = useSessionStore(state => state.isAdminUser);
    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="link"
                _hover={{ color: "pink.600" }}
                color={"#ec0868"}
                fontWeight={"bold"}
                fontSize={"lg"}
            >
                Productos
            </MenuButton>
            <MenuList>
                <MenuItem as={Link} href={ROUTES.GALLERY}>
                    Galería
                </MenuItem>
                <MenuItem as={Link} href={ROUTES.STOCK_LIST}>
                    Lista de productos
                </MenuItem>
                <MenuItem as={Link} href={ROUTES.NEW_PRODUCT}>
                    Nuevo Producto
                </MenuItem>
                <MenuItem as={Link} href={ROUTES.STOCK_ENTRY}>
                    Ingreso
                </MenuItem>
            </MenuList>
        </Menu>
        )
}

export default MenuProducts
