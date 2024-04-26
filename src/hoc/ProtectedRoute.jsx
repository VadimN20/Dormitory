import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    // token is null
    return <Navigate to="/authorization" />;
  }
  return children;
};
