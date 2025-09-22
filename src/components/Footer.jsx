import { Container } from 'react-bootstrap';

/**
 * Componente del pie de página.
 * Contiene información de la empresa y un enlace de contacto a WhatsApp.
 */
function Footer() {
  const numeroTelefono = '5493875222620';
  const mensaje = 'Hola TecnoSeguridad, me gustaría consultar sobre sus servicios.';
  const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container className="text-center">
        <p>&copy; {new Date().getFullYear()} TecnoSeguridad. Todos los derechos reservados.</p>
        <p>Salta Capital, Argentina</p>
        <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="btn btn-success">
          Contáctanos por WhatsApp
        </a>
      </Container>
    </footer>
  );
}

export default Footer;