import React, { useContext, ReactNode } from "react";
import { AuthContext } from "../../auth/context/auth-context";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { authState } = useContext(AuthContext);

  return authState.logged ? <>{children}</> : <Navigate to="/login" />;
};
