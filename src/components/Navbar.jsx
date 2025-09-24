// src/components/Navbar.jsx

import { Navbar as NavbarBootstrap, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-tecnoseguridad.png';
import { useContext, useState } from 'react'; // <-- Importa 'useState'
import { AuthContext } from '../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { useCart } from '../context/CartContext'; 

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState(''); // <-- Nuevo estado para el buscador

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // <-- Nueva función para manejar la búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    if (searchTerm.trim()) {
      navigate(`/productos?search=${searchTerm}`); // Redirige con el término de búsqueda en la URL
    }
  };

  return (
    <NavbarBootstrap className="bg-degradado-ondas" variant="dark" expand="lg">
      <Container fluid>
        <NavbarBootstrap.Brand as={NavLink} to="/">
          <img src={logo} alt="TecnoSeguridad Logo" className="logo-main me-2" />
        </NavbarBootstrap.Brand>
        <NavbarBootstrap.Toggle aria-controls="navbarTogglerDemo03" />
        <NavbarBootstrap.Collapse id="navbarTogglerDemo03">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/servicios">
              Servicios
            </Nav.Link>
            {currentUser && (
              <Nav.Link as={NavLink} to="/crear-producto">
                Crear Producto
              </Nav.Link>
            )}
          </Nav>
          <Form className="d-flex" onSubmit={handleSearchSubmit}> {/* <-- Agrega el manejador onSubmit */}
            <FormControl
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Buscar"
              value={searchTerm} // <-- Conecta el valor al estado
              onChange={(e) => setSearchTerm(e.target.value)} // <-- Actualiza el estado
            />
            <Button variant="outline-light" type="submit"> {/* <-- Cambia a 'type="submit"' */}
              Buscar
            </Button>
          </Form>
          <Nav>
            <Nav.Link as={NavLink} to="/cart" className="position-relative me-3">
              <i className="bi bi-cart-fill" style={{ fontSize: '1.5rem', color: 'white' }}></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                  <span className="visually-hidden">Productos en el carrito</span>
                </span>
              )}
            </Nav.Link>
            {currentUser ? (
              <Button variant="danger" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
}

export default Navbar;