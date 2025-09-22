// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { Container } from 'react-bootstrap';

// Páginas
import HomePage from './pages/HomePage.jsx';
import ProductosPage from './pages/ProductosPage.jsx';
import ServiciosPage from './pages/ServiciosPage.jsx';
import DetalleProductoPage from './pages/DetalleProductoPage.jsx';
import FormularioPage from './pages/FormularioPage.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main className="contenido-principal">
          <Container fluid className="p-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route path="/servicios" element={<ServiciosPage />} />
              <Route path="/producto/:id" element={<DetalleProductoPage />} />
              <Route path="/crear-producto" element={<FormularioPage />} />
              <Route path="/editar-producto/:id" element={<FormularioPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;