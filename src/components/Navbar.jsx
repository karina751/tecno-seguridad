import { Navbar as NavbarBootstrap, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

/**
 * Componente de la barra de navegación.
 * Contiene enlaces a las páginas principales de la aplicación.
 */
function Navbar() {
  return (
    <NavbarBootstrap bg="dark" variant="dark" expand="lg" className="px-4">
      <NavbarBootstrap.Brand as={NavLink} to="/">
        <span className="text-success fw-bold fs-4">TecnoSeguridad</span>
      </NavbarBootstrap.Brand>
      <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
      <NavbarBootstrap.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/" end>
            Inicio
          </Nav.Link>
          <Nav.Link as={NavLink} to="/productos">
            Productos
          </Nav.Link>
          <Nav.Link as={NavLink} to="/servicios">
            Servicios
          </Nav.Link>
          <Nav.Link as={NavLink} to="/crear-producto">
            Crear Producto
          </Nav.Link>
        </Nav>
      </NavbarBootstrap.Collapse>
    </NavbarBootstrap>
  );
}

export default Navbar;