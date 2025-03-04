import React, { useState, useEffect, useCallback } from "react";
import { Container, Form, FormGroup, Label, Input, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import "../Styles/CatalogoExpertos.css";
import expertService from "../services/ExpertsService";
import topicService from "../services/TopicService";
import questionService from "../services/QuestionService";
import userService from "../services/UserService";
import RegistrationForm from "../components/RegistrationForm";

const CatalogoExpertos = () => {
  const { user, isAuthenticated } = useAuth0();
  const [experts, setExperts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    topic: null,
    sortBy: null,
  });
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [questionTopic, setQuestionTopic] = useState(null);
  const [hours, setHours] = useState(2);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [askoinCount, setAskoinCount] = useState(0); // Estado para la cantidad de ASKoins
  const [loading, setLoading] = useState(true); // Estado para la pantalla de carga

  const sortOptions = [
    { value: "", label: "Ninguno" },
    { value: "relevance", label: "Relevancia" },
    { value: "price", label: "Precio de menor a mayor" },
    { value: "rating", label: "Calificación de mayor a menor" },
  ];

  const hourOptions = Array.from({ length: 23 }, (_, i) => ({ value: i + 2, label: `${i + 2} horas` }));

  const fetchUserId = useCallback(async () => {
    try {
      const response = await userService.getAllUsers();
      const currentUser = response.data.data.find(u => u.auth0Id === user.sub);
      if (currentUser) {
        setUserId(currentUser.id);
        setAskoinCount(currentUser.amountAskoins || 0); // Actualizar la cantidad de ASKoins
      }
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  }, [user.sub]);

  const fetchUserStatus = useCallback(async () => {
    if (!user) return;
    try {
      const response = await userService.getAllUsers();
      const currentUser = response.data.data.find(u => u.auth0Id === user.sub);
      if (!currentUser) {
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserStatus();
    }
  }, [isAuthenticated, user, fetchUserStatus]);

  useEffect(() => {
    fetchTopics();
    fetchUserId();
  }, [fetchUserId]);

  const fetchTopics = async () => {
    try {
      const response = await topicService.getTopics();
      const topicOptions = response.data.data.map((topic) => ({
        value: topic.name,
        label: topic.name,
        id: topic.id
      }));
      setTopics([{ value: "", label: "Ninguno" }, ...topicOptions]);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const fetchExperts = useCallback(async () => {
    try {
      const response = await expertService.searchExperts({
        name: filters.name,
        topic: filters.topic ? filters.topic.value : null,
        sortBy: filters.sortBy ? filters.sortBy.value : null,
      });
      let sortedExperts = response.data;
      if (filters.sortBy && filters.sortBy.value === "price") {
        sortedExperts = sortedExperts.sort((a, b) => a.basePrice - b.basePrice);
      } else if (filters.sortBy && filters.sortBy.value === "rating") {
        sortedExperts = sortedExperts.sort((a, b) => b.averageRating - a.averageRating);
      } else if (filters.sortBy && filters.sortBy.value === "relevance") {
        sortedExperts = sortedExperts.sort((a, b) => b.responseRate - a.responseRate);
      }
      setExperts(sortedExperts);
      setLoading(false); // Desactivar la pantalla de carga
    } catch (error) {
      console.error("Error fetching experts:", error);
      setLoading(false); // Desactivar la pantalla de carga en caso de error
    }
  }, [filters]);

  useEffect(() => {
    fetchExperts();
  }, [filters, fetchExperts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrors({ ...errors, [name]: "Solo se permiten letras" });
    } else {
      setErrors({ ...errors, [name]: "" });
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFilters({ ...filters, [name]: selectedOption });
  };

  const toggleModal = (expert) => {
    setSelectedExpert(expert);
    setModal(!modal);
    if (!modal) {
      setTitle("");
      setQuestion("");
      setPrice("");
      setQuestionTopic(null);
      setHours(2);
      setErrors({});
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleQuestionTopicChange = (selectedOption) => {
    setQuestionTopic(selectedOption);
  };

  const handleHoursChange = (selectedOption) => {
    setHours(selectedOption.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageUrl(file);
    } else {
      setErrors({ ...errors, imageUrl: "Solo se permiten archivos de imagen" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "El título es obligatorio";
    if (title.length > 80) newErrors.title = "El título no puede tener más de 80 caracteres";
    if (!question) newErrors.question = "La pregunta es obligatoria";
    if (question.length > 1000) newErrors.question = "La pregunta no puede tener más de 1000 caracteres";
    if (!price) newErrors.price = "El precio es obligatorio";
    if (price < 0) newErrors.price = "El precio no puede ser negativo";
    if (price > askoinCount) newErrors.price = "No tienes suficientes ASKoins para hacer esta pregunta";
    if (!questionTopic || questionTopic.value === "") newErrors.questionTopic = "El tema es obligatorio y no puede ser 'Ninguno'";
    return newErrors;
  };

  const handleSubmitQuestion = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const now = new Date();
    const deadlineDate = new Date(now.getTime() + hours * 3600000).toISOString().slice(0, 19); // Formato: 2025-03-02T23:58:37
    const questionData = {
      title: title,
      body: question,
      price: Number(price),
      topicId: Number(questionTopic.id),
      deadline: deadlineDate,
      expertId: selectedExpert.userId
    };

    if (imageUrl) {
      questionData.imageUrl = imageUrl;
    }

    console.log("Datos enviados a createQuestion:", questionData); // Imprimir los datos en consola

    try {
      await questionService.createQuestion(questionData, userId);
      console.log("Pregunta enviada exitosamente");
    } catch (error) {
      console.error("Error al enviar la pregunta:", error);
    }

    setModal(false);
    setTitle("");
    setPrice("");
    setQuestion("");
    setHours(2);
    setImageUrl(null);
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
    return <div className="stars">{stars}</div>;
  };

  const getProfileImageUrl = (expertId) => {
    const user = users.find(u => u.id === expertId);
    return user ? user.profileImageUrl : null;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container className="catalogo-expertos-container">
      <h1 className="text-center mb-4">Catálogo de Expertos</h1>
      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="name">Buscar por nombre</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Nombre del experto"
                value={filters.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="text-danger">{errors.name}</p>}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="topic">Filtrar por tema</Label>
              <Select
                name="topic"
                options={topics}
                placeholder="Selecciona un tema"
                value={filters.topic}
                onChange={handleSelectChange}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="sortBy">Ordenar por</Label>
              <Select
                name="sortBy"
                options={sortOptions}
                placeholder="Ordenar por"
                value={filters.sortBy}
                onChange={handleSelectChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <Row>
        {experts.map((expert) => (
          <Col md={12} key={expert.userId} className="mb-4">
            <motion.div className="expert-card-horizontal" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <img src={getProfileImageUrl(expert.userId)} alt="Foto de perfil" className="profile-picture" />
              <div className="expert-card-content">
                <h3>{`${expert.firstName} ${expert.lastName}`}</h3>
                <p>{expert.biography}</p>
                <p>Calificación: <span style={{ fontSize: "13px" }}>{expert.averageRating.toFixed(1)}</span> {renderStars(expert.averageRating)}</p>
                <p>Tarifa: {expert.basePrice} Askoins.</p>
                <p className="response-rate"><strong><em>Responde el {expert.responseRate}% de las veces.</em></strong></p>
              </div>
              <Button color="primary" className="ask-button" style={{ backgroundColor: "#0891b2", borderColor: "#0891b2", borderRadius: "20px", padding: "10px 20px" }} onClick={() => toggleModal(expert)} disabled={expert.userId === userId}>Hacer pregunta</Button>
            </motion.div>
          </Col>
        ))}
      </Row>
      <Modal isOpen={modal} toggle={toggleModal} className="custom-modal" style={{ maxWidth: "800px" }}>
        <ModalHeader toggle={toggleModal} className="custom-modal-header">Hacer pregunta a {selectedExpert && `${selectedExpert.firstName} ${selectedExpert.lastName}`}</ModalHeader>
        <ModalBody className="custom-modal-body">
          <FormGroup>
            <Label for="title">Título</Label>
            <Input type="text" name="title" id="title" value={title} onChange={handleTitleChange} />
            {errors.title && <p className="text-danger">{errors.title}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="question">Pregunta</Label>
            <Input type="textarea" name="question" id="question" value={question} onChange={handleQuestionChange} placeholder="Escribe tu pregunta aquí..." style={{ height: "150px" }} />
            {errors.question && <p className="text-danger">{errors.question}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="image">Adjuntar imagen</Label>
            <Input type="file" name="image" id="image" accept="image/*" onChange={handleImageChange} />
            {errors.imageUrl && <p className="text-danger">{errors.imageUrl}</p>}
          </FormGroup>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="questionTopic">Tema relacionado</Label>
                <Select
                  name="questionTopic"
                  options={topics}
                  placeholder="Selecciona un tema"
                  value={questionTopic}
                  onChange={handleQuestionTopicChange}
                />
                {errors.questionTopic && <p className="text-danger">{errors.questionTopic}</p>}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="price">Precio(Askoins)</Label>
                <Input type="number" name="price" id="price" value={price} onChange={handlePriceChange} style={{ fontSize: "14px" }} />
                {errors.price && <p className="text-danger">{errors.price}</p>}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="hours">Límite de tiempo</Label>
                <Select
                  name="hours"
                  options={hourOptions}
                  placeholder="Selecciona el límite de tiempo"
                  value={hourOptions.find(option => option.value === hours)}
                  onChange={handleHoursChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="custom-modal-footer">
          <Button color="primary" style={{ backgroundColor: "#0891b2", borderColor: "#0891b2" }} onClick={handleSubmitQuestion}>Enviar</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalOpen} size="lg" backdrop="static" modalClassName="no-minimize">
        <ModalHeader>Registro Incompleto</ModalHeader>
        <ModalBody>
          <RegistrationForm user={user} setModalOpen={setModalOpen} toggleModal={() => setModalOpen(false)} />
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default withAuthenticationRequired(CatalogoExpertos, {
  onRedirecting: () => <Loading />,
});
