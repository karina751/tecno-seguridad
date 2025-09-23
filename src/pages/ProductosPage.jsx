import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../api/firebase';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth(); // Obtenemos la información del usuario actual

  useEffect(() => {
    const fetchProductos = async () => {
      const db = getFirestore(app);
      const productosCollection = collection(db, "productos");
      try {
        const productosSnapshot = await getDocs(productosCollection);
        const productosList = productosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(productosList);
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setError("No se pudieron cargar los productos. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        const db = getFirestore(app);
        await deleteDoc(doc(db, "productos", id));
        // Actualizamos el estado para remover el producto eliminado
        setProductos(productos.filter(p => p.id !== id));
        console.log("Producto eliminado con éxito");
      } catch (err) {
        console.error("Error al eliminar el producto:", err);
        setError("Error al eliminar el producto.");
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando productos...</div>;
  if (error) return <Alert variant="danger" className="text-center mt-5">{error}</Alert>;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Todos los Productos</h1>
      {currentUser && (
        <div className="text-center mb-4">
          <Button as={Link} to="/crear-producto" variant="success">
            Crear Nuevo Producto
          </Button>
        </div>
      )}
      <Row xs={1} md={2} lg={4} className="g-4">
        {productos.map(producto => (
          <Col key={producto.id}>
            <ProductCard 
              producto={producto} 
              onDelete={handleDelete}
              currentUser={currentUser} // Pasamos la información del usuario a la tarjeta
            />
          </Col>
        ))}
      </Row>
      {productos.length === 0 && <div className="text-center mt-5">No hay productos disponibles.</div>}
    </Container>
  );
}

export default ProductosPage;