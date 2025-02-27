import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Button, Tooltip, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import "../Styles/Profile.css";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import TopicService from "../services/TopicService";
import SubjectsService from "../services/SubjectsService";

export const ProfileComponent = () => {
  const { user, logout } = useAuth0();
  const [isConsultant, setIsConsultant] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [activeSection, setActiveSection] = useState("personalData");
  const [modal, setModal] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isUserRegistered, setUserRegistered] = useState(false);
  const [ASKYuser, setASKYuser] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");


  const handleResetPassword = async () => {
    try {
      const response = await fetch(`https://dev-csthezp5ifz25yr6.us.auth0.com/dbconnections/change_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: "b0vLtveF0KnZZvtxk38tnLqGvkvEO1Xs",
          email: ASKYuser.email,
          connection: "Username-Password-Authentication",
        }),
      });

      if (response) {
        setMessage("Se ha enviado un correo con instrucciones para restablecer tu contraseña.");
      } else {
        setMessage("Hubo un error al enviar la solicitud. Por favor, intenta nuevamente.");
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor. Por favor, verifica tu conexión a internet.");
    }
    setModalOpen(true);
  };


  function findUserByEmail(usuarios, emailBuscado) {
    return usuarios.find(usuario => usuario.email === emailBuscado) || false;
  }

  function findASKYIdBySub(usuarios, auth0Id) {
    return usuarios.find(usuario => usuario.auth0Id === auth0Id) || false;
  }



  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      console.log("usuarios", response.data.data)
      console.log("usuario encontrado en users", findASKYIdBySub(response.data.data, user.sub).id)
      if (!findUserByEmail(response.data.data, user.email)) {
        console.log("usuario no registrado")
        setUserRegistered(false)
      } else {
        console.log("usuario YA registrado")
        const response2 = await UserService.getUserById(findASKYIdBySub(response.data.data, user.sub).id);
        console.log("ASKYuser", response2.data.data)
        setASKYuser(response2.data.data)
        setIsConsultant(true)
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const fetchTopics = async () => {
    try {
      const response = await TopicService.getAllTopics();
      console.log("topics", response.data.data)
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const formatSubjects = (subjects) => {
    return subjects.map(subject => ({ value: subject.name, label: subject.name }));
  };

  const fetchSubjects = async () => {
    try {
      const response = await SubjectsService.getAllSubjects();
      console.log("subjects", response.data.data);
      setSubjectOptions(formatSubjects(response.data.data));
      console.log("formatted subjects", subjectOptions);
    } catch (error) {
      console.error("Error fetching Subjects:", error);
    }
  };
  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handlePrivacyPolicyChange = (event) => {
    setPrivacyPolicyAccepted(event.target.checked);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    try {
      console.log("SUBMIIIIT BUTTON CLICKED");
      console.log("F. D.", ASKYuser);

      await UserService.updateUser(ASKYuser);

      console.log("Usuario actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };


  const expertOptions = [
    { value: true, label: "Si" },
    { value: false, label: "No" },
  ];

  console.log("auth0User", user)

  const handleChange = (eventOrOption) => {
    // Si proviene de un <Select> de react-select
    if (eventOrOption && eventOrOption.value !== undefined) {
      setASKYuser((prevUser) => ({
        ...prevUser,
        isConsultant: eventOrOption.value, // Guardar el valor de la opción seleccionada
        availability: true,
        email: user.email,
        auth0Id: user.sub,
        password: "123456789ASD!!!"
      }));
    }
    // Si proviene de un <input> nativo
    else if (eventOrOption?.target) {
      const { name, value } = eventOrOption.target;
      setASKYuser((prevUser) => ({
        ...prevUser,
        [name]: value, // Guardar el valor del input
        availability: true,
        email: user.email,
        auth0Id: user.sub,
        password: "123456789ASD!!!"
      }));
    }

    console.log("UPDT USR", ASKYuser);
  };



  useEffect(() => {
    fetchTopics();
    fetchSubjects();
    fetchUsers();
  }, []);

  return (
    <Container className="mb-5 profile-container">
      <Row>
        <Col md={3}>
          <div className="profile-sidebar">
            <Button
              color="link"
              className={`sidebar-button ${activeSection === "personalData" ? "active" : ""}`}
              onClick={() => setActiveSection("personalData")}
            >
              Información Personal
            </Button>
            <Button
              color="link"
              className={`sidebar-button ${activeSection === "changePassword" ? "active" : ""}`}
              onClick={handleResetPassword}
            >
              Cambio de Contraseña
            </Button>
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
              <ModalHeader toggle={() => setModalOpen(false)}>Confirmación</ModalHeader>
              <ModalBody>{message}</ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => setModalOpen(false)}>Aceptar</Button>
              </ModalFooter>
            </Modal>
            <Button
              color="link"
              className={`sidebar-button ${activeSection === "notificationSettings" ? "active" : ""}`}
              onClick={() => setActiveSection("notificationSettings")}
            >
              Gestión de Notificaciones
            </Button>
            <Button
              color="link"
              className={`sidebar-button ${activeSection === "deleteAccount" ? "active" : ""}`}
              onClick={() => setActiveSection("deleteAccount")}
            >
              Eliminar mi cuenta
            </Button>
          </div>
        </Col>
        <Col md={9}>
          <Form className="profile-form" onSubmit={handleSubmit}>
            {!isUserRegistered ? <h3 className="form-title">Editar Perfil</h3> : <h3 className="form-title">Termina tu registro</h3>}
            <FormGroup>
              <Label for="profilePicture">Foto de Perfil</Label>
              <div className="profile-picture-container">
                <img src={user.picture} alt="Foto de Perfil" className="profile-picture" />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="firstName">Nombre</Label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                maxLength="60"
                className="form-control"
                placeholder="Ingresa tu nombre"
                value={ASKYuser.firstName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Apellido</Label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                maxLength="60"
                className="form-control"
                placeholder="Ingresa tu apellido"
                value={ASKYuser.lastName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Correo Electrónico</Label>
              <input
                type="email"
                id="email"
                name="email"
                maxLength="60"
                className="form-control"
                placeholder="Ingresa tu correo"
                value={user.email}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="isConsultant">¿Eres experto?</Label>
              <Select
                id="isConsultant"
                options={expertOptions}
                onChange={handleChange}
                name="isConsultant"
                placeholder={"Selecciona una opción"}
                className="select-dropdown"
              />
            </FormGroup>
            {(ASKYuser.isConsultant) && (
              <>
                <FormGroup>
                  <Label for="biography">Biografía</Label>
                  <textarea
                    id="biography"
                    name="biography"
                    maxLength="500"
                    className="form-control"
                    placeholder="Escribe una breve biografía relacionada a tus campos de experiencia"
                    value={ASKYuser.biography}
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    {/*ASKYuser.biography.length /500 caracteres.*/}
                  </small>
                </FormGroup>
                <FormGroup>
                  <Label for="baseRate">
                    Tarifa Base (Askoins){" "}
                    <FaInfoCircle
                      id="infoTooltip"
                      style={{ cursor: "pointer" }}
                    />
                    <Tooltip
                      placement="right"
                      isOpen={tooltipOpen}
                      target="infoTooltip"
                      toggle={toggleTooltip}
                    >
                      Es recomendable poner una tarifa menor a 10 ASKoins.
                    </Tooltip>
                  </Label>
                  <input
                    type="number"
                    id="basePrice"
                    name="basePrice"
                    className="form-control"
                    placeholder="Ingresa tu tarifa base en Askoins para responder una pregunta"
                    onChange={handleChange}
                    value={ASKYuser.basePrice}
                  />
                  {ASKYuser.basePrice ?
                    <small className="form-text text-muted">
                      Equivalente a COP: {ASKYuser.basePrice * 1000} pesos colombianos.
                    </small>
                    :
                    ""}
                </FormGroup>
                {true && (
                  <p className="text-info">
                    Aunque selecciones ser experto, puedes seguir haciendo preguntas a otros expertos.
                  </p>
                )}
              </>
            )}
            <FormGroup check>
              <Label check className={`checkbox-label ${showAlert && !privacyPolicyAccepted ? "text-danger" : ""}`}>
                <input
                  type="checkbox"
                  checked={privacyPolicyAccepted}
                  onChange={handlePrivacyPolicyChange}
                />{" "}
                Acepto la{" "}
                <Link to="/privacy-policy" target="_blank">
                  política de privacidad.
                </Link>
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check className={`checkbox-label ${showAlert && !termsAccepted ? "text-danger" : ""}`}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                />{" "}
                Acepto los{" "}
                <Link to="/terms-and-conditions" target="_blank">
                  términos y condiciones.
                </Link>
              </Label>
            </FormGroup>
            <Button type="submit" className="submit-button mt-4" disabled={!privacyPolicyAccepted || !termsAccepted}>
              Guardar Cambios
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});