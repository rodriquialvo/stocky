import { FC, useState } from 'react';
import { Navigate, } from 'react-router-dom';
import { ProtectedRouteProps } from './interfaces';
import { Sidebar } from '../Sidebar/Sidebar';
import { Box, Button, IconButton, useMediaQuery } from '@chakra-ui/react';
import { useSessionStore } from '../../store/session/slice';
import { SessionAction } from '../../store/session/actions';
import { HamburgerIcon } from '@chakra-ui/icons';

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
}) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const userIsAuthenticated = useSessionStore(state => state.isAuthenticated);
  const { logout } = SessionAction()
  const [isMobile] = useMediaQuery("(max-width: 768px)");


  if (!userIsAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>
    <Box
      as="main"
      flex="1"
      ml={isSidebarExpanded ? "250px" : (isMobile ? 0 : "70px")} // Ajustamos el margen izquierdo dinámicamente
      p={4}
      transition="margin-left 0.3s ease"
      padding={0}
      minHeight="100vh"  // Ocupa todo el alto de la ventana
      display={"flex"}
      flexDirection={"column"}
    >
      <Button onClick={logout}> LOGOUT</Button>

      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      {children}
      {
        isMobile && (
          <Box position="fixed" bottom="20px" right="20px" zIndex="1000">
            <IconButton
              aria-label="Toggle expand sidebar"
              icon={<HamburgerIcon />}
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              variant="outline"
              size="lg"
              color="white"
              bg="gray.800"
              _hover={{ bg: "gray.700" }}
            />
          </Box>
        )
      }
    </Box>

  </>;
};

export default ProtectedRoute;
