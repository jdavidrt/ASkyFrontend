import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Importar useHistory
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react"; // Importar useAuth0
import logo from "../assets/ASKYLogo.png";
import "../Styles/Footer.css";
import PrivacyPolicy from "../views/PrivacyPolicy";
import TermsAndConditions from "../views/TermsAndConditions";

const Footer = () => {
  const [privacyPolicyModal, setPrivacyPolicyModal] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const { isAuthenticated } = useAuth0(); // Obtener el estado de autenticación
  const history = useHistory(); // Inicializar useHistory

  const togglePrivacyPolicyModal = () => {
    setPrivacyPolicyModal(!privacyPolicyModal);
  };

  const toggleTermsModal = () => {
    setTermsModal(!termsModal);
  };

  const handleLogoClick = () => {
    if (isAuthenticated) {
      history.push("/catalogo-expertos");
    } else {
      history.push("/");
    }
  };

  return (
    <footer className="footer bg-dark text-white text-center p-3">
      <div className="footer-logo" onClick={handleLogoClick} style={{ cursor: "pointer", display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="ASKY Logo" />
      </div>
      <div className="legal-info" style={{ marginBottom: "0.5rem" }}>
        <Button color="link" onClick={toggleTermsModal} className="p-0 text-white">
          Términos y condiciones
        </Button>
        {" | "}
        <Button color="link" onClick={togglePrivacyPolicyModal} className="p-0 text-white">
          Políticas de privacidad
        </Button>
      </div>
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Todos los derechos reservados ASKY
      </p>
      <Modal isOpen={privacyPolicyModal} toggle={togglePrivacyPolicyModal} size="lg">
        <ModalHeader toggle={togglePrivacyPolicyModal}>Política de Privacidad</ModalHeader>
        <ModalBody>
          <PrivacyPolicy />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={togglePrivacyPolicyModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={termsModal} toggle={toggleTermsModal} size="lg">
        <ModalHeader toggle={toggleTermsModal}>Términos y Condiciones</ModalHeader>
        <ModalBody>
          <TermsAndConditions />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleTermsModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </footer>
  );
};

export default Footer;