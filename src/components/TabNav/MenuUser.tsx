import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import { useSessionStore } from '../../store/session/slice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';

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
        icon={<FiUser />}
        variant="ghost"
        color="#ec0868"
        _hover={{ bg: "pink.50" }}
      />
      <MenuList>
        {isAuthenticated ? (
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        ) : (
          <MenuItem onClick={handleLogin}>Iniciar sesión</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default MenuUser;
