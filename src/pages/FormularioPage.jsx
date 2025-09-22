import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Componente del formulario para crear o editar productos.
 */
function FormularioPage() {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Formulario de Producto</h1>
          <p>Aquí se creará o editará un producto.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default FormularioPage;