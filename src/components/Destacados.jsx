// src/components/Destacados.jsx

import React from 'react';
import { Carousel, Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Destacados({ productos }) {
  if (productos.length === 0) {
    return null; // No renderizar si no hay productos
  }

  // Agrupar productos de a 3 para el carrusel
  const groupedProducts = [];
  for (let i = 0; i < productos.length; i += 3) {
    groupedProducts.push(productos.slice(i, i + 3));
  }

  return (
    <Container className="my-5">
      <Carousel>
        {groupedProducts.map((group, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center">
              {group.map(producto => (
                <Col key={producto.id} xs={12} md={4} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Img 
                      variant="top" 
                      src={producto.imagenUrl} 
                      style={{ height: '200px', objectFit: 'cover' }} 
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-bold text-center">{producto.nombre}</Card.Title>
                      <Card.Text className="text-center text-success fs-4 fw-bold">
                        ${producto.precio.toFixed(2)}
                      </Card.Text>
                      <div className="d-flex justify-content-center mt-auto">
                        <Button 
                          variant="outline-primary" 
                          as={Link} 
                          to={`/productos/${producto.id}`}
                          className="w-100"
                        >
                          Ver más
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default Destacados;