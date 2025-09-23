// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../api/firebase';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      const db = getFirestore(app);
      const productosCollection = collection(db, "productos");
      const productosSnapshot = await getDocs(productosCollection);
      const productosList = productosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(productosList.slice(0, 3)); // Muestra los 3 primeros productos
      setLoading(false);
    };

    fetchProductos();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Bienvenido a TecnoSeguridad</h1>
      <p className="lead text-center">Tu solución en productos de informática y seguridad en Salta Capital.</p>

      {/* Sección de Presentación de Servicios */}
      <div className="text-center my-5">
        <h2>Nuestros Servicios</h2>
        <Row xs={1} md={3} className="g-4">
          <Col>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/400x200?text=Instalación+de+Cámaras" />
              <Card.Body>
                <Card.Title>Instalación de Cámaras de Seguridad</Card.Title>
                <Card.Text>
                  Sistemas de vigilancia de alta tecnología para proteger tu hogar o negocio.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/400x200?text=Venta+de+Productos" />
              <Card.Body>
                <Card.Title>Venta de Productos Tecnológicos</Card.Title>
                <Card.Text>
                  Encuentra notebooks, componentes y accesorios de las mejores marcas.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/400x200?text=Reparación+de+PC" />
              <Card.Body>
                <Card.Title>Reparación y Mantenimiento de PC</Card.Title>
                <Card.Text>
                  Servicio técnico profesional para que tus equipos funcionen como nuevos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Carrusel de Productos de la Base de Datos */}
      <div className="text-center my-5">
        <h2>Productos Destacados</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {loading ? (
            <div>Cargando productos...</div>
          ) : productos.length > 0 ? (
            productos.map(producto => (
              <Col key={producto.id}>
                <ProductCard producto={producto} />
              </Col>
            ))
          ) : (
            <div>No hay productos disponibles.</div>
          )}
        </Row>
      </div>
    </Container>
  );
}

export default HomePage;