// src/pages/FormularioPage.jsx

import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../api/firebase';

/**
 * @description Componente de página para el formulario de productos.
 * Permite al usuario crear un nuevo producto o editar uno existente.
 */
function FormularioPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Hook para obtener el ID de la URL

  // useEffect para cargar los datos del producto si se está editando
  useEffect(() => {
    if (id) {
      const getProductById = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, 'productos', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFormData(docSnap.data());
          } else {
            setError("No se encontró el producto.");
          }
        } catch (err) {
          console.error("Error al obtener el producto:", err);
          setError("Error al cargar los datos del producto.");
        } finally {
          setLoading(false);
        }
      };
      getProductById();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.nombre || !formData.descripcion || !formData.precio || !formData.stock) {
      setError('Por favor, completa todos los campos.');
      setLoading(false);
      return;
    }

    try {
      const productData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock, 10),
      };

      if (id) {
        // Actualizar un producto existente
        const docRef = doc(db, 'productos', id);
        await updateDoc(docRef, productData);
        setSuccess('Producto actualizado con éxito.');
      } else {
        // Crear un nuevo producto
        const productosRef = collection(db, 'productos');
        await addDoc(productosRef, { ...productData, creadoEn: new Date() });
        setSuccess('Producto creado con éxito.');
      }

      setTimeout(() => {
        navigate('/productos');
      }, 2000);
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      setError('Error al guardar el producto. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const formTitle = id ? "Editar Producto" : "Crear Nuevo Producto";
  const buttonText = id ? "Actualizar Producto" : "Crear Producto";

  if (loading) {
    return (
      <Container className="text-center my-5">
        <p>Cargando formulario...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">{formTitle}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
              {buttonText}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormularioPage;