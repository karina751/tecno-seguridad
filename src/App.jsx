import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import FormularioPage from './pages/FormularioPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rutas Protegidas */}
        <Route 
          path="/crear-producto" 
          element={
            <PrivateRoute>
              <FormularioPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/editar-producto/:id" 
          element={
            <PrivateRoute>
              <FormularioPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;