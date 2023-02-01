import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  const { user } = useSelector((state: any) => state.auth);

  if (!user)
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{ from: { pathname: location.pathname } }}
      />
    );

  return <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoute;
