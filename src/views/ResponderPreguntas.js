import React, { useState, useEffect } from "react";
import { Container, Nav, NavItem, NavLink, TabContent, TabPane, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";
import classnames from 'classnames';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "../Styles/ResponderPreguntas.css";

const ResponderPreguntas = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modal, setModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [justification, setJustification] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    // Ejemplos de preguntas por responder
    setPendingQuestions([
      {
        id: 1,
        title: "¿Cómo resolver una ecuación cuadrática?",
        body: "Necesito ayuda para resolver una ecuación cuadrática.",
        price: 50,
        topicId: 1,
        deadline: "2025-02-10T12:14:40.420Z",
        userName: "Ana Gómez"
      },
      {
        id: 2,
        title: "¿Qué es la energía potencial?",
        body: "¿Podrías explicar qué es la energía potencial?",
        price: 30,
        topicId: 2,
        deadline: "2025-02-11T15:00:00.000Z",
        userName: "Luis Martínez"
      },
      {
        id: 3,
        title: "¿Cómo funciona la fotosíntesis?",
        body: "¿Podrías explicar el proceso de la fotosíntesis?",
        price: 40,
        topicId: 5,
        deadline: "2025-02-12T10:00:00.000Z",
        userName: "María López"
      }
    ]);

    // Ejemplos de temas
    setTopics([
      { id: 1, name: "Matemáticas" },
      { id: 2, name: "Física" },
      { id: 5, name: "Biología" }
    ]);

    // Ejemplos de preguntas respondidas por el experto
    setAnsweredQuestions([
      {
        id: 1,
        title: "¿Cómo resolver una ecuación cuadrática?",
        body: "Necesito ayuda para resolver una ecuación cuadrática.",
        price: 50,
        topicId: 1,
        deadline: "2025-02-10T12:14:40.420Z",
        answer: "La fórmula cuadrática es: x = (-b ± √(b²-4ac)) / 2a",
        userName: "Ana Gómez",
        rating: 5
      },
      {
        id: 2,
        title: "¿Qué es la energía potencial?",
        body: "¿Podrías explicar qué es la energía potencial?",
        price: 30,
        topicId: 2,
        deadline: "2025-02-11T15:00:00.000Z",
        answer: "La energía potencial es la energía que posee un objeto debido a su posición en un campo de fuerzas.",
        userName: "Luis Martínez",
        rating: 4
      },
      {
        id: 3,
        title: "¿Cómo funciona la fotosíntesis?",
        body: "¿Podrías explicar el proceso de la fotosíntesis?",
        price: 40,
        topicId: 5,
        deadline: "2025-02-12T10:00:00.000Z",
        answer: "La fotosíntesis es el proceso por el cual las plantas convierten la luz solar en energía química.",
        userName: "María López",
        rating: 5
      }
    ]);
  }, []);

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

  const toggleRejectModal = (question) => {
    setSelectedQuestion(question);
    setRejectModal(!rejectModal);
    if (!rejectModal) {
      sessionStorage.setItem('selectedQuestion', JSON.stringify(question));
    } else {
      sessionStorage.removeItem('selectedQuestion');
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    sessionStorage.removeItem('selectedQuestion');
  };

  const handleCloseRejectModal = () => {
    setRejectModal(false);
    sessionStorage.removeItem('selectedQuestion');
  };

  const handleJustificationChange = (e) => {
    setJustification(e.target.value);
  };

  const handleSendJustification = () => {
    // Lógica para enviar la justificación
    setJustification("");
    setRejectModal(false);
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

  return (
    <Container className="responder-preguntas-container">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Consultas por responder
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
          <h2>Consultas por responder</h2>
          <p>Aquí podrás ver todas las consultas realizadas por los usuarios que están esperando una respuesta. Selecciona una consulta para ver más detalles y proporcionar tu respuesta experta.</p>
          <div className="question-list">
            {pendingQuestions.map((question) => (
              <div key={question.id} className="question-item">
                <div className="question-details">
                  <h5>{question.title}</h5>
                  <p><strong>Precio:</strong> {question.price} Askoins</p>
                  <p><strong>Tema relacionado:</strong> {getTopicName(question.topicId)}</p>
                  <p><strong>Plazo de tiempo:</strong> {new Date(question.deadline).toLocaleString()}</p>
                  <p><strong>Usuario:</strong> {question.userName}</p>
                </div>
                <div className="button-group">
                  <Button color="primary" className="view-more-button" onClick={() => toggleModal(question)}>
                    Responder Consulta
                  </Button>
                  <Button color="danger" className="reject-button" onClick={() => toggleRejectModal(question)} style={{ marginTop: '10px' }}>
                    Rechazar Consulta
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tabId="2">
          <h2>Consultas respondidas</h2>
          <p>Aca vas a poder encontrar las preguntas que has respondido.</p>
          <div className="question-list">
            {answeredQuestions.map((question) => (
              <div key={question.id} className="question-item">
                <div className="question-details">
                  <h5>{question.title}</h5>
                  <p><strong>Precio:</strong> {question.price} Askoins</p>
                  <p><strong>Tema relacionado:</strong> {getTopicName(question.topicId)}</p>
                  <p><strong>Plazo de tiempo:</strong> {new Date(question.deadline).toLocaleString()}</p>
                  <p><strong>Usuario:</strong> {question.userName}</p>
                </div>
                  <div className="button-group">
                  <Button color="primary" className="view-more-button" onClick={() => toggleModal(question)}>
                    Ver más
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabPane>
      </TabContent>

      {selectedQuestion && activeTab === '1' && (
        <Modal isOpen={modal} className="custom-modal" style={{ maxWidth: "800px" }} backdrop="static" keyboard={false}>
          <ModalHeader className="custom-modal-header">
            Detalles de la pregunta de {selectedQuestion.userName}
          </ModalHeader>
          <ModalBody className="custom-modal-body">
            <CardTitle tag="h5">{selectedQuestion.title}</CardTitle>
            <FormGroup>
              <Label for="questionBody"><strong>Pregunta:</strong></Label>
              <Input type="textarea" name="questionBody" id="questionBody" value={selectedQuestion.body} readOnly style={{ height: "150px" }} />
            </FormGroup>
            <CardText><strong>Precio:</strong> {selectedQuestion.price} Askoins</CardText>
            <CardText><strong>Tema relacionado:</strong> {getTopicName(selectedQuestion.topicId)}</CardText>
            <CardText><strong>Plazo de tiempo:</strong> {new Date(selectedQuestion.deadline).toLocaleString()}</CardText>
            <FormGroup>
              <Label for="expertAnswer"><strong>Tu respuesta:</strong></Label>
              <Input type="textarea" name="expertAnswer" id="expertAnswer" placeholder="Escribe tu respuesta aquí..." style={{ height: "150px" }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="custom-modal-footer">
            <Button color="primary" style={{ backgroundColor: "#0891b2", borderColor: "#0891b2" }} onClick={() => { /* lógica para enviar la respuesta */ }}>
              Enviar
            </Button>
            <Button color="secondary" onClick={handleCloseModal}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      )}

      {selectedQuestion && activeTab === '2' && (
        <Modal isOpen={modal} className="custom-modal" style={{ maxWidth: "800px" }} backdrop="static" keyboard={false}>
          <ModalHeader className="custom-modal-header">
            Detalles de la pregunta de {selectedQuestion.userName}
          </ModalHeader>
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
            {selectedQuestion.rating > 0 && (
              <CardText><strong>Calificación:</strong> {renderStars(selectedQuestion.rating)}</CardText>
            )}
          </ModalBody>
          <ModalFooter className="custom-modal-footer">
            <Button color="secondary" onClick={handleCloseModal}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      )}

      {selectedQuestion && (
        <Modal isOpen={rejectModal} className="custom-modal" style={{ maxWidth: "800px" }} backdrop="static" keyboard={false}>
          <ModalHeader className="custom-modal-header">
            Justificación del rechazo de la pregunta de {selectedQuestion.userName}
          </ModalHeader>
          <ModalBody className="custom-modal-body">
            <CardTitle tag="h5">{selectedQuestion.title}</CardTitle>
            <FormGroup>
              <Label for="questionBody"><strong>Pregunta:</strong></Label>
              <Input type="textarea" name="questionBody" id="questionBody" value={selectedQuestion.body} readOnly style={{ height: "150px" }} />
            </FormGroup>
            <CardText><strong>Precio:</strong> {selectedQuestion.price} Askoins</CardText>
            <CardText><strong>Tema relacionado:</strong> {getTopicName(selectedQuestion.topicId)}</CardText>
            <CardText><strong>Plazo de tiempo:</strong> {new Date(selectedQuestion.deadline).toLocaleString()}</CardText>
            <FormGroup>
              <Label for="justification"><strong>Tu justificación:</strong></Label>
              <Input type="textarea" name="justification" id="justification" placeholder="Escribe tu justificación aquí..." value={justification} onChange={handleJustificationChange} style={{ height: "150px" }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="custom-modal-footer">
            <Button color="primary" style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }} onClick={handleSendJustification}>
              Enviar
            </Button>
            <Button color="secondary" onClick={handleCloseRejectModal}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      )}
    </Container>
  );
};

export default ResponderPreguntas;
