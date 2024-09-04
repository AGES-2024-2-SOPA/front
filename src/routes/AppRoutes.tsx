import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProtectedRoute from './ProtectedRoute';
import ProtectedPage from '../pages/ProtectedExample';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Exemplo de rota pública */}
      <Route path="/" element={<Home />} />

      {/* Exemplo de rota protegida para admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ProtectedPage />
          </ProtectedRoute>
        }
      />

      {/* Exemplo de rota catch all e não autorizada */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
