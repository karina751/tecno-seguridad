import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto, onDelete, currentUser }) => {
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
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="primary" as={Link} to={`/productos/${producto.id}`}>
              Ver Detalles
            </Button>
            {/* Solo mostramos los botones si hay un usuario logueado */}
            {currentUser && (
              <div className="d-flex">
                <Button 
                  as={Link} 
                  to={`/editar-producto/${producto.id}`} 
                  variant="warning" 
                  className="ms-2"
                >
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => onDelete(producto.id)} 
                  className="ms-2"
                >
                  Eliminar
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;