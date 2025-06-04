import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

import React from 'react'
import { ROUTES } from "../../constants/Routes";
import { useSessionStore } from "../../store/session/slice";

const MenuMayor = () => {
    const isAdminUser = useSessionStore(state => state.isAdminUser);
    return (
        <Menu>
            <MenuButton
                as={Button}
                variant="link"
                _hover={{ color: "pink.600" }}
                color={"#ec0868"}

            >
                🔥 Mayoristas 🔥
            </MenuButton>
            
        </Menu>)
}

export default MenuMayor
