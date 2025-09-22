import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * @description Componente para mostrar el detalle de un producto específico.
 */
function DetalleProductoPage() {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Detalle del Producto</h1>
          <p>Aquí se mostrarán los detalles de un producto específico.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProductoPage;