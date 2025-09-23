// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../api/firebase';
import ProductCard from '../components/ProductCard';
import camarasImg from '../assets/dahua.jpg';
import pcImg from '../assets/servis pc.jpg';
import ventaProductosImg from '../assets/logo_venta_equipos1.jpg';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProductosDestacados = async () => {
      const db = getFirestore(app);
      const productosRef = collection(db, "productos");
      const q = query(productosRef, where("destacado", "==", true));

      try {
        const querySnapshot = await getDocs(q);
        const productosList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(productosList);
      } catch (err) {
        console.error("Error al cargar los productos destacados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductosDestacados();
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
              <Card.Img variant="top" src={camarasImg} />
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
              <Card.Img variant="top" src={ventaProductosImg} />
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
              <Card.Img variant="top" src={pcImg} />
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

      {/* Productos Destacados de la Base de Datos */}
      <div className="text-center my-5">
        <h2>Productos Destacados</h2>
        {currentUser && (
          <div className="text-center mb-4">
            <Button as={Link} to="/crear-producto" variant="success">
              Crear Nuevo Producto
            </Button>
          </div>
        )}
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
            <Alert variant="info" className="text-center">No hay productos destacados. Inicia sesión y agrega algunos.</Alert>
          )}
        </Row>
      </div>
    </Container>
  );
}

export default HomePage;