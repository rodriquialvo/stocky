import { FC } from 'react';
import { Navigate, Route, } from 'react-router-dom';
import { ProtectedRouteProps } from './interfaces';

//REMOVE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; 
};

export default ProtectedRoute;
