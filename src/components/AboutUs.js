import React from "react";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import logo from "../assets/ASKYLogo.png";
import "../Styles/AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-us-section">
      <Container>
        {/* Sección: Introducción */}
        <Row className="align-items-center">
          <Col md="6">
            <motion.div
              className="about-us-intro"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="about-logo-container">
                <img src={logo} alt="ASKy Logo" className="about-logo" />
              </div>
              <h2 className="section-title">Sobre Nosotros</h2>
              <p className="about-us-text">
                En <strong>ASKy</strong>, conectamos personas con expertos en
                diversos campos para resolver preguntas de manera rápida y
                confiable. Valoramos el conocimiento y creamos un espacio donde
                este se recompensa y comparte.
              </p>
            </motion.div>
          </Col>

          {/* Sección: Misión y Visión */}
          <Col md="6">
            <motion.div
              className="mission-vision"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="mission-title">Nuestra Misión</h3>
              <p className="mission-text">
              En ASky conectamos a personas con expertos en diversos campos del conocimiento para resolver dudas y preguntas de manera rápida y confiable. Nuestro objetivo es facilitar una plataforma accesible y eficiente que permite el intercambio de conocimiento, ayudando tanto a quienes buscan soluciones como a quienes desean generar ingresos compartiendo su experiencia.
              </p>

              {/* Espacio adicional entre misión y visión */}
              <div style={{ marginBottom: '20px' }}></div>

              <h3 className="vision-title">Nuestra Visión</h3>
              <p className="vision-text">
              Para el 2026, seremos la plataforma que facilite la conexión de expertos y usuarios que buscan respuestas especializadas en Colombia. Buscamos ser una referencia en soluciones rápidas y efectivas, creando un espacio confiable y accesible donde el conocimiento se valore y recompense.
              </p>
            </motion.div>
          </Col>
        </Row>

        {/* Sección: Valores */}
        <Row className="values-section justify-content-center">
          <Col md="12">
            <h2 className="text-center values-title">Nuestros Valores</h2>
          </Col>
          {["Transparencia", "Colaboración", "Accesibilidad"].map((value, index) => (
            <Col
              md="4"
              sm="6"
              key={index}
              className="d-flex justify-content-center value-item"
            >
              <motion.div whileHover={{ scale: 1.05 }} className="value-card">
                <h4>{value}</h4>
                <p>
                  {value === "Transparencia"
                    ? "Fomentamos interacciones honestas y claras."
                    : value === "Colaboración"
                      ? "Creemos en el intercambio de conocimientos."
                      : "Hacemos el aprendizaje accesible para todos."}
                </p>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Sección: Propuesta de Valor */}
        <Row className="value-proposition-section text-center">
          <Col md="12">
            <motion.div
              className="value-proposition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="value-proposition-title">Nuestra Propuesta de Valor</h2>
              <p className="value-proposition-text">
                ASKy es tu tutor personal. Conecta con expertos calificados y obtén
                respuestas rápidas y precisas, en un entorno seguro y confiable.
              </p>
            </motion.div>
          </Col>
        </Row>

        {/* Sección: Nuestro Talento */}
        <Row className="talent-section text-center">
          <Col md="12">
            <h2 className="value-proposition-title">Nuestro Talento</h2>
          </Col>
          {[
            { name: "Néstor", title: "Desarrollador Frontend", img: "Néstor.jpg" },
            { name: "Juan David", title: "Desarrollador Frontend", img: "JuanDavid.jpg" },
            { name: "Juan Sebastián", title: "Desarrollador Backend", img: "JuanSebastián.jpg" },
            { name: "Andrés", title: "Desarrollador Backend", img: "Andrés.jpg" },
          ].map((dev, index) => (
            <Col md="3" sm="6" key={index} className="talent-card-container">
              <motion.div
                className="talent-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={require(`../assets/${dev.img}`)}
                  alt={`${dev.name}`}
                  className="talent-img"
                />
                <h4 className="talent-name">{dev.name}</h4>
                <p className="talent-title">{dev.title}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
