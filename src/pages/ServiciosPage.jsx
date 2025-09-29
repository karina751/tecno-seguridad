// src/pages/ServiciosPage.jsx

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaVideo, FaShieldAlt, FaLock, FaWifi, FaLaptopCode, FaBug, FaCamera } from 'react-icons/fa'; 

function ServiciosPage() {
  const servicios = [
    {
      titulo: "Instalación de Cámaras de Seguridad",
      descripcion: "Ofrecemos sistemas de vigilancia de alta definición para el monitoreo de hogares y negocios, con acceso remoto desde cualquier dispositivo.",
      icono: <FaVideo size={50} className="text-primary mb-3" />
    },
    {
      titulo: "Alarmas y Monitoreo 24/7",
      descripcion: "Protege tu propiedad con nuestros sistemas de alarma avanzados, con monitoreo constante y respuesta inmediata ante cualquier evento.",
      icono: <FaShieldAlt size={50} className="text-primary mb-3" />
    },
    {
      titulo: "Sistemas de Control de Acceso",
      descripcion: "Gestiona quién entra y sale de tu propiedad con soluciones de control de acceso biométricas, con tarjetas o códigos de seguridad.",
      icono: <FaLock size={50} className="text-primary mb-3" />
    },
    {
      titulo: "Seguridad para Redes Inalámbricas",
      descripcion: "Protegemos tus redes Wi-Fi y dispositivos conectados contra intrusiones, garantizando la confidencialidad de tu información.",
      icono: <FaWifi size={50} className="text-primary mb-3" />
    },
    {
      titulo: "Instalación de S.O. y Programas",
      descripcion: "Instalamos sistemas operativos (Windows, Linux, macOS) y programas esenciales para optimizar el rendimiento de tu equipo.",
      icono: <FaLaptopCode size={50} className="text-primary mb-3" />
    },
    {
      titulo: "Desinfección y Corrección de Sistema",
      descripcion: "Eliminamos virus y malware, corregimos errores del sistema y optimizamos tu PC para que funcione de manera segura y rápida.",
      icono: <FaBug size={50} className="text-primary mb-3" />
    },
    {
      titulo: "Configuración de Cámaras",
      descripcion: "Configuramos cámaras de seguridad existentes y las integramos a redes, móviles y sistemas de monitoreo para un acceso sencillo.",
      icono: <FaCamera size={50} className="text-primary mb-3" />
    }
  ];

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Nuestros Servicios</h1>
      <p className="text-center mb-5 lead text-muted">
        En TecnoSeguridad, nos especializamos en ofrecer soluciones integrales para proteger lo que más te importa.
      </p>
      <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
        {servicios.map((servicio, index) => (
          <Col key={index}>
            <Card className="h-100 text-center p-3 shadow-sm border-0">
              <Card.Body>
                {servicio.icono}
                <Card.Title className="fw-bold">{servicio.titulo}</Card.Title>
                <Card.Text>{servicio.descripcion}</Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-0">
                <Button variant="outline-primary" as={Link} to="/contacto">
                  Más Información
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ServiciosPage;
