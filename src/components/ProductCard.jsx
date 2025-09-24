import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // <-- Importamos el hook del carrito

const ProductCard = ({ producto, onDelete, onFeature }) => {
  const { currentUser } = useAuth();
  const { addToCart } = useCart(); // <-- Obtenemos la función para agregar al carrito
  
  const nombre = producto?.nombre || "Sin nombre";
  const descripcion = producto?.descripcion || "Sin descripción.";
  const precio = producto?.precio !== undefined ? `$${producto.precio}` : "Precio no disponible";
  const imagenUrl = producto?.imagenUrl || "https://via.placeholder.com/400x200?text=No+Image";
  const isFeatured = producto?.destacado || false;

  const handleAddToCart = () => {
    // <-- ¡Aquí está el cambio clave!
    addToCart(producto);
    alert(`Producto "${nombre}" agregado al carrito!`);
  };

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
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Button variant="primary" as={Link} to={`/productos/${producto.id}`}>
              Ver Detalles
            </Button>
            <Button variant="success" onClick={handleAddToCart}>
              Agregar al Carrito
            </Button>
          </div>
          {currentUser && (
            <div className="d-flex justify-content-center mt-2">
              <Button 
                as={Link} 
                to={`/editar-producto/${producto.id}`} 
                variant="warning" 
                className="mx-1"
              >
                Editar
              </Button>
              <Button 
                variant="danger" 
                onClick={() => onDelete(producto.id)} 
                className="mx-1"
              >
                Eliminar
              </Button>
              <Button
                variant={isFeatured ? "info" : "outline-info"}
                onClick={() => onFeature(producto.id, isFeatured)}
                className="mx-1"
                style={{ minWidth: '130px' }}
              >
                {isFeatured ? "Quitar Destacado" : "Destacar"}
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;