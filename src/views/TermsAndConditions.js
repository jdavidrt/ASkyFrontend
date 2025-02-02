import React from "react";
import { Container } from "reactstrap";
import "../Styles/TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <Container className="terms-conditions-container">
      <h1>Términos y Condiciones</h1>
      <p>Última actualización: 2 de febrero de 2025.</p>
      
      <h2>1. Introducción</h2>
      <p>
        Bienvenido a ASKy. Al utilizar nuestros servicios, aceptas cumplir con los siguientes términos y condiciones.
        Por favor, léelos detenidamente.
      </p>
      
      <h2>2. Uso de los Servicios</h2>
      <p>
        Debes utilizar nuestros servicios de manera responsable y de acuerdo con todas las leyes aplicables.
        No debes utilizar nuestros servicios para actividades ilegales o no autorizadas.
      </p>
      
      <h2>3. Cuenta de Usuario</h2>
      <p>
        Para acceder a ciertos servicios, es posible que debas crear una cuenta. Eres responsable de mantener
        la confidencialidad de tu cuenta y contraseña, así como de todas las actividades que ocurran bajo tu cuenta.
      </p>
      
      <h2>4. Contenido Generado por el Usuario</h2>
      <p>
        Eres responsable del contenido que publiques en ASKy. No debes publicar contenido que sea ilegal, ofensivo,
        difamatorio o que infrinja los derechos de terceros.
      </p>
      
      <h2>5. Propiedad Intelectual</h2>
      <p>
        Todos los derechos de propiedad intelectual sobre los contenidos y servicios de ASKy son propiedad de ASKy
        o de sus licenciantes. No debes utilizar nuestros contenidos sin nuestro permiso expreso.
      </p>
      
      <h2>6. Terminación</h2>
      <p>
        Podemos suspender o terminar tu acceso a nuestros servicios en cualquier momento, sin previo aviso, si
        incumples estos términos y condiciones.
      </p>
      
      <h2>7. Limitación de Responsabilidad</h2>
      <p>
        ASKy no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, ni por
        pérdida de beneficios o ingresos, ya sea incurridos directamente o indirectamente.
      </p>
      
      <h2>8. Modificaciones a los Términos</h2>
      <p>
        Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Te notificaremos
        sobre cambios significativos a través de nuestros canales oficiales.
      </p>
      
      <h2>9. Ley Aplicable</h2>
      <p>
        Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la República de Colombia.
      </p>
      
      <h2>10. Contacto</h2>
      <p>
        Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos a través de <strong>ASky@contacto.com</strong>.
      </p>
    </Container>
  );
};

export default TermsAndConditions;
