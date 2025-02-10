import React, { useState, useEffect } from "react";
import { Container, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, CardTitle, CardText, Row, Col } from "reactstrap";
import classnames from 'classnames';
import questionService from "../services/QuestionService";
import "../Styles/Preguntas.css";

const Preguntas = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const userId = 6; // Reemplaza con el ID del usuario actual

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    fetchPendingQuestions();
  }, []);

  const fetchPendingQuestions = async () => {
    try {
      const response = await questionService.getQuestionsByUser(userId);
      setPendingQuestions(response.data.data);
    } catch (error) {
      console.error("Error fetching pending questions:", error);
    }
  };

  return (
    <Container className="preguntas-container">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Consultas pendientes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Consultas respondidas
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <h2>Consultas pendientes</h2>
          <p>Aquí podrás encontrar todas las preguntas que has realizado y que aún no han sido respondidas por los expertos.</p>
          <Row>
            {pendingQuestions.map((question) => (
              <Col md={12} key={question.id} className="mb-4">
                <Card className="question-card-horizontal">
                  <CardBody>
                    <CardTitle tag="h5">{question.title}</CardTitle>
                    <CardText><strong>Pregunta:</strong> {question.body}</CardText>
                    <CardText><strong>Precio:</strong> {question.price} Askoins</CardText>
                    <CardText><strong>Tema relacionado:</strong> {question.topicId}</CardText>
                    <CardText><strong>Plazo de tiempo:</strong> {new Date(question.deadline).toLocaleString()}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <h2>Consultas respondidas</h2>
          <p>Aquí podrás encontrar todas las preguntas que has realizado y que ya fueron respondidas por los expertos.</p>
          {/* Aquí puedes agregar el contenido y funcionalidad para las consultas respondidas */}
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default Preguntas;
