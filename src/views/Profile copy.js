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
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const [isConsultant, setIsConsultant] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [copRate, setCopRate] = useState(0);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [activeSection, setActiveSection] = useState("personalData");
  const [modal, setModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user.picture);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showExpertAlert, setShowExpertAlert] = useState(false);
  const [showExpertInfo, setShowExpertInfo] = useState(false);
  const [isUserRegistered, setUserRegistered] = useState(false);
  const [ASKYuser, setASKYuser] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [auth0Token, setAuth0Token] = useState("false");


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

  const handleExpertChange = (selectedOption) => {
    if (selectedOption.value === true) {
      setIsConsultant(true);
      setShowExpertInfo(true);
    } else {
      setIsConsultant(false);
      setShowExpertInfo(false);
    }
  };

  const handlePrivacyPolicyChange = (event) => {
    setPrivacyPolicyAccepted(event.target.checked);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const createFormData = (event) => {
    console.log("event", event)
    return {
      firstName: ASKYuser.firstName,
      lastName: ASKYuser.lastName,
      email: event.target.email.value,
      isConsultant: ASKYuser.isConsultant,
      subjects: selectedSubjects.map((subject) => subject.value),
      biography: ASKYuser.biography,
      baseRate: ASKYuser.baseRate,
      //profilePicture,
      //relatedTopics: relatedTopics.map((topic) => topic.value),
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!privacyPolicyAccepted || !termsAccepted) {
      setShowAlert(true);
      return;
    }
    if (isConsultant) {
      setShowExpertAlert(true);
    } else {
      const formData = createFormData(event);
      console.log("Datos del formulario:", formData);
      UserService.updateUser(formData)
    }
  };

  const handleExpertAlertConfirm = (event) => {
    setShowExpertAlert(false);
    const formData = createFormData(event);
    console.log("Datos del formulario:", formData);
  };

  const handleExpertAlertCancel = () => {
    setShowExpertAlert(false);
  };

  const expertOptions = [
    { value: true, label: "Si" },
    { value: false, label: "No" },
  ];

  console.log("auth0User", user)

  const handleDeleteAccount = async () => {
    const response = await fetch(`https://dev-csthezp5ifz25yr6.us.auth0.com/api/v2/users/${user.sub}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth0Token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se pudo eliminar la cuenta");
    }

    alert("Cuenta eliminada correctamente");
    logout({ logoutParams: { returnTo: window.location.origin } });
    console.log("Cuenta eliminada");
    toggleModal();
  };

  const handleChange = (eventOrOption) => {
    if (eventOrOption?.target) {
      // Caso: Input nativo
      const { name, value } = eventOrOption.target;
      setASKYuser((prevUser) => ({
        ...prevUser,
        [name]: value,
        availability: true,
        responseRate: 0,
        email: user.email,
        auth0Id: user.sub
      }));
      console.log("UPDT USR", ASKYuser)
    } else {
      // Caso: Select de react-select
      setASKYuser((prevUser) => ({
        ...prevUser,
        isConsultant: eventOrOption.value,
      }));
      setIsConsultant(eventOrOption.value)
      console.log("UPDT USR", ASKYuser)
    }

    setCopRate(ASKYuser.basePrice * 1000);
  };


  useEffect(() => {
    fetchTopics();
    fetchSubjects();
    fetchUsers();
    setCopRate(ASKYuser.basePrice * 1000);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "personalData":
        return (
          <Form className="profile-form" onSubmit={handleSubmit}>
            {!isUserRegistered ? <h3 className="form-title">Editar Perfil</h3> : <h3 className="form-title">Termina tu registro</h3>}
            <FormGroup>
              <Label for="profilePicture">Foto de Perfil</Label>
              <div className="profile-picture-container">
                <img src={profilePicture} alt="Foto de Perfil" className="profile-picture" />
                {/*<input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="form-control-file"
                />*/}
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
                onChange={handleChange}
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

            {(!isUserRegistered && isConsultant) && (
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
                  <small className="form-text text-muted">
                    Equivalente a COP: {ASKYuser.basePrice * 1000} pesos colombianos.
                  </small>
                </FormGroup>
                {showExpertInfo && (
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

            {showAlert && (
              <p className="text-danger">
                Debes aceptar la política de privacidad y los términos y condiciones para guardar los cambios.
              </p>
            )}

            <Button type="submit" className="submit-button mt-4">
              Guardar Cambios
            </Button>
            <Modal toggle={handleExpertAlertCancel}>
              <ModalHeader toggle={handleExpertAlertCancel}>Confirmar Cambios</ModalHeader>
              <ModalBody>
                Si guardas los cambios seleccionando que eres experto, no podrás dejar de ser experto nunca más. ¿Deseas continuar?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={handleExpertAlertConfirm}>Aceptar</Button>{' '}
                <Button color="secondary" onClick={handleExpertAlertCancel}>Cancelar</Button>
              </ModalFooter>
            </Modal>
          </Form>
        );

      case "notificationSettings":
        return (
          <Form className="profile-form">
            <h3 className="form-title">Gestión de Notificaciones</h3>
            <FormGroup check>
              <Label check className="notification-label">
                <input type="checkbox" /> Recibir notificaciones por correo.
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check className="notification-label">
                <input type="checkbox" /> Recibir notificaciones en la aplicación.
              </Label>
            </FormGroup>
            <Button color="primary" className="submit-button mt-3">
              Guardar Cambios
            </Button>
          </Form>
        );
      case "deleteAccount":
        return (
          <Form className="profile-form">
            <h3 className="form-title">Eliminar mi cuenta</h3>
            <p className="text-danger">
              Advertencia: Al eliminar tu cuenta, perderás todos tus datos, incluyendo ganancias, historiales, calificaciones y demás información asociada a tu cuenta. Esta acción es irreversible.
            </p>
            <Button color="danger" className="delete-button mt-3" onClick={toggleModal}>
              Eliminar mi Cuenta
            </Button>
            <Modal isOpen={modal} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>Confirmar Eliminación de Cuenta</ModalHeader>
              <ModalBody>
                ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer y perderás todos tus datos.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={handleDeleteAccount}>Eliminar</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
              </ModalFooter>
            </Modal>
          </Form>
        );
      default:
        return null;
    }
  };

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
          {renderSection()}
        </Col>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});