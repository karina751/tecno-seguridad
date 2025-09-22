// src/components/Navbar.jsx

import { Navbar as NavbarBootstrap, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// Se corrige el nombre y la extensión del archivo
import logo from '../assets/logo-tecnoseguridad.png.png';

function Navbar() {
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
            <Nav.Link as={NavLink} to="/crear-producto">
              Crear Producto
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Buscar"
            />
            <Button variant="outline-light">Buscar</Button>
          </Form>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
}

export default Navbar;