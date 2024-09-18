import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import ProtectedPage from '../pages/ProtectedExample';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';
import Layout from '../layouts/Layout';
import CadastroFerrosVelhos from '../pages/cadastroFerroVelho/cadastroFerroVelhos';
import CadastroRepresentante from '../pages/cadastroRepresentante/cadastroRepresentante';


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Exemplo de rota pública */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ProtectedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cadastro-ferrovelho"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CadastroFerrosVelhos />
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
