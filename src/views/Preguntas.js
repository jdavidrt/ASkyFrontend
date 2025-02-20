import React, { useState, useEffect } from "react";
import { Container, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, CardTitle, CardText, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";
import classnames from 'classnames';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import questionService from "../services/QuestionService";
import topicService from "../services/TopicService";
import "../Styles/Preguntas.css";

const Preguntas = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modal, setModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const userId = 6; // Reemplaza con el ID del usuario actual

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    fetchPendingQuestions();
    fetchTopics();
    const savedQuestion = sessionStorage.getItem('selectedQuestion');
    if (savedQuestion) {
      setSelectedQuestion(JSON.parse(savedQuestion));
      setModal(true);
    }
  }, []);

  const fetchPendingQuestions = async () => {
    try {
      const response = await questionService.getQuestionsByUser(userId);
      setPendingQuestions(response.data.data);
    } catch (error) {
      console.error("Error fetching pending questions:", error);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await topicService.getTopics();
      setTopics(response.data.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const getTopicName = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    return topic ? topic.name : "Desconocido";
  };

  const toggleModal = (question) => {
    setSelectedQuestion(question);
    setModal(!modal);
    if (!modal) {
      sessionStorage.setItem('selectedQuestion', JSON.stringify(question));
    } else {
      sessionStorage.removeItem('selectedQuestion');
    }
  };

  const toggleRatingModal = () => {
    setRatingModal(!ratingModal);
  };

  const handleCloseModal = () => {
    setModal(false);
    sessionStorage.removeItem('selectedQuestion');
    if (!selectedQuestion.rating) {
      toggleRatingModal();
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSendRating = () => {
    if (selectedQuestion) {
      const updatedQuestions = answeredQuestions.map(question => 
        question.id === selectedQuestion.id ? { ...question, rating } : question
      );
      setAnsweredQuestions(updatedQuestions);
      setRating(0);
      setComment("");
      toggleRatingModal();
      setModal(false); // Cerrar la ventana de "Ver respuesta" al enviar la calificación
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} color="#ffc107" size={18} />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} color="#ffc107" size={18} />);
      } else {
        stars.push(<FaStar key={i} color="#e4e5e9" size={18} />);
      }
    }
    return stars;
  };

  // Ejemplos de preguntas respondidas
  useEffect(() => {
    setAnsweredQuestions([
      {
        id: 1,
        title: "¿Cuál es la fórmula cuadrática?",
        body: "Necesito saber la fórmula cuadrática para resolver una ecuación.",
        price: 50,
        topicId: 1,
        deadline: "2025-02-10T12:14:40.420Z",
        answer: "La fórmula cuadrática es: x = (-b ± √(b²-4ac)) / 2a",
        expertName: "Juan Pérez",
        rating: 0
      },
      {
        id: 2,
        title: "¿Qué es la energía cinética?",
        body: "¿Podrías explicar qué es la energía cinética?",
        price: 30,
        topicId: 2,
        deadline: "2025-02-11T15:00:00.000Z",
        answer: "La energía cinética es la energía que posee un objeto debido a su movimiento.",
        expertName: "María López",
        rating: 0
      },
      {
        id: 3,
        title: "¿Qué es la fotosíntesis?",
        body: "¿Podrías explicar el proceso de la fotosíntesis?",
        price: 40,
        topicId: 5,
        deadline: "2025-02-12T10:00:00.000Z",
        answer: "La fotosíntesis es el proceso por el cual las plantas convierten la luz solar en energía química.",
        expertName: "Carlos García",
        rating: 0
      }
    ]);
  }, []);

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
          <div className="question-list">
            {pendingQuestions.map((question) => (
              <div key={question.id} className="question-item">
                <div className="question-details">
                  <h5>{question.title}</h5>
                  <p><strong>Precio:</strong> {question.price} Askoins</p>
                  <p><strong>Tema relacionado:</strong> {getTopicName(question.topicId)}</p>
                  <p><strong>Plazo de tiempo:</strong> {new Date(question.deadline).toLocaleString()}</p>
                </div>
                <Button color="primary" className="view-more-button" onClick={() => toggleModal(question)}>
                  Ver más
                </Button>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tabId="2">
          <h2>Consultas respondidas</h2>
          <p>Aquí podrás encontrar todas las preguntas que has realizado y que ya fueron respondidas por los expertos.</p>
          <div className="question-list">
            {answeredQuestions.map((question) => (
              <div key={question.id} className="question-item">
                <div className="question-details">
                  <h5>{question.title}</h5>
                  <p><strong>Precio:</strong> {question.price} Askoins</p>
                  <p><strong>Tema relacionado:</strong> {getTopicName(question.topicId)}</p>
                  <p><strong>Plazo de tiempo:</strong> {new Date(question.deadline).toLocaleString()}</p>
                  <p><strong>Respondido por:</strong> {question.expertName}</p>
                  {question.rating > 0 && (
                    <p><strong>Tu calificación:</strong> {renderStars(question.rating)}</p>
                  )}
                </div>
                <Button color="primary" className="view-more-button" onClick={() => toggleModal(question)}>
                  Ver Respuesta
                </Button>
              </div>
            ))}
          </div>
        </TabPane>
      </TabContent>

      {selectedQuestion && (
        <Modal isOpen={modal} className="custom-modal" style={{ maxWidth: "800px" }} backdrop="static" keyboard={false}>
          <ModalHeader className="custom-modal-header">Detalles de la pregunta</ModalHeader>
          <ModalBody className="custom-modal-body">
            <CardTitle tag="h5">{selectedQuestion.title}</CardTitle>
            <FormGroup>
              <Label for="questionBody"><strong>Pregunta:</strong></Label>
              <Input type="textarea" name="questionBody" id="questionBody" value={selectedQuestion.body} readOnly style={{ height: "150px" }} />
            </FormGroup>
            <CardText><strong>Precio:</strong> {selectedQuestion.price} Askoins</CardText>
            <CardText><strong>Tema relacionado:</strong> {getTopicName(selectedQuestion.topicId)}</CardText>
            <CardText><strong>Plazo de tiempo:</strong> {new Date(selectedQuestion.deadline).toLocaleString()}</CardText>
            {selectedQuestion.answer && (
              <FormGroup>
                <Label for="answerBody"><strong>Respuesta:</strong></Label>
                <Input type="textarea" name="answerBody" id="answerBody" value={selectedQuestion.answer} readOnly style={{ height: "150px" }} />
              </FormGroup>
            )}
            {selectedQuestion.expertName && (
              <CardText><strong>Respondido por:</strong> {selectedQuestion.expertName}</CardText>
            )}
          </ModalBody>
          <ModalFooter className="custom-modal-footer">
            <Button color="secondary" onClick={handleCloseModal}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      )}

      {selectedQuestion && !selectedQuestion.rating && (
        <Modal isOpen={ratingModal} className="custom-modal" style={{ maxWidth: "600px" }} backdrop="static" keyboard={false}>
          <ModalHeader className="custom-modal-header">
            Calificar respuesta de {selectedQuestion && `(${selectedQuestion.expertName})`}
          </ModalHeader>
          <ModalBody className="custom-modal-body">
            <h5>¿Cómo calificarías la respuesta del experto?</h5>
            <div className="rating-stars">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <Input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => handleRating(ratingValue)}
                      style={{ display: "none" }}
                    />
                    <FaStar
                      className="star"
                      color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                      size={30}
                      style={{ transition: "transform 0.2s" }}
                      onMouseEnter={() => setRating(ratingValue)}
                      onMouseLeave={() => setRating(rating)}
                    />
                  </label>
                );
              })}
            </div>
            <FormGroup>
              <Label for="comment"><strong>Comentario:</strong></Label>
              <Input type="textarea" name="comment" id="comment" value={comment} onChange={handleCommentChange} placeholder="Escribe tu comentario aquí..." style={{ height: "100px" }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="custom-modal-footer">
            <Button color="primary" style={{ backgroundColor: "#0891b2", borderColor: "#0891b2" }} onClick={handleSendRating} disabled={rating === 0 || comment.trim() === ""}>Enviar</Button>
          </ModalFooter>
        </Modal>
      )}
    </Container>
  );
};

export default Preguntas;
