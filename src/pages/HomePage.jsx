// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../api/firebase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Destacados from '../components/Destacados';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

// Importa las imágenes de los servicios
import camarasImg from '../assets/tecnologia seguridad.jpg';
import pcImg from '../assets/servis pc.jpg';
import ventaProductosImg from '../assets/logo_venta_equipos1.jpg';

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
    <>
      <Hero />
      <Container className="my-5">
              <div className="text-center my-5">
          <h2>Nuestros Servicios</h2><br />
          <Row xs={1} md={3} className="g-4">
            <Col>
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={camarasImg} 
                  style={{ height: '200px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>Instalación de Cámaras de Seguridad</Card.Title>
                  <Card.Text className="flex-grow-1">
                    Sistemas de vigilancia de alta tecnología para proteger tu hogar o negocio.
                  </Card.Text>
                  
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={ventaProductosImg} 
                  style={{ height: '200px', objectFit: 'contain', backgroundColor: '#f8f9fa' }} 
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>Venta de Productos Tecnológicos</Card.Title>
                  <Card.Text className="flex-grow-1">
                    Encuentra notebooks, componentes y accesorios de las mejores marcas.
                  </Card.Text>
                  
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={pcImg} 
                  style={{ height: '200px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>Reparación y Mantenimiento de PC</Card.Title>
                  <Card.Text className="flex-grow-1">
                    Servicio técnico profesional para que tus equipos funcionen como nuevos.
                  </Card.Text>
                  
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        
        <div className="text-center my-5">
          <h2>Productos Destacados</h2>
          {loading ? (
            <div className="text-center"><Spinner animation="border" /></div>
          ) : productos.length > 0 ? (
            <Destacados productos={productos} />
          ) : (
            <Alert variant="info" className="text-center">No hay productos destacados. Inicia sesión y agrega algunos.</Alert>
          )}
        </div>
      </Container>
    </>
  );
}

export default HomePage;