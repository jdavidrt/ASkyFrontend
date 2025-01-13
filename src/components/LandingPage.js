import React from 'react';
import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react'; // Importar Auth0
import '../Styles/LandingPage.css';

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0(); // Extraer función de Auth0


  return (
    <div className="landing-page">
      {/* Sección de Bienvenida */}
      <section className="welcome-section">
        <Container className="text-center">
          <h1>¡Bienvenido a ASKy!</h1>
          <p className="subtitle">
            La plataforma que te conecta con expertos para obtener respuestas rápidas y confiables.
          </p>
          {/* Botón con funcionalidad para redirigir */}
          <Button
            color="info"
            size="lg"
            className="cta-button"
            onClick={() => loginWithRedirect()}
          >
            Regístrate ahora
          </Button>
        </Container>
      </section>

      {/* Sección de Funcionalidades */}
      <section className="features-section">
        <Container>
          <Row className="text-center">
            <Col md="4">
              <Card className="feature-card">
                <CardBody>
                  <FontAwesomeIcon icon={faUser} size="3x" className="feature-icon" />
                  <h5>Conecta con expertos</h5>
                  <p>Encuentra a los mejores en su campo para resolver tus dudas.</p>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="feature-card">
                <CardBody>
                  <FontAwesomeIcon icon={faCommentDots} size="3x" className="feature-icon" />
                  <h5>Consultas rápidas</h5>
                  <p>Haz preguntas y recibe respuestas en tiempo récord.</p>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="feature-card">
                <CardBody>
                  <FontAwesomeIcon icon={faMoneyBill} size="3x" className="feature-icon" />
                  <h5>Transacciones seguras</h5>
                  <p>Usa ASKoins para pagar de manera fácil y transparente.</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Sección de Testimonios */}
      <section className="testimonials-section">
        <Container>
          <h2 className="text-center">Testimonios de nuestros usuarios</h2>
          <Row className="justify-content-center">
            {[{
              quote: "ASKy me ayudó a resolver dudas rápidamente. ¡Increíble experiencia!", author: "Usuario Satisfecho" },
              { quote: "Un lugar donde el conocimiento es recompensado. Totalmente recomendado.", author: "Experto Reconocido" },
              { quote: "La plataforma es intuitiva y muy útil. Me encanta el sistema de ASKoins.", author: "Nuevo Usuario" },
            ].map((item, index) => (
              <Col md="4" key={index}>
                <div className="testimonial-card">
                  <p className="testimonial-quote">"{item.quote}"</p>
                  <p className="testimonial-author">- {item.author}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de Cómo Funciona */}
      <section className="how-it-works-section">
        <Container>
          <h2 className="text-center">¿Cómo Funciona?</h2>

          {/* Pasos para usuarios */}
          <h3 className="text-left mt-3">Si tienes preguntas</h3>
          <div className="steps-container">
            {[
              { step: "Regístrate", desc: "Crea tu cuenta de manera rápida y segura." },
              { step: "Encuentra expertos", desc: "Filtra y selecciona al experto adecuado para tu consulta." },
              { step: "Recibe respuestas", desc: "Obtén soluciones claras y rápidas." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0, transition: { delay: index * 0.3 } },
                }}
                className="step-item"
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h4>{item.step}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pasos para expertos */}
          <h3 className="text-left mt-5">Si eres experto</h3>
          <div className="steps-container">
            {[
              { step: "Habilita tu perfil", desc: "Regístrate y activa la opción para responder consultas." },
              { step: "Recibe preguntas", desc: "Acepta consultas de usuarios y comienza a responder." },
              { step: "Gana ASKoins", desc: "Recibe recompensas según la calidad de tus respuestas." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0, transition: { delay: index * 0.3 } },
                }}
                className="step-item"
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h4>{item.step}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
