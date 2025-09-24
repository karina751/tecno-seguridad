// src/components/Hero.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

function Hero() {
  return (
    <div className="bg-light p-5 mb-4 rounded-3 text-center">
      <Container fluid>
        <h1 className="display-5 fw-bold">Bienvenido a TecnoSeguridad</h1>
        <p className="col-md-8 fs-4 mx-auto">
          Tu solución en productos de informática y seguridad en Salta Capital.
        </p>
      </Container>
    </div>
  );
}

export default Hero;