import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProtectedRoute from './ProtectedRoute';
import ProtectedPage from '../pages/ProtectedExample';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';
import Layout from '../layouts/Layout';
import CadastroVendedor from '../pages/cadastroFerroVelho/cadastroFerroVelhos'; // Importando a página de cadastro

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
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

        {/* Rota protegida para cadastro de ferro-velho */}
        <Route
          path="/cadastro-vendedor"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CadastroVendedor />
            </ProtectedRoute>
          }
        />

        {/* Exemplo de rota catch all e não autorizada */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
