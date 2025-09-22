import React from 'react';
import { Container } from 'react-bootstrap';

/**
 * Componente de la página de inicio.
 * Muestra una introducción a la empresa TecnoSeguridad.
 */
function HomePage() {
  return (
    <Container className="my-5 text-center">
      <h1>Bienvenido a TecnoSeguridad</h1>
      <p className="lead">Tu solución en productos de informática y seguridad en Salta Capital.</p>
    </Container>
  );
}

export default HomePage;