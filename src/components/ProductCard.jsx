// src/components/ProductCard.jsx

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => {
  // Verificamos si producto y sus propiedades existen para evitar errores
  const nombre = producto?.nombre || "Sin nombre";
  const descripcion = producto?.descripcion || "Sin descripción.";
  const precio = producto?.precio !== undefined ? `$${producto.precio}` : "Precio no disponible";
  const imagenUrl = producto?.imagenUrl || "https://via.placeholder.com/400x200?text=No+Image";

  return (
    <Card className="h-100 shadow-sm rounded">
      <Card.Img 
        variant="top" 
        src={imagenUrl} 
        alt={nombre} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>
          {descripcion.substring(0, 100)}...
        </Card.Text>
        <div className="mt-auto">
          <Card.Text>
            <strong>{precio}</strong>
          </Card.Text>
          <Button variant="primary" as={Link} to={`/productos/${producto.id}`}>
            Ver Detalles
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;