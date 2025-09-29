// src/pages/ContactPage.jsx

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useForm, ValidationError } from '@formspree/react';
import { Link } from 'react-router-dom'; 

function ContactPage() {
  const [state, handleSubmit] = useForm("xwprkggb");
  const [showSuccess, setShowSuccess] = useState(false);

  // Manejar el envío exitoso
  if (state.succeeded && !showSuccess) {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-4">
            <h2 className="text-center mb-4">Contáctanos</h2>
            <p className="text-center mb-4 text-muted">
              ¿Tienes alguna pregunta, sugerencia o necesitas una cotización? Envíanos tu consulta.
            </p>
            {showSuccess && (
              <Alert variant="success" className="text-center">
                ¡Gracias por tu mensaje! Pronto nos pondremos en contacto contigo.
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control type="text" name="name" required />
                <ValidationError 
                  prefix="Name" 
                  field="name"
                  errors={state.errors}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" name="email" required />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="tel" name="phone" />
                <ValidationError 
                  prefix="Phone" 
                  field="phone"
                  errors={state.errors}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formMessage">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} name="message" required />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100" 
                disabled={state.submitting}
              >
                {state.submitting ? 'Enviando...' : 'Enviar Mensaje'}
              </Button>
            </Form>

            <div className="text-center mt-3">
                <Button variant="outline-secondary" as={Link} to="/">
                    Volver al Inicio
                </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactPage;