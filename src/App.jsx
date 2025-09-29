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
import CartPage from './pages/CartPage'; 
import CheckoutPage from './pages/CheckoutPage'; 
import OrderConfirmationPage from './pages/OrderConfirmationPage'; 
import ServiciosPage from './pages/ServiciosPage'; 
import ContactPage from './pages/ContactPage';
import { AuthProvider } from './context/AuthContext'; 
import { CartProvider } from './context/CartContext'; 

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/productos/:id" element={<ProductoDetallePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="/servicios" element={<ServiciosPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            
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
      </CartProvider>
    </AuthProvider>
  );
}

export default App;