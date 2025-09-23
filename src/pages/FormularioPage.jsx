// src/pages/FormularioPage.jsx

import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../api/firebase';
import { useParams, useNavigate } from 'react-router-dom';

function FormularioPage() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [file, setFile] = useState(null); // Nuevo estado para el archivo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0); // Nuevo estado para el progreso
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchProducto = async () => {
        const db = getFirestore(app);
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombre(data.nombre);
          setDescripcion(data.descripcion);
          setPrecio(data.precio);
          setImagenUrl(data.imagenUrl);
        } else {
          console.log("No such document!");
          navigate('/productos');
        }
      };
      fetchProducto();
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let finalImageUrl = imagenUrl;

      // Si el usuario seleccionó un nuevo archivo, lo subimos
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
      const data = {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        imagenUrl: finalImageUrl,
        fecha: new Date(),
      };

      if (id) {
        await updateDoc(doc(db, "productos", id), data);
      } else {
        await addDoc(collection(db, "productos"), data);
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
      <h2 className="text-center mb-4">{id ? 'Editar Producto' : 'Crear Producto'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </Form.Group>
        
        {/* Campo de carga de imagen */}
        <Form.Group className="mb-3">
          <Form.Label>Imagen del Producto</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={loading}
          />
        </Form.Group>
        
        {/* Barra de progreso de carga */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <ProgressBar animated now={uploadProgress} label={`${Math.round(uploadProgress)}%`} className="my-3" />
        )}

        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
          {loading ? 'Guardando...' : id ? 'Actualizar Producto' : 'Crear Producto'}
        </Button>
      </Form>
    </Container>
  );
}

export default FormularioPage;