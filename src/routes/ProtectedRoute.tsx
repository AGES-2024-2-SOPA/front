import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const userRole = getUserRole(); 

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

// TODO: Implementar uma forma de obter o papel do usuário
// Exemplo de função auxiliar para obter o papel do usuário a partir do localStorage
const getUserRole = () => {
  return localStorage.getItem('userRole') || 'guest'; 
};

export default ProtectedRoute;
