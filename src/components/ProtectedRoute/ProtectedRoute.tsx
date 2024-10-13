import { FC, useState } from 'react';
import { Navigate, } from 'react-router-dom';
import { ProtectedRouteProps } from './interfaces';
import { Sidebar } from '../Sidebar/Sidebar';
import { Box, Button } from '@chakra-ui/react';
import { useSessionStore } from '../../store/session/slice';
import { SessionAction } from '../../store/session/actions';

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
}) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const userIsAuthenticated = useSessionStore(state => state.isAuthenticated);
  const {logout} = SessionAction()


  if (!userIsAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>
    <Box
      as="main"
      flex="1"
      ml={isSidebarExpanded ? "250px" : "70px"} // Ajustamos el margen izquierdo dinámicamente
      p={4}
      transition="margin-left 0.3s ease"
      padding={0}
      minHeight="100vh"  // Ocupa todo el alto de la ventana

    >
      <Button onClick={logout}> LOGOUT</Button>
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      {children}
      {/* <Button onClick={logout}>Logout</Button> */}
    </Box>

  </>;
};

export default ProtectedRoute;
