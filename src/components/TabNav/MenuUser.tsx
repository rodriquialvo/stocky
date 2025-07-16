import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useBreakpointValue,
  Text,
  Flex,
  Avatar,
} from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import { useSessionStore } from '../../store/session/slice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { getUserDisplayName } from '../../utils/functions';

const MenuUser: React.FC = () => {
  const isAuthenticated = useSessionStore(state => state.isAuthenticated);
  const userLogged = useSessionStore(state => state.userLogged);
  const reset = useSessionStore(state => state.reset);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const handleLogout = () => {
    reset();
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="User menu"
        icon={
          isAuthenticated && userLogged?.name ? (
            <Flex align="center" gap={2}>
              <Avatar size="sm" name={getUserDisplayName(userLogged)} bg="#ec0868" color="white" />
              <Text fontSize="sm" color="#ec0868" fontWeight="medium" display={{ base: "none", md: "block" }}>
                {getUserDisplayName(userLogged)}
              </Text>
            </Flex>
          ) : (
            <FiUser />
          )
        }
        variant="ghost"
        color="#ec0868"
        _hover={{ bg: "pink.50" }}
        h="auto"
        py={2}
      />
      <MenuList>
        {isAuthenticated ? (
          <>
            {userLogged?.name && (
              <MenuItem isDisabled>
                <Text fontSize="sm" color="gray.500">
                  {userLogged.name} {userLogged.lastname}
                </Text>
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLogin}>Iniciar sesión</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuUser;
