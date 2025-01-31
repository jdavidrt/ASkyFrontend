import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Button, Tooltip, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import "../Styles/Profile.css";
import { FaInfoCircle } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ProfileComponent = () => {
  const { user } = useAuth0();
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

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleExpertChange = (selectedOption) => {
    setIsExpert(selectedOption.value === "yes");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!privacyPolicyAccepted || !termsAccepted) {
      setShowAlert(true);
      return;
    }
    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      isExpert,
      subjects: selectedSubjects.map((subject) => subject.value),
      biography: event.target.biography?.value,
      baseRate: parseFloat(baseRate),
      profilePicture,
    };
    console.log("Datos del formulario:", formData);
    // Aquí puedes enviar formData a tu backend.
  };

  const expertOptions = [
    { value: "no", label: "No" },
    { value: "yes", label: "Sí" },
  ];

  console.log(user)
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

  const handleDeleteAccount = () => {
    // Aquí puedes agregar la lógica para eliminar la cuenta
    console.log("Cuenta eliminada");
    toggleModal();
  };

  const renderSection = () => {
    switch (activeSection) {
      case "personalData":
        return (
          <Form className="profile-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Editar Perfil</h3>

            <FormGroup>
              <Label for="profilePicture">Foto de Perfil</Label>
              <div className="profile-picture-container">
                <img src={profilePicture} alt="Foto de Perfil" className="profile-picture" />
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="form-control-file"
                />
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
                value={user.given_name}
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
                value={user.family_name}
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
                defaultValue={user.email}
                disabled
              />
            </FormGroup>

            <FormGroup>
              <Label for="isExpert">¿Eres experto?</Label>
              <Select
                id="isExpert"
                options={expertOptions}
                onChange={handleExpertChange}
                placeholder="Selecciona una opción"
                className="select-dropdown"
              />
            </FormGroup>

            {isExpert && (
              <>
                <FormGroup>
                  <Label for="biography">Biografía</Label>
                  <textarea
                    id="biography"
                    name="biography"
                    maxLength="500"
                    className="form-control"
                    placeholder="Escribe una breve biografía relacionada a tus campos de experiencia"
                    value={biography}
                    onChange={handleBiographyChange}
                  />
                  <small className="form-text text-muted">
                    {biography.length}/500 caracteres.
                  </small>
                </FormGroup>
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
                    id="baseRate"
                    name="baseRate"
                    className="form-control"
                    placeholder="Ingresa tu tarifa base en Askoins para responder una pregunta"
                    value={baseRate}
                    onChange={handleBaseRateChange}
                  />
                  <small className="form-text text-muted">
                    Equivalente a COP: {copRate} pesos colombianos.
                  </small>
                </FormGroup>
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
                  política de privacidad
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
                  términos y condiciones
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
          </Form>
        );
      case "changePassword":
        return (
          <Form className="profile-form">
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
            <Button color="primary" className="submit-button">
              Cambiar contraseña
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
                <input type="checkbox"  /> Recibir notificaciones en la aplicación.
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
              onClick={() => setActiveSection("changePassword")}
            >
              Cambio de Contraseña
            </Button>
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
