import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Button, Tooltip, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import "../Styles/Profile.css";
import { FaInfoCircle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import topicService from "../services/TopicService";
import SubjectsService from "../services/SubjectsService";
import { auth } from "express-oauth2-jwt-bearer";

export const ProfileComponent = () => {
  const { user, getAccessTokenSilently, logout } = useAuth0();
  const [isExpert, setIsExpert] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [baseRate, setBaseRate] = useState("");
  const [copRate, setCopRate] = useState(0);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [biography, setBiography] = useState("");
  const [relatedTopics, setRelatedTopics] = useState([]);
  const [activeSection, setActiveSection] = useState("personalData");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const [auth0Token, setAuth0Token] = useState("");

  const fetchToken = async () => {/*
    try {
      const token = await getAccessTokenSilently({
        audience: "https://dev-csthezp5ifz25yr6.us.auth0.com/api/v2/",
        scope: "delete:users",
      });
      setAuth0Token(token)
      console.log("Access Token:", token);
    } catch (error) {
      console.error("Error obteniendo el token:", error);
    }*/
  };


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
        setIsExpert(true)
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const fetchTopics = async () => {
    try {
      const response = await topicService.getAllTopics;
      console.log("topics", response.data.data)
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await SubjectsService.getAllSubjects;
      console.log("subjects", response.data.data)
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
      setIsExpert(true);
      setShowExpertInfo(true);
    } else {
      setIsExpert(false);
      setShowExpertInfo(false);
    }
  };

  const handleSubjectsChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions || []);
  };

  const handleBaseRateChange = (event) => {
    const rate = parseFloat(event.target.value) || 0;
    setBaseRate(event.target.value);
    setCopRate(rate * 1000);
  };

  const handleBiographyChange = (event) => {
    setBiography(event.target.value);
  };

  const handleRelatedTopicsChange = (selectedOptions) => {
    setRelatedTopics(selectedOptions || []);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrivacyPolicyChange = (event) => {
    setPrivacyPolicyAccepted(event.target.checked);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const getRelatedTopicsOptions = () => {
    const topics = {
      matematicas: [
        { value: "calculo", label: "Cálculo" },
        { value: "algebra", label: "Álgebra" },
        { value: "discretas", label: "Matemáticas Discretas" },
      ],
      fisica: [
        { value: "mecanica", label: "Mecánica" },
        { value: "termodinamica", label: "Termodinámica" },
        { value: "electromagnetismo", label: "Electromagnetismo" },
      ],
      programacion: [
        { value: "frontend", label: "Frontend" },
        { value: "backend", label: "Backend" },
        { value: "basesdedatos", label: "Bases de Datos" },
      ],
      idiomas: [
        { value: "ingles", label: "Inglés" },
        { value: "frances", label: "Francés" },
        { value: "aleman", label: "Alemán" },
      ],
      quimica: [
        { value: "organica", label: "Química Orgánica" },
        { value: "inorganica", label: "Química Inorgánica" },
        { value: "analitica", label: "Química Analítica" },
      ],
      historia: [
        { value: "antigua", label: "Historia Antigua" },
        { value: "moderna", label: "Historia Moderna" },
        { value: "contemporanea", label: "Historia Contemporánea" },
      ],
    };

    return selectedSubjects.flatMap((subject) => topics[subject.value] || []);
  };

  const createFormData = (event) => {
    console.log("event", event)
    return {
      firstName: ASKYuser.firstName,
      lastName: ASKYuser.lastName,
      //email: event.target.email.value,
      isExpert,
      //subjects: selectedSubjects.map((subject) => subject.value),
      biography: ASKYuser.biography,
      baseRate: parseFloat(baseRate),
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
    if (isExpert) {
      setShowExpertAlert(true);
    } else {
      const formData = createFormData(event);
      console.log("Datos del formulario:", formData);
      UserService.updateUser(formData)
      // Aquí puedes enviar formData a tu backend.
    }
  };

  const handleExpertAlertConfirm = (event) => {
    setShowExpertAlert(false);
    const formData = createFormData(event);
    console.log("Datos del formulario:", formData);
    // Aquí puedes enviar formData a tu backend.
  };

  const handleExpertAlertCancel = () => {
    setShowExpertAlert(false);
  };

  const createPasswordChangeData = (event) => {
    return {
      currentPassword: event.target.currentPassword.value,
      newPassword: event.target.newPassword.value,
      confirmPassword: event.target.confirmPassword.value,
    };
  };

  const handlePasswordChangeSubmit = (event) => {
    event.preventDefault();
    const passwordData = createPasswordChangeData(event);
    console.log("Datos de cambio de contraseña:", passwordData);
    // Aquí puedes enviar passwordData a tu backend.
  };

  const expertOptions = [
    { value: true, label: "Si" },
    { value: false, label: "No" },
  ];

  console.log("auth0 user", user)
  console.log("ASKY user", ASKYuser)
  const subjectOptions = [
    { value: "matematicas", label: "Matemáticas" },
    { value: "fisica", label: "Física" },
    { value: "programacion", label: "Programación" },
    { value: "idiomas", label: "Idiomas" },
    { value: "quimica", label: "Química" },
    { value: "historia", label: "Historia" },
  ];

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleDeleteAccount = async () => {// Ejemplo: myapp.auth0.com
    /*
        try {
          const response = await fetch(`https://dev-csthezp5ifz25yr6.us.auth0.com/api/v2/users/${user.sub}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${auth0Token}`,
              "Content-Type": "application/json",
            },
          });
    
          if (response.ok) {
            setMessage("Tu cuenta ha sido eliminada correctamente.");
            setTimeout(() => {
              logout(); // Cierra la sesión después de eliminar la cuenta
            }, 2000);
          } else {
            setMessage("Hubo un error al eliminar la cuenta. Inténtalo nuevamente.");
          }
        } catch (error) {
          setMessage("Error de conexión con el servidor.");
        }*/
    setModalOpen(true);
    console.log("Cuenta eliminada");

    toggleModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedUser = {
      ...ASKYuser,
      [name]: value, // Usa el name del input como clave
    };
    setCopRate(updatedUser.baseRate * 1000);
    console.log("updated user", updatedUser)

    setASKYuser(updatedUser); // Notifica al componente padre si es necesario
  };


  useEffect(() => {
    fetchToken();
    fetchUsers();
    fetchTopics();
    fetchSubjects();
  }, []); // 👈 Array vacío asegura que solo se ejecute una vez


  const renderSection = () => {

    switch (activeSection) {
      case "personalData":
        return (
          <Form className="profile-form" onSubmit={handleSubmit}>
            {isUserRegistered ? <h3 className="form-title">Editar Perfil</h3> : <h3 className="form-title">Termina tu registro</h3>}
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
                defaultValue={ASKYuser.email}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="isConsultant">¿Eres experto?</Label>
              <Select
                id="isConsultant"
                options={expertOptions}
                onChange={handleExpertChange}
                value={expertOptions.find((option) => option.value === isExpert)}
                placeholder={"Selecciona una opción"}
                className="select-dropdown"
              />
            </FormGroup>

            {(!isUserRegistered && isExpert) && (
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
                    {biography.length}/500 caracteres.
                  </small>
                </FormGroup>
                {false && <>
                  <FormGroup>
                    <Label for="expertSubjects">Asignaturas donde eres experto</Label>
                    <Select
                      id="expertSubjects"
                      options={subjectOptions}
                      onChange={handleSubjectsChange}
                      placeholder="Selecciona tus áreas de experiencia"
                      isMulti
                      className="select-dropdown"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="relatedTopics">Temas Relacionados</Label>
                    <Select
                      id="relatedTopics"
                      options={getRelatedTopicsOptions()}
                      onChange={handleRelatedTopicsChange}
                      placeholder="Selecciona los temas relacionados"
                      isMulti
                      className="select-dropdown"
                    />
                  </FormGroup>
                </>
                }

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
                      Es recomendable poner una tarifa menor a 10 askoins.
                    </Tooltip>
                  </Label>
                  <input
                    type="number"
                    id="basePrice"
                    name="basePrice"
                    value={ASKYuser.basePrice}
                    className="form-control"
                    placeholder="Ingresa tu tarifa base en Askoins para responder una pregunta"
                    onChange={handleChange}
                  />
                  <small className="form-text text-muted">
                    Equivalente a COP: {copRate} pesos colombianos.
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

            <Button color="primary" className="submit-button mt-4" disabled={!privacyPolicyAccepted || !termsAccepted}>
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
      case "changePassword":
        return (
          <Form className="profile-form" onSubmit={handlePasswordChangeSubmit}>
            <h3 className="form-title">Cambio de Contraseña</h3>
            <FormGroup>
              <Label for="currentPassword">Contraseña Actual</Label>
              <div className="password-input">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  className="form-control"
                  placeholder="Ingresa tu contraseña actual"
                />
                <Button
                  type="button"
                  className="password-toggle"
                  onClick={toggleShowCurrentPassword}
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="newPassword">Nueva Contraseña</Label>
              <div className="password-input">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                  placeholder="Ingresa tu nueva contraseña"
                />
                <Button
                  type="button"
                  className="password-toggle"
                  onClick={toggleShowNewPassword}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirmar Nueva Contraseña</Label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirma tu nueva contraseña"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <Button
                  type="button"
                  className="password-toggle"
                  onClick={toggleShowConfirmPassword}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </FormGroup>
            {/* Botón para solicitar cambio de contraseña */}
            <Button
              color="link"
              className="sidebar-button"
              onClick={handleResetPassword}
            >
              Cambio de Contraseña
            </Button>

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
