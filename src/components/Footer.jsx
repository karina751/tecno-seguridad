import { Container } from 'react-bootstrap';
import whatsappLogo from '../assets/logo-whatsapp.jpg'; 

function Footer() {
  const numeroTelefono = '387- 155222620';
  const mensaje = 'Hola TecnoSeguridad, me gustaría consultar sobre sus servicios.';
  const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensaje)}`;

  return (
    <footer className="bg-degradado-ondas text-white py-4 mt-auto">
      <Container className="text-center">
        <p>Barrio Ciudad del Milagro - Donato Álvarez N°167</p>
        <p>Cel: 387- 154665822 | Cel: 387- 155222620</p>
        <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light d-inline-flex align-items-center">
          <img src={whatsappLogo} alt="WhatsApp" className="footer-whatsapp-logo me-2" />
          Contáctanos por WhatsApp
        </a>
      </Container>
    </footer>
  );
}

export default Footer;