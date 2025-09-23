import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { app } from '../api/firebase';

function ProductoDetallePage() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      const db = getFirestore(app);
      const productoDocRef = doc(db, 'productos', id);
      try {
        const docSnap = await getDoc(productoDocRef);
        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Producto no encontrado.");
        }
      } catch (err) {
        console.error("Error al obtener el documento:", err);
        setError("Error al cargar los detalles del producto.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Cargando detalles del producto...</div>;
  if (error) return <Alert variant="danger" className="text-center mt-5">{error}</Alert>;
  if (!producto) return <div className="text-center mt-5">Producto no encontrado.</div>;

  return (
    <Container className="my-5">
      <Card>
        <Row noGutters>
          <Col md={4}>
            <Card.Img 
              src={producto.imagenUrl || "https://via.placeholder.com/400x400?text=No+Image"} 
              alt={producto.nombre} 
              style={{ objectFit: 'cover', height: '100%' }}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title as="h1">{producto.nombre}</Card.Title>
              <Card.Text>
                <strong>Precio:</strong> ${producto.precio}
              </Card.Text>
              <hr />
              <Card.Text>
                {producto.descripcion}
              </Card.Text>
              <hr />
              <div className="d-flex justify-content-between">
                <Button variant="success">
                  Agregar al Carrito
                </Button>
                <Button variant="secondary" as={Link} to="/productos">
                  Volver a Productos
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default ProductoDetallePage;