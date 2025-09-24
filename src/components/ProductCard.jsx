// src/components/ProductCard.jsx

import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaRegStar, FaStar } from 'react-icons/fa';

function ProductCard({ producto, onDelete, onFeature }) {
  const { currentUser } = useContext(AuthContext);
  const { addToCart } = useCart();
  const esDestacado = producto.destacado;

  return (
    <Card className="h-100 shadow-sm position-relative"> {/* Añadido position-relative */}
      
      {/* Ícono de estrella para destacar - Posicionado arriba a la derecha */}
      {currentUser && (
        <span
          onClick={() => onFeature(producto.id, esDestacado)}
          style={{ 
            cursor: 'pointer', 
            color: '#ffc107', 
            fontSize: '1.8rem', // Tamaño ligeramente más grande para la estrella
            position: 'absolute', // Posición absoluta
            top: '10px',        // 10px desde arriba
            right: '10px',      // 10px desde la derecha
            zIndex: 1          // Para asegurar que esté por encima de la imagen
          }}
          className="bg-white rounded-circle p-1 shadow-sm" // Fondo blanco y sombra para resaltar
        >
          {esDestacado ? <FaStar /> : <FaRegStar />}
        </span>
      )}

      <Card.Img variant="top" src={producto.imagenUrl} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold text-center mb-2">{producto.nombre}</Card.Title>
        <Card.Text className="text-center text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
          Categoría: {producto.categoria}
        </Card.Text>
        <Card.Text className="text-center fs-4 fw-bold text-success mt-auto mb-3">
          ${producto.precio.toFixed(2)}
        </Card.Text>
        
        {/* Botones de acción principales */}
        <div className="d-flex justify-content-center mt-auto">
          <Button variant="outline-primary" as={Link} to={`/productos/${producto.id}`} className="flex-fill me-2">
            Ver más
          </Button>
          <Button variant="success" onClick={() => addToCart(producto)} className="flex-fill">
            Agregar
          </Button>
        </div>

        {/* Opciones de administrador - Solo para usuarios autenticados */}
        {currentUser && (
          <div className="mt-3 d-flex justify-content-between">
            <Button variant="warning" size="sm" as={Link} to={`/editar-producto/${producto.id}`} className="flex-fill me-2">
              Editar
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(producto.id)} className="flex-fill">
              Eliminar
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;