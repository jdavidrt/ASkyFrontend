import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Tooltip } from "reactstrap";
import Select from "react-select";
import { useAuth0 } from "@auth0/auth0-react";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/Profile.css";

const ProfileRegistrationModal = ({ isOpen, toggle }) => {
  const { user } = useAuth0();
  const [isExpert, setIsExpert] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [baseRate, setBaseRate] = useState("");
  const [copRate, setCopRate] = useState(0);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [biography, setBiography] = useState("");
  const [relatedTopics, setRelatedTopics] = useState([]);
  const [profilePicture, setProfilePicture] = useState(user.picture);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showExpertAlert, setShowExpertAlert] = useState(false);
  const [showExpertInfo, setShowExpertInfo] = useState(false);

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const handleExpertChange = (selectedOption) => {
    setIsExpert(selectedOption.value === "yes");
    if (selectedOption.value === "yes") {
      setShowExpertInfo(true);
    } else {
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
    return {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      isExpert,
      subjects: selectedSubjects.map((subject) => subject.value),
      biography: event.target.biography?.value,
      baseRate: parseFloat(baseRate),
      profilePicture,
      relatedTopics: relatedTopics.map((topic) => topic.value),
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
      // Aquí puedes enviar formData a tu backend.
      toggle(); // Cerrar la ventana emergente después de guardar cambios
    }
  };

  const handleExpertAlertConfirm = (event) => {
    setShowExpertAlert(false);
    const formData = createFormData(event);
    console.log("Datos del formulario:", formData);
    // Aquí puedes enviar formData a tu backend.
    toggle(); // Cerrar la ventana emergente después de guardar cambios
  };

  const handleExpertAlertCancel = () => {
    setShowExpertAlert(false);
  };

  const expertOptions = [
    { value: "no", label: "No" },
    { value: "yes", label: "Sí" },
  ];

  const subjectOptions = [
    { value: "matematicas", label: "Matemáticas" },
    { value: "fisica", label: "Física" },
    { value: "programacion", label: "Programación" },
    { value: "idiomas", label: "Idiomas" },
    { value: "quimica", label: "Química" },
    { value: "historia", label: "Historia" },
  ];

  return (
    <Modal isOpen={isOpen} backdrop="static" keyboard={false}>
      <ModalHeader>Registro de Perfil</ModalHeader>
      <ModalBody>
        <Form className="profile-form" onSubmit={handleSubmit}>
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
              defaultValue={user.given_name}
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
              defaultValue={user.family_name}
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
            {showExpertInfo && (
              <p className="text-info mt-2">
                Aunque selecciones ser experto, puedes seguir haciendo preguntas a otros expertos.
              </p>
            )}
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
          <Modal isOpen={showExpertAlert} toggle={handleExpertAlertCancel}>
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
      </ModalBody>
    </Modal>
  );
};

export default ProfileRegistrationModal;
