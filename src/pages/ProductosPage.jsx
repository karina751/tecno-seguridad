// src/pages/ProductosPage.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // <-- Importa este hook
import { Container, Row, Col, Spinner, Alert, Form } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { app } from '../api/firebase';

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(); // <-- Obtén los parámetros de la URL
  const searchTerm = searchParams.get('search') || ''; // <-- Lee el término de búsqueda
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    const fetchProductos = async () => {
      const db = getFirestore(app);
      const productosCollection = collection(db, "productos");
      const productosSnapshot = await getDocs(productosCollection);
      const productosList = productosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(productosList);
      setLoading(false);
    };
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    const db = getFirestore(app);
    await deleteDoc(doc(db, "productos", id));
    setProductos(productos.filter(producto => producto.id !== id));
  };

  const handleFeature = async (id, isFeatured) => {
    const db = getFirestore(app);
    const productoRef = doc(db, "productos", id);
    await updateDoc(productoRef, { destacado: !isFeatured });
    setProductos(productos.map(p => p.id === id ? { ...p, destacado: !isFeatured } : p));
  };

  const categories = ['Todos', ...new Set(productos.map(p => p.categoria))];

  // Lógica combinada para buscar y filtrar
  const filteredProducts = productos.filter(producto => {
    const matchesSearchTerm = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || producto.categoria === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Cargando productos...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Nuestros Productos</h1>
      
      {/* Barra de Búsqueda y Filtro */}
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row className="mb-4 justify-content-center">
          <Col md={6}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar productos por nombre..."
                value={searchTerm} // <-- Usa el valor de la URL
                onChange={(e) => {
                  // Actualiza la URL para reflejar la búsqueda
                  setSearchParams({ search: e.target.value });
                }}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {filteredProducts.length === 0 ? (
        <Alert variant="warning" className="text-center">
          No se encontraron productos que coincidan con la búsqueda o filtro.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={4} className="g-4">
          {filteredProducts.map(producto => (
            <Col key={producto.id}>
              <ProductCard 
                producto={producto} 
                onDelete={handleDelete}
                onFeature={handleFeature}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ProductosPage;