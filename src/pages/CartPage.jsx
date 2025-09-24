// src/pages/CartPage.jsx

import React from 'react';
import { Container, Row, Col, Button, Card, ListGroup, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Tu Carrito de Compras</h1>

      {cart.length === 0 ? (
        <Alert variant="info" className="text-center">
          Tu carrito está vacío. <Link to="/productos">Explora nuestros productos</Link> para agregar algo.
        </Alert>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cart.map(item => (
                <ListGroup.Item key={item.id} className="d-flex align-items-center mb-3 p-3 border rounded shadow-sm">
                  <div style={{ flex: '0 0 100px', marginRight: '1rem' }}>
                    <img 
                      src={item.imagenUrl || 'https://via.placeholder.com/100'} 
                      alt={item.nombre} 
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="mb-0">{item.nombre}</h4>
                    <p className="mb-1 text-muted">
                      <small>Precio: ${item.precio}</small>
                    </p>
                    <div className="d-flex align-items-center mt-2">
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-2 fw-bold">{item.quantity}</span>
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="mb-0 fw-bold">${item.precio * item.quantity}</p>
                    <Button 
                      variant="danger" 
                      className="ms-3 mt-2" 
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title className="text-center">Resumen del Pedido</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Total:</span> 
                    <span className="fw-bold fs-4 text-success">${cartTotal.toFixed(2)}</span>
                  </ListGroup.Item>
                </ListGroup>
                <Button variant="success" className="w-100 mt-3" as={Link} to="/checkout">
                  Proceder al Pago
                </Button>
                <Button variant="outline-danger" className="w-100 mt-2" onClick={clearCart}>
                  Vaciar Carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default CartPage;