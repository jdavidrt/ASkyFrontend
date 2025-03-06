import React, { useState, useEffect, useCallback } from "react";
import { Container, Nav, NavItem, NavLink, TabContent, TabPane, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Alert } from "reactstrap";
import classnames from 'classnames';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import questionService from "../services/QuestionService";
import topicService from "../services/TopicService";
import userService from "../services/UserService";
import answerService from "../services/AnswerService";
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
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Definir answeredQuestions
  const [imagePreview, setImagePreview] = useState(null); // Estado para la previsualización de la imagen
  const [loading, setLoading] = useState(true); // Estado para la pantalla de carga
  const [answers, setAnswers] = useState([]); // Estado para las respuestas
  const [alertVisible, setAlertVisible] = useState(false); // Estado para controlar la visibilidad de la alerta
  const [alertMessage, setAlertMessage] = useState(""); // Estado para el mensaje de la alerta
  const [loadingAnsweredQuestions, setLoadingAnsweredQuestions] = useState(true); // Estado para la pantalla de carga de consultas respondidas

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

  const fetchAnsweredQuestions = useCallback(async () => {
    if (isAuthenticated && expertId) {
      try {
        const filtersResponded = {
          expertId: expertId,
          status: 1 // 1: Pregunta respondida
        };
        const filtersRejected = {
          expertId: expertId,
          status: 2 // 2: Pregunta rechazada
        };
        const responseResponded = await questionService.filterQuestions(filtersResponded);
        const responseRejected = await questionService.filterQuestions(filtersRejected);
        const combinedQuestions = [...responseResponded.data, ...responseRejected.data];

        // Obtener nombres de usuarios y estados
        const questionsWithDetails = await Promise.all(
          combinedQuestions.map(async (question) => {
            const userResponse = await userService.getUserById(question.userId);
            const userName = userResponse.data.data ? `${userResponse.data.data.firstName} ${userResponse.data.data.lastName}` : "Usuario desconocido";
            return { ...question, userName, status: question.status };
          })
        );

        // Ordenar las preguntas por fecha de creación (más reciente a menos reciente)
        questionsWithDetails.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setAnsweredQuestions(questionsWithDetails);
        setLoadingAnsweredQuestions(false); // Desactivar la pantalla de carga de consultas respondidas
      } catch (error) {
        console.error("Error fetching answered questions:", error);
        setLoadingAnsweredQuestions(false); // Desactivar la pantalla de carga en caso de error
      }
    }
  }, [isAuthenticated, expertId]);

  const fetchAnswers = useCallback(async () => {
    try {
      const response = await answerService.getAllAnswers();
      setAnswers(response.data.data); // Acceder a la propiedad 'data' del JSON
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  }, []);

  useEffect(() => {
    fetchExpertId();
  }, [fetchExpertId]);

  useEffect(() => {
    if (expertId) {
      fetchPendingQuestions();
      fetchAnsweredQuestions();
      fetchTopics();
      fetchAnswers();
      const savedQuestion = sessionStorage.getItem('selectedQuestion');
      if (savedQuestion) {
        setSelectedQuestion(JSON.parse(savedQuestion));
        setModal(true);
      }
    }
  }, [expertId, fetchPendingQuestions, fetchAnsweredQuestions, fetchAnswers]);

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

  const getAnswerForQuestion = (questionId) => {
    return answers.find(answer => answer.questionId === questionId);
  };

  const handleSendAnswer = async () => {
    const answerBody = document.getElementById('expertAnswer').value;
    const answerData = {
      type: 1,
      body: answerBody,
      questionId: selectedQuestion.id
    };

    try {
      await answerService.createAnswer(answerData);
      setAlertMessage("Respuesta enviada con éxito");
      setAlertVisible(true);
      handleCloseModal();
      fetchPendingQuestions();
      fetchAnsweredQuestions();
    } catch (error) {
      console.error("Error al enviar la respuesta:", error);
      setAlertMessage("Hubo un error al enviar la respuesta. Por favor, inténtalo de nuevo.");
      setAlertVisible(true);
    }
  };

  const handleSendRejection = async () => {
    const rejectionBody = document.getElementById('justification').value;
    const rejectionData = {
      type: 2,
      body: rejectionBody,
      questionId: selectedQuestion.id
    };

    try {
      await answerService.createAnswer(rejectionData);
      setAlertMessage("Justificación enviada con éxito");
      setAlertVisible(true);
      handleCloseRejectModal();
      fetchPendingQuestions();
      fetchAnsweredQuestions();
    } catch (error) {
      console.error("Error al enviar la justificación:", error);
      setAlertMessage("Hubo un error al enviar la justificación. Por favor, inténtalo de nuevo.");
      setAlertVisible(true);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (loadingAnsweredQuestions && activeTab === '2') {
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
          <p>Aquí podrás encontrar todas las preguntas que has respondido o rechazado.</p>
          <div className="question-list">
            {answeredQuestions.map((question) => (
              <div key={question.id} className="question-item">
                <div className="question-details">
                  <h5>{question.title}</h5>
                  <p><strong>Precio:</strong> {question.price} Askoins</p>
                  <p><strong>Tema relacionado:</strong> {getTopicName(question.topicId)}</p>
                  <p><strong>Plazo de tiempo:</strong> {new Date(question.deadline).toLocaleString()}</p>
                  <p><strong>Estado:</strong> {question.status === "1" ? "Respondida" : "Rechazada"}</p>
                  {question.rating > 0 && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p><strong>Calificación del usuario:</strong></p>
                      <div style={{ marginLeft: "10px" }}>{renderStars(question.rating)}</div>
                    </div>
                  )}
                </div>
                <div className="button-group">
                  <Button color="primary" className="view-more-button" onClick={() => toggleModal(question)}>
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabPane>
      </TabContent>

      {alertVisible && (
        <Alert color="success" isOpen={alertVisible} toggle={() => setAlertVisible(false)}>
          {alertMessage}
        </Alert>
      )}

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
            <Button color="primary" style={{ backgroundColor: "#0891b2", borderColor: "#0891b2" }} onClick={handleSendAnswer}>
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
            {selectedQuestion.status === "1" && getAnswerForQuestion(selectedQuestion.id) && (
              <FormGroup>
                <Label for="answerBody"><strong>Respuesta:</strong></Label>
                <Input type="textarea" name="answerBody" id="answerBody" value={getAnswerForQuestion(selectedQuestion.id).body} readOnly style={{ height: "150px" }} />
              </FormGroup>
            )}
            {selectedQuestion.status === "2" && getAnswerForQuestion(selectedQuestion.id) && (
              <FormGroup>
                <Label for="answerBody"><strong>Justificación:</strong></Label>
                <Input type="textarea" name="answerBody" id="answerBody" value={getAnswerForQuestion(selectedQuestion.id).body} readOnly style={{ height: "150px" }} />
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
            <Button color="primary" style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }} onClick={handleSendRejection}>
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
