import React from "react";
import { Container } from "reactstrap";
import "../Styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <Container className="privacy-policy-container">
      <h1>Política de Privacidad</h1>
      <p>Última actualización: 2 de febrero de 2025.</p>
      
      <h2>1. Introducción</h2>
      <p>
        En ASKy, valoramos tu privacidad y nos comprometemos a proteger tu información personal
        conforme a la normativa de protección de datos personales en la República de Colombia,
        especialmente la Ley 1581 de 2012 y sus decretos reglamentarios. Esta política describe
        cómo recopilamos, usamos, almacenamos, compartimos y protegemos tu información cuando
        utilizas nuestros servicios.
      </p>
      
      <h2>2. Información que Recopilamos</h2>
      <h3>2.1 Información proporcionada por el usuario</h3>
      <p>
        Cuando utilizas nuestros servicios, podemos solicitarte información personal, que incluye,
        pero no se limita a:
      </p>
      <ul>
        <li>Nombre completo.</li>
        <li>Dirección de correo electrónico.</li>
        <li>Información de pago (si aplica).</li>
        <li>Cualquier otra información que decidas compartir con nosotros.</li>
      </ul>
      
      <h3>2.2 Información recopilada automáticamente</h3>
      <p>
        También podemos recopilar automáticamente cierta información sobre tu dispositivo y actividad
        en nuestro sitio web, incluyendo:
      </p>
      <ul>
        <li>Dirección IP.</li>
        <li>Tipo de navegador y sistema operativo.</li>
        <li>Páginas visitadas y tiempo de permanencia.</li>
        <li>Datos de cookies y tecnologías similares.</li>
      </ul>
      
      <h2>3. Uso de la Información</h2>
      <p>Usamos tu información para los siguientes fines:</p>
      <ul>
        <li>Proporcionar y mejorar nuestros servicios.</li>
        <li>Personalizar tu experiencia en ASKy.</li>
        <li>Comunicarnos contigo sobre actualizaciones o soporte.</li>
        <li>Cumplir con obligaciones legales y regulatorias.</li>
        <li>Prevenir fraudes y mejorar la seguridad.</li>
      </ul>
      
      <h2>4. Compartir la Información</h2>
      <p>
        No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
      </p>
      <ul>
        <li>Con tu consentimiento expreso.</li>
        <li>Para cumplir con requerimientos legales o regulatorios.</li>
        <li>Con proveedores de servicios que nos apoyan en nuestras operaciones.</li>
        <li>Para proteger nuestros derechos y seguridad, así como los de nuestros usuarios.</li>
      </ul>
      
      <h2>5. Seguridad de la Información</h2>
      <p>
        Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger tu información.
        Sin embargo, debes tener en cuenta que ninguna transmisión de datos por Internet es completamente segura.
      </p>
      
      <h2>6. Derechos del Titular de los Datos</h2>
      <p>De acuerdo con la normativa colombiana, tienes los siguientes derechos:</p>
      <ul>
        <li>Acceder, actualizar o rectificar tu información personal.</li>
        <li>Solicitar la eliminación de tus datos cuando sea procedente.</li>
        <li>Revocar el consentimiento para el tratamiento de tus datos.</li>
        <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
      </ul>
      
      <h2>7. Uso de Cookies</h2>
      <p>
        Utilizamos cookies para mejorar tu experiencia en ASKy. Puedes gestionar la configuración
        de cookies desde tu navegador.
      </p>
      
      <h2>8. Retención de Datos</h2>
      <p>
        Conservamos tu información solo durante el tiempo necesario para cumplir con los propósitos
        descritos en esta política, salvo que la ley exija un período mayor.
      </p>
      
      <h2>9. Cambios en la Política de Privacidad</h2>
      <p>
        Nos reservamos el derecho de modificar esta política en cualquier momento. Te notificaremos
        sobre cambios significativos a través de nuestros canales oficiales.
      </p>
      
      <h2>10. Contacto</h2>
      <p>
        Si tienes preguntas sobre esta política, puedes contactarnos a través de <strong>ASky@contacto.com</strong>.
      </p>
    </Container>
  );
};

export default PrivacyPolicy;
