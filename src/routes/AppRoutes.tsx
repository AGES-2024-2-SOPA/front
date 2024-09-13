import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProtectedRoute from './ProtectedRoute';
import ProtectedPage from '../pages/ProtectedExample';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';
import Layout from '../layouts/Layout';
import CadastroVendedor from '../pages/cadastroFerroVelho/cadastroFerroVelhos'; 
import CadastroRepresentante from '../pages/cadastroVendedor/cadastroVendedor';


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ProtectedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cadastro-vendedor"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CadastroVendedor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cadastro-representante"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CadastroRepresentante />
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
