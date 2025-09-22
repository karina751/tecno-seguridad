import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Componente de la página de servicios.
 * Detalla los servicios ofrecidos por la empresa.
 */
function ServiciosPage() {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Nuestros Servicios</h1>
          <p>Ofrecemos reparación de equipos e instalación de cámaras de seguridad.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ServiciosPage;