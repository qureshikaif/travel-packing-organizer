import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
