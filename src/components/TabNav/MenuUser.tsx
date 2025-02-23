import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Link, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

import React from 'react'
import { ROUTES } from "../../constants/Routes";
import { useSessionStore } from "../../store/session/slice";
import { useNavigate } from "react-router-dom";
import { SessionAction } from "../../store/session/actions";

const MenuUser = () => {
    const isAuthenticated = useSessionStore(state => state.isAuthenticated);
    const userLoged = useSessionStore(state => state.userLogged);
    const navigate = useNavigate();
    const onPressLink = () => {
        if(!isAuthenticated) {
            navigate(ROUTES.LOGIN);
        }
    }
      const { logout } = SessionAction()
    
    return (
        <Menu>
            <MenuButton
                as={Button}
                // rightIcon={<ChevronDownIcon />}
                variant="link"
                _hover={{ color: "pink.600" }}
                color={"#ec0868"}
                fontWeight={"bold"}
                fontSize={"lg"}
                onClick={onPressLink}
            >
                {
                    !!isAuthenticated ? (
                        "Hola, " + userLoged.name
                    ) :
                        "Iniciar sesión / Registrarse"
                }
            </MenuButton>
            {
                !!isAuthenticated && (
                    <MenuList>
                        <MenuItem as={Button} variant={"link"} onClick={logout}>
                            Cerrar Sesión
                        </MenuItem>
                    </MenuList>
                )
            }

        </Menu>
    )
}

export default MenuUser
