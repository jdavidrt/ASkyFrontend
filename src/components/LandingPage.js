import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCommentDots, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/ASKYLogo.png";
import "../Styles/LandingPage.css";
import Header from "./Header";
import Testimonial from "./Testimonial";
import { sliderItems } from "../data/slides";
import SliderTopics from "./SliderTopics";
import CompanyValues from "./CompanyValues";
import ContactUs from "./ContactUs";

const LandingPage = () => {
  
  const { isAuthenticated } = useAuth0();
  console.log("User Auth:", isAuthenticated)

  return (
    <div className="landing-page">
      {/* Sección de bienvenida */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-0"
      >

      <Header/>
      </motion.section>

      {/* Sección de funcionalidades */}
      <SliderTopics sliderItems={sliderItems}/>


      <CompanyValues/>

      <section className="features-section">
        <Container>
          <h2 className="text-center section-title">¿Qué ofrecemos?</h2>
          <Row>
            {[{ icon: faUser, title: "Conecta con expertos", description: "Encuentra a los mejores en su campo para resolver tus dudas." },
            { icon: faCommentDots, title: "Consultas rápidas", description: "Haz preguntas y recibe respuestas en tiempo récord." },
            { icon: faMoneyBill, title: "Transacciones seguras", description: "Usa ASKoins para pagar de manera fácil y transparente." }].map((feature, index) => (
              <Col md="4" key={index}>
                <motion.div 
                className="feature-card" 
                style={{
                  boxShadow: "#48AFDE -5px 5px 25px 0px"
                }}
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}>
                  <FontAwesomeIcon icon={feature.icon} size="3x" className="feature-icon" />
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Testimonial/>

      <div id="hire-me" className="pt-32 mt-[0px] bg-[#223740] ">
        <ContactUs />
      </div>

    </div>
  );
};

export default LandingPage;
