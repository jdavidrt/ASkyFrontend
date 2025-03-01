import React, { useState, useEffect, useCallback } from "react";
import { Container, Nav, NavItem, NavLink, TabContent, TabPane, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap";
import classnames from 'classnames';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import questionService from "../services/QuestionService";
import topicService from "../services/TopicService";
import userService from "../services/UserService";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading"; // Importar el componente Loading
import "../Styles/ResponderPreguntas.css";

const ResponderPreguntas = () => {
  const { user, isAuthenticated } = useAuth0();
  const [activeTab, setActiveTab] = useState('1');
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modal, setModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [justification, setJustification] = useState("");
  const [expertId, setExpertId] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([
    {
      id: 1,
      title: "¿Cómo resolver esta ecuación diferencial?",
      body: "Tengo problemas para resolver esta ecuación diferencial de segundo orden...",
      price: 50,
      topicId: 1,
      deadline: "2025-03-02T23:58:37",
      userName: "Alice Johnson",
      answer: "Para resolver esta ecuación diferencial, debes...",
      rating: 3,
    },
    {
      id: 2,
      title: "¿Qué es la teoría de la relatividad?",
      body: "¿Podrías explicarme de manera sencilla qué es la teoría de la relatividad?",
      price: 30,
      topicId: 2,
      deadline: "2025-03-05T12:00:00",
      userName: "Bob Smith",
      answer: "La teoría de la relatividad fue desarrollada por Albert Einstein y...",

      rating: 5,
      imageUrl: "https://example.com/image2.jpg"
    }
  ]); // Definir answeredQuestions
  const [imagePreview, setImagePreview] = useState(null); // Estado para la previsualización de la imagen
  const [loading, setLoading] = useState(true); // Estado para la pantalla de carga

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const fetchExpertId = useCallback(async () => {
    try {
      const response = await userService.getAllUsers();
      const currentUser = response.data.data.find(u => u.auth0Id === user.sub);
      if (currentUser) {
        setExpertId(currentUser.id);
      }
    } catch (error) {
      console.error("Error fetching expert ID:", error);
    }
  }, [user.sub]);

  const fetchPendingQuestions = useCallback(async () => {
    if (isAuthenticated && expertId) {
      try {
        const filters = { expertId, status: "0" };
        const response = await questionService.filterQuestions(filters);
        const expertQuestions = response.data;

        // Obtener nombres de usuarios
        const questionsWithUserNames = await Promise.all(
          expertQuestions.map(async (question) => {
            const userResponse = await userService.getUserById(question.userId);
            const userName = userResponse.data.data ? `${userResponse.data.data.firstName} ${userResponse.data.data.lastName}` : "Usuario desconocido";
            return { ...question, userName };
          })
        );

        setPendingQuestions(questionsWithUserNames);
        if (questionsWithUserNames.length === 0) {
          console.log("El experto no tiene preguntas pendientes.");
        }
      } catch (error) {
        console.error("Error fetching pending questions:", error);
      } finally {
        setLoading(false); // Desactivar la pantalla de carga
      }
    }
  }, [isAuthenticated, expertId]);

  useEffect(() => {
    fetchExpertId();
  }, [fetchExpertId]);

  useEffect(() => {
    if (expertId) {
      fetchPendingQuestions();
      fetchTopics();
      const savedQuestion = sessionStorage.getItem('selectedQuestion');
      if (savedQuestion) {
        setSelectedQuestion(JSON.parse(savedQuestion));
        setModal(true);
      }
    }
  }, [expertId, fetchPendingQuestions]);

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
    setImagePreview(null); // Cerrar la previsualización de la imagen
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

  const handleImageClick = (imageUrl) => {
    setImagePreview(imageUrl);
  };

  if (loading) {
    return <Loading />;
  }

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
            {selectedQuestion.imageUrl && (
              <FormGroup>
                <Label for="questionImage"><strong>Imagen:</strong></Label>
                <Button color="link" onClick={() => handleImageClick(selectedQuestion.imageUrl)}>Ver imagen</Button>
              </FormGroup>
            )}
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
            {selectedQuestion.imageUrl && (
              <FormGroup>
                <Label for="questionImage"><strong>Imagen:</strong></Label>
                <Button color="link" onClick={() => handleImageClick(selectedQuestion.imageUrl)}>Ver imagen</Button>
              </FormGroup>
            )}
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
            {selectedQuestion.imageUrl && (
              <FormGroup>
                <Label for="questionImage"><strong>Imagen:</strong></Label>
                <Button color="link" onClick={() => handleImageClick(selectedQuestion.imageUrl)}>Ver imagen</Button>
              </FormGroup>
            )}
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

      {imagePreview && (
        <Modal isOpen={true} className="custom-modal" style={{ maxWidth: "800px" }} backdrop="static" keyboard={false}>
          <ModalHeader className="custom-modal-header">
            Previsualización de la imagen
          </ModalHeader>
          <ModalBody className="custom-modal-body">
            <img src={imagePreview} alt="Previsualización" style={{ width: "100%", height: "auto" }} />
          </ModalBody>
          <ModalFooter className="custom-modal-footer">
            <Button color="secondary" onClick={() => setImagePreview(null)}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      )}
    </Container>
  );
};

export default ResponderPreguntas;
