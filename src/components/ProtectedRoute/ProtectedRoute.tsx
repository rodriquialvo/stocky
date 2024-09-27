import { FC, useState } from 'react';
import { Navigate, Route, } from 'react-router-dom';
import { ProtectedRouteProps } from './interfaces';
import { Sidebar } from '../Sidebar/Sidebar';
import { Box, Button } from '@chakra-ui/react';
import { useLocalSession } from '../../tools/session/session.hooks';
import { SessionAction } from '../../store/session/actions';
import { useSessionStore } from '../../store/session/slice';

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
}) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const userIsAuthenticated = useSessionStore(state => state.isAuthenticated);
  const { logout } = SessionAction()
  if (!userIsAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>
    <Box
      as="main"
      flex="1"
      ml={isSidebarExpanded ? "250px" : "70px"} // Ajustamos el margen izquierdo dinámicamente
      p={4}
      transition="margin-left 0.3s ease"
      padding={0}
    >
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      {/* <Button onClick={logout}>Logout</Button> */}
      {children}
    </Box>

  </>;
};

export default ProtectedRoute;
