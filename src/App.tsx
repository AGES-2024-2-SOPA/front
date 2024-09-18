import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { FormDataProvider } from './contexts/FormDataContext';

const App = () => {
  return (
    <FormDataProvider>
      <Router>
        <AppRoutes />
      </Router>
    </FormDataProvider>
  );
};

export default App;