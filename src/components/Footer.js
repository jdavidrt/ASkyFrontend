import React from "react";
import logo from "../assets/ASKYLogo.png";
import "../Styles/Footer.css";

const Footer = () => (
  <footer className="footer bg-dark text-white text-center p-3">
    <div className="footer-logo">
      <img src={logo} alt="ASKY Logo" />
    </div>
    <p className="footer-text">
      &copy; {new Date().getFullYear()} Todos los derechos reservados ASKY
    </p>
  </footer>
);

export default Footer;