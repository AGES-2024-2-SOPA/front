import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const userRole = getUserRole(); 
  console.log('User Role:', userRole);
  console.log('Allowed Roles:', allowedRoles);

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

const getUserRole = () => {
  return localStorage.getItem('userRole') || 'guest'; 
};

export default ProtectedRoute;
