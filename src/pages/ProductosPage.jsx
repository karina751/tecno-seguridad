import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Componente de la página de productos.
 * Contenedor para el listado de productos.
 */
function ProductosPage() {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Nuestros Productos</h1>
          <p>Aquí se mostrará el listado de productos de informática.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductosPage;