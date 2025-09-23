// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductosPage from './pages/ProductosPage';
import FormularioPage from './pages/FormularioPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import ProductoDetallePage from './pages/ProductoDetallePage';

function App() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/productos/:id" element={<ProductoDetallePage />} />
          
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
      </main>
      <Footer />
    </>
  );
}

export default App;