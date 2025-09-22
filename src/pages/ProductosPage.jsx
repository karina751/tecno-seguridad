// src/pages/ProductosPage.jsx

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

/**
 * @description Componente de página para mostrar la lista de productos.
 * Obtiene los datos de Firestore y los renderiza en tarjetas de Bootstrap.
 */
function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getProductos = async () => {
    try {
      const productosCollection = collection(db, 'productos');
      const productosSnapshot = await getDocs(productosCollection);
      const productosList = productosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(productosList);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      setError("Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editar-producto/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "productos", id));
        // Actualiza el estado local para reflejar la eliminación.
        setProductos(productos.filter(producto => producto.id !== id));
      } catch (err) {
        console.error("Error al eliminar el producto:", err);
        alert("Hubo un error al eliminar el producto.");
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <p>Cargando productos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  if (productos.length === 0) {
    return (
      <Container className="text-center my-5">
        <p>No hay productos disponibles.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Nuestros Productos</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {productos.map(producto => (
          <Col key={producto.id}>
            <Card className="h-100">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {producto.descripcion}
                </Card.Text>
                <Card.Text>
                  <strong>Precio:</strong> ${producto.precio}
                </Card.Text>
                <Card.Text>
                  <strong>Stock:</strong> {producto.stock} unidades
                </Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                  <Button variant="warning" onClick={() => handleEdit(producto.id)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(producto.id)}>
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductosPage;