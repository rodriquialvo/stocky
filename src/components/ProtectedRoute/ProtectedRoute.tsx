import { FC, useState } from 'react';
import { Navigate, } from 'react-router-dom';
import { ProtectedRouteProps } from './interfaces';
import { Sidebar } from '../Sidebar/Sidebar';
import { Box, Button, IconButton, useMediaQuery } from '@chakra-ui/react';
import { useSessionStore } from '../../store/session/slice';
import { SessionAction } from '../../store/session/actions';
import { HamburgerIcon } from '@chakra-ui/icons';
import NavigationBar from '../TabNav/NavigationBar';

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
}) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const userIsAuthenticated = useSessionStore(state => state.isAuthenticated);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const isAdminUser = useSessionStore(state => state.isAdminUser);

  // if (!userIsAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }
  return <>
    <Box
      as="main"
      flex="1"
      p={4}
      transition="margin-left 0.3s ease"
      padding={0}
      minHeight="100vh"  // Ocupa todo el alto de la ventana
      display={"flex"}
      flexDirection={"column"}
      bg={"gray.50"}
    >
      {/* <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} /> */}
      <NavigationBar/>
      {children}
    </Box>

  </>;
};

export default ProtectedRoute;
