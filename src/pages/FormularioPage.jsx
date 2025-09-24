// src/pages/FormularioPage.jsx

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, ProgressBar, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../api/firebase';
import { useParams, useNavigate } from 'react-router-dom';

// Esquema de validación con Yup
const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio'),
  descripcion: yup.string().required('La descripción es obligatoria'),
  precio: yup.number().typeError('El precio debe ser un número').required('El precio es obligatorio').positive('El precio debe ser un número positivo'),
  imagenUrl: yup.string().url('Debe ser una URL válida').notRequired(),
});

function FormularioPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = !!id;

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isEditing) {
      const fetchProducto = async () => {
        const db = getFirestore(app);
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          reset(data);
          // OJO: No necesitas setFile aquí, solo la URL se guarda en el formulario.
        } else {
          console.log("No such document!");
          navigate('/productos');
        }
      };
      fetchProducto();
    }
  }, [id, navigate, isEditing, reset]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);
    let finalImageUrl = data.imagenUrl || '';

    try {
      if (file) {
        const storage = getStorage(app);
        const storageRef = ref(storage, `imagenes_productos/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Error al subir la imagen:", error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              finalImageUrl = downloadURL;
              resolve();
            }
          );
        });
      }

      const db = getFirestore(app);
      const productData = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: parseFloat(data.precio),
        imagenUrl: finalImageUrl,
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
      setUploadProgress(0);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">{isEditing ? 'Editar Producto' : 'Crear Producto'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" {...register('nombre')} />
          {errors.nombre && <p className="text-danger">{errors.nombre.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} {...register('descripcion')} />
          {errors.descripcion && <p className="text-danger">{errors.descripcion.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" step="0.01" {...register('precio')} />
          {errors.precio && <p className="text-danger">{errors.precio.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen del Producto</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} disabled={loading} />
        </Form.Group>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <ProgressBar animated now={uploadProgress} label={`${Math.round(uploadProgress)}%`} className="my-3" />
        )}

        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" /> : (isEditing ? 'Actualizar Producto' : 'Crear Producto')}
        </Button>
      </Form>
    </Container>
  );
}

export default FormularioPage;