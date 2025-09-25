import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import {
  Container,
  Card,
  Alert,
  Spinner,
  ListGroup,
  Table,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { app } from '../api/firebase';

function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        setError("ID de pedido no proporcionado.");
        return;
      }
      const db = getFirestore(app);
      const orderDocRef = doc(db, 'orders', orderId);
      try {
        const docSnap = await getDoc(orderDocRef);
        if (docSnap.exists()) {
          setOrder({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Pedido no encontrado.");
        }
      } catch (err) {
        console.error("Error al obtener el pedido:", err);
        setError("Hubo un problema al cargar los detalles de tu pedido.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  // Función para generar el mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    if (!order) return '';
    
    // Extrae la información del comprador y los productos
    const { buyer, items, total } = order;
    
    // Crea el encabezado del mensaje
    let message = `¡Hola TecnoSeguridad! Acabo de realizar un pedido.\n`;
    message += `*ID del pedido:* ${order.id}\n`;
    message += `*Nombre:* ${buyer.name}\n`;
    message += `*Email:* ${buyer.email}\n`;
    message += `*Teléfono:* ${buyer.phone}\n`;
    message += `*Dirección:* ${buyer.address}\n\n`;
    
    // Lista los productos
    message += `*Productos:*\n`;
    items.forEach((item) => {
      message += `• ${item.nombre} (x${item.quantity}) - $${(item.precio * item.quantity).toFixed(2)}\n`;
    });
    
    // Añade el total
    message += `\n*Total del Pedido:* $${total.toFixed(2)}`;
    
    // Codifica el mensaje para la URL
    return encodeURIComponent(message);
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando pedido...</span>
        </Spinner>
        <p className="mt-2">Cargando los detalles de tu pedido...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">{error}</Alert>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="warning">No se pudo encontrar el pedido. Por favor, revisa el ID.</Alert>
      </Container>
    );
  }

  // Define el número de WhatsApp aquí
  const numeroWhatsApp = '3875222620'; // Usé el número que me pasaste en el footer
  const mensajeWhatsApp = generateWhatsAppMessage();
  const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeWhatsApp}`;

  return (
    <Container className="my-5">
      <Card className="shadow-sm p-4">
        <h2 className="text-center mb-4 text-success">¡Pedido Realizado con Éxito!</h2>
        <Alert variant="success" className="text-center">
          <h4 className="alert-heading">Gracias por tu compra.</h4>
          <p>Tu pedido ha sido procesado correctamente .</p>
        </Alert>

        <div className="text-center my-4">
          <h5>ID de Pedido: <span className="fw-bold">{order.id}</span></h5>
        </div>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Card.Title>Datos del Comprador</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Nombre:</strong> {order.buyer.name}</ListGroup.Item>
                  <ListGroup.Item><strong>Email:</strong> {order.buyer.email}</ListGroup.Item>
                  <ListGroup.Item><strong>Teléfono:</strong> {order.buyer.phone}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Card.Title>Detalles del Envío</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Dirección:</strong> {order.buyer.address}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm">
          <Card.Body>
            <Card.Title>Productos del Pedido</Card.Title>
            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.quantity}</td>
                    <td>${item.precio.toFixed(2)}</td>
                    <td>${(item.precio * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h4 className="text-end mt-3">Total: <span className="text-success fw-bold">${order.total.toFixed(2)}</span></h4>
          </Card.Body>
        </Card>

        <div className="text-center mt-4">
          <Button variant="success" href={linkWhatsApp} target="_blank" rel="noopener noreferrer">
            Enviar Detalles por WhatsApp
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default OrderConfirmationPage;