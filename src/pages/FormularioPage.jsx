import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app } from '../api/firebase';
import { useParams, useNavigate } from 'react-router-dom';

// ESQUEMA DE VALIDACIÓN CON YUP (Ajustado para URL de imagen)
const schema = yup.object().shape({
nombre: yup.string().required('El nombre es obligatorio'),
descripcion: yup.string().required('La descripción es obligatoria'),
precio: yup.number()
.typeError('El precio debe ser un número')
.required('El precio es obligatorio')
.positive('El precio debe ser un número positivo'),
stock: yup.number()
.typeError('El stock debe ser un número entero')
.required('El stock inicial es obligatorio')
.integer('El stock debe ser un número entero')
.min(0, 'El stock no puede ser negativo'),
imagenUrl: yup.string()
.required('La URL de la imagen es obligatoria')
.url('Debe ser una URL válida (ej. https://...)'),
});

function FormularioPage() {
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const navigate = useNavigate();
const { id } = useParams();

const isEditing = !!id;

const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
resolver: yupResolver(schema),
defaultValues: {
nombre: '',
descripcion: '',
precio: 0,
stock: 0,
imagenUrl: '',
}
});

const currentImageUrl = watch('imagenUrl');

useEffect(() => {
if (isEditing) {
const fetchProducto = async () => {
try {
const db = getFirestore(app);
const docRef = doc(db, "productos", id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
const data = docSnap.data();
reset({
nombre: data.nombre || '',
descripcion: data.descripcion || '',
precio: data.precio || 0,
stock: data.stock || 0,
imagenUrl: data.imagenUrl || '',
});
} else {
console.log("No existe el documento!");
navigate('/productos');
}
} catch (err) {
console.error("Error al cargar el producto:", err);
setError("Error al cargar los datos del producto.");
}
};
fetchProducto();
}
}, [id, navigate, isEditing, reset]);

const onSubmit = async (data) => {
setError('');
setLoading(true);

try {
  const db = getFirestore(app);
        
  const productData = {
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: parseFloat(data.precio),
    stock: parseInt(data.stock, 10),
    imagenUrl: data.imagenUrl,
    fecha: new Date(),
  };

  if (isEditing) {
    await updateDoc(doc(db, "productos", id), productData);
  } else {
    await addDoc(collection(db, "productos"), productData);
  }
  navigate('/productos');
} catch (err) {
  console.error("Error al guardar el producto:", err);
  setError('Ocurrió un error al guardar el producto. Inténtalo de nuevo.');
} finally {
  setLoading(false);
}


};

return (
<Container className="my-5" style={{ maxWidth: '600px' }}>
{isEditing ? 'Editar Producto' : 'Crear Producto'}
{error && {error}}

  <Form onSubmit={handleSubmit(onSubmit)}>
    <Form.Group className="mb-3">
      <Form.Label>Nombre</Form.Label>
      <Form.Control type="text" {...register('nombre')} placeholder="Ej. Mouse Logitech RGB" />
      {errors.nombre && <p className="text-danger small mt-1">{errors.nombre.message}</p>}
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Descripción</Form.Label>
      <Form.Control as="textarea" rows={3} {...register('descripcion')} placeholder="Detalles del producto..." />
      {errors.descripcion && <p className="text-danger small mt-1">{errors.descripcion.message}</p>}
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Precio ($)</Form.Label>
      <Form.Control type="number" step="0.01" {...register('precio')} />
      {errors.precio && <p className="text-danger small mt-1">{errors.precio.message}</p>}
    </Form.Group>
    
    <Form.Group className="mb-3">
      <Form.Label>Stock Inicial</Form.Label>
      <Form.Control 
        type="number" 
        {...register('stock')} 
        min="0"
        placeholder="Ej: 10"
      />
      {errors.stock && <p className="text-danger small mt-1">{errors.stock.message}</p>}
    </Form.Group>
    
    <Form.Group className="mb-3">
      <Form.Label>URL de la Imagen</Form.Label>
      <Form.Control 
        type="text" 
        {...register('imagenUrl')} 
        placeholder="https://ejemplo.com/imagen.jpg" 
      />
      {errors.imagenUrl && <p className="text-danger small mt-1">{errors.imagenUrl.message}</p>}
    </Form.Group>

    {/* Vista previa de la imagen si hay una URL ingresada */}
    {currentImageUrl && !errors.imagenUrl && (
      <div className="text-center mb-3">
        <p className="text-muted small mb-1">Vista previa de la imagen:</p>
        <img 
          src={currentImageUrl} 
          alt="Vista previa" 
          style={{ maxHeight: '150px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #ddd' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
    )}

    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
      {loading ? <Spinner as="span" animation="border" size="sm" /> : (isEditing ? 'Actualizar Producto' : 'Crear Producto')}
    </Button>
  </Form>
</Container>


);
}

export default FormularioPage;