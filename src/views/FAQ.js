import React from 'react'
import { motion } from "framer-motion";
import { Container, Row, Col, Button } from "reactstrap";

const FAQ = () => {
  return (
    <div className="faq">
    {/* Sección de bienvenida */}

        
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

        {/* Pasos para expertos * */}
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
  )
}

export default FAQ