import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCommentDots, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/ASKYLogo.png";
import "../Styles/LandingPage.css";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="landing-page">
      {/* Sección de bienvenida */}
      <motion.section
        className="welcome-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Container className="text-center">
          <div className="logo-container">
            <img src={logo} alt="ASKy Logo" className="asky-logo" />
          </div>
          <h1 className="title">¡Bienvenido a ASKy!</h1>
          <p className="subtitle">
            La plataforma que te conecta con expertos para obtener respuestas rápidas y confiables.
          </p>
          <Button
            color="primary"
            size="lg"
            className="cta-button"
            onClick={() => loginWithRedirect()}
          >
            Regístrate ahora
          </Button>
        </Container>
      </motion.section>

      {/* Sección de funcionalidades */}
      <section className="features-section">
        <Container>
          <h2 className="text-center section-title">¿Qué ofrecemos?</h2>
          <Row>
            {[{ icon: faUser, title: "Conecta con expertos", description: "Encuentra a los mejores en su campo para resolver tus dudas." },
              { icon: faCommentDots, title: "Consultas rápidas", description: "Haz preguntas y recibe respuestas en tiempo récord." },
              { icon: faMoneyBill, title: "Transacciones seguras", description: "Usa ASKoins para pagar de manera fácil y transparente." }].map((feature, index) => (
              <Col md="4" key={index}>
                <motion.div className="feature-card" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <FontAwesomeIcon icon={feature.icon} size="3x" className="feature-icon" />
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de testimonios */}
      <section className="testimonials-section">
        <Container>
          <h2 className="text-center section-title">Testimonios de nuestros usuarios</h2>
          <Row className="justify-content-center">
            {[{ quote: "ASKy me ayudó a resolver dudas rápidamente. ¡Increíble experiencia!", author: "Usuario Satisfecho" },
              { quote: "Un lugar donde el conocimiento es recompensado. Totalmente recomendado.", author: "Experto Reconocido" },
              { quote: "La plataforma es intuitiva y muy útil. Me encanta el sistema de ASKoins.", author: "Nuevo Usuario" }].map((item, index) => (
              <Col md="4" key={index}>
                <motion.div className="testimonial-card" whileHover={{ scale: 1.05 }}>
                  <p className="testimonial-quote">"{item.quote}"</p>
                  <p className="testimonial-author">- {item.author}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de cómo funciona */}
      <section className="how-it-works-section">
        <Container>
          <h2 className="text-center section-title">¿Cómo Funciona?</h2>

          {/* Pasos para usuarios */}
          <div className="steps-block">
            <h3 className="steps-title">Si tienes preguntas</h3>
            <div className="steps-container">
              {[{ step: "Regístrate", desc: "Crea tu cuenta de manera rápida y segura." },
                { step: "Encuentra expertos", desc: "Filtra y selecciona al experto adecuado para tu consulta." },
                { step: "Recibe respuestas", desc: "Obtén soluciones claras y rápidas." }].map((item, index) => (
                <motion.div key={index} className="step-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}>
                  <div className="step-icon">
                    <span className="step-number">{index + 1}</span>
                  </div>
                  <div className="step-details">
                    <h4>{item.step}</h4>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pasos para expertos */}
          <div className="steps-block">
            <h3 className="steps-title">Si eres experto</h3>
            <div className="steps-container">
              {[{ step: "Habilita tu perfil", desc: "Regístrate y activa la opción para responder consultas." },
                { step: "Recibe preguntas", desc: "Acepta consultas de usuarios y comienza a responder." },
                { step: "Gana ASKoins", desc: "Recibe recompensas según la calidad de tus respuestas." }].map((item, index) => (
                <motion.div key={index} className="step-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}>
                  <div className="step-icon">
                    <span className="step-number">{index + 1}</span>
                  </div>
                  <div className="step-details">
                    <h4>{item.step}</h4>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;
