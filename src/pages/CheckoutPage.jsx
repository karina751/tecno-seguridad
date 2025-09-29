import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "El nombre es obligatorio.";
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El formato del correo no es válido.";
    }
    if (!formData.address) newErrors.address = "La dirección es obligatoria.";
    if (!formData.phone) newErrors.phone = "El teléfono es obligatorio.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    if (cart.length === 0) {
      alert("El carrito está vacío. No se puede procesar el pedido.");
      setLoading(false);
      return;
    }

    const order = {
      buyer: formData,
      items: cart,
      total: cartTotal,
      date: serverTimestamp(),
    };

    const db = getFirestore(app);
    const ordersCollection = collection(db, "orders");

    try {
      const docRef = await addDoc(ordersCollection, order);
      clearCart();
      navigate(`/order-confirmation/${docRef.id}`); 
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Hubo un error al procesar tu pedido. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-4">
            <h2 className="text-center mb-4">Información de Envío</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ingresa tu nombre" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Ingresa tu email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Dirección</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ingresa tu dirección de envío" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control 
                  type="tel" 
                  placeholder="Ingresa tu número de teléfono" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  required 
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
              
              <Button variant="success" type="submit" className="w-100" disabled={loading}>
                {loading ? 'Procesando...' : `Confirmar Pedido ($${cartTotal.toFixed(2)})`}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;