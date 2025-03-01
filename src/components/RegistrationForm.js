import React, { useState } from "react";
import { Form, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from "reactstrap";
import Select from "react-select";
import { FaInfoCircle } from "react-icons/fa";
import PrivacyPolicy from "../views/PrivacyPolicy";
import TermsAndConditions from "../views/TermsAndConditions";
import UserService from "../services/UserService";
import ImagenProfile from "../assets/ExpertoProfile.jpg";

const RegistrationForm = ({ user, toggleModal, setModalOpen }) => {
  const [ASKYuser, setASKYuser] = useState({
    firstName: "",
    lastName: "",
    email: user.email,
    isConsultant: false,
    biography: "",
    basePrice: 0,
    availability: true,
    profileImage: null,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyPolicyModal, setPrivacyPolicyModal] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [expertNotice, setExpertNotice] = useState(false);

  const handlePrivacyPolicyChange = (event) => {
    setPrivacyPolicyAccepted(event.target.checked);
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const handleChange = (eventOrOption) => {
    if (eventOrOption && eventOrOption.value !== undefined) {
      if (eventOrOption.value === true && !ASKYuser.isConsultant) {
        setExpertNotice(true); // Mostrar el aviso si selecciona "Sí" por primera vez
      }
      setASKYuser((prevUser) => ({
        ...prevUser,
        isConsultant: eventOrOption.value,
      }));
    } else if (eventOrOption?.target) {
      const { name, value } = eventOrOption.target;
      if ((name === "firstName" || name === "lastName") && !/^[a-zA-Z\s]*$/.test(value)) {
        setMessage("Solo se permiten letras en los campos de Nombre y Apellido.");
        setModalOpen(true);
        return;
      }
      if (name === "basePrice" && value !== "" && (!/^\d+$/.test(value) || value < 0)) {
        setMessage("La Tarifa Base solo puede contener enteros positivos.");
        setModalOpen(true);
        return;
      }
      setASKYuser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setASKYuser((prevUser) => ({
        ...prevUser,
        profileImage: file,
      }));
    } else {
      setMessage("Solo se permiten archivos de imagen.");
      setModalOpen(true);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ASKYuser.firstName) newErrors.firstName = "El nombre es obligatorio";
    if (!ASKYuser.lastName) newErrors.lastName = "El apellido es obligatorio";
    if (ASKYuser.isConsultant) {
      if (!ASKYuser.biography) newErrors.biography = "La biografía es obligatoria";
      if (!ASKYuser.basePrice) newErrors.basePrice = "La tarifa base es obligatoria";
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const userData = {
      ...ASKYuser,
      auth0Id: user.sub,
      password: "123456789ASD!!!" // Añadir un valor por defecto para la contraseña
    };

    // Si no se adjunta una imagen de perfil, usar la imagen de perfil predeterminada
    if (!ASKYuser.profileImage) {
      const response = await fetch(ImagenProfile);
      const blob = await response.blob();
      const file = new File([blob], "ExpertoProfile.jpg", { type: blob.type });
      userData.profileImage = file;
    }

    console.log("Datos enviados a createUser:", userData); // Imprimir los datos en consola
    try {
      await UserService.createUser(userData);
      setMessage("Registro completado exitosamente.");
      setModalOpen(false); // Cerrar la ventana emergente
      window.dispatchEvent(new Event('profileImageUpdated')); // Despachar un evento personalizado para actualizar la imagen de perfil en el NavBar
    } catch (error) {
      console.error("Error al completar el registro:", error);
      setMessage("Error al completar el registro. Por favor, intenta nuevamente.");
      setModalOpen(true);
    }
  };

  const togglePrivacyPolicyModal = () => {
    setPrivacyPolicyModal(!privacyPolicyModal);
  };

  const toggleTermsModal = () => {
    setTermsModal(!termsModal);
  };

  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="profilePicture">Foto de Perfil</Label>
          <div className="profile-picture-container d-flex align-items-center">
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              className="form-control ml-3"
              accept="image/*" // Limitar a solo formatos de imagen
              onChange={handleFileChange}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="firstName">Nombre <span style={{ color: "red" }}>*</span></Label>
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
          {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Apellido <span style={{ color: "red" }}>*</span></Label>
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
          {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
        </FormGroup>
        <FormGroup>
          <Label for="email">Correo Electrónico <span style={{ color: "red" }}>*</span></Label>
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
          <Label for="isConsultant">¿Eres experto? <span style={{ color: "red" }}>*</span></Label>
          <Select
            id="isConsultant"
            options={[
              { value: true, label: "Si" },
              { value: false, label: "No" },
            ]}
            onChange={handleChange}
            name="isConsultant"
            placeholder={"Selecciona una opción"}
            className="select-dropdown"
            value={{ value: ASKYuser.isConsultant, label: ASKYuser.isConsultant ? "Si" : "No" }}
          />
          {expertNotice && (
            <p className="text-info">
              Este campo no se podrá modificar después. ¿Estás seguro de tu selección? Recuerda que si eres experto, aún puedes hacerle preguntas a otros expertos.
            </p>
          )}
        </FormGroup>
        {ASKYuser.isConsultant && (
          <>
            <FormGroup>
              <Label for="biography">Biografía <span style={{ color: "red" }}>*</span></Label>
              <textarea
                id="biography"
                name="biography"
                maxLength="1000" // Límite de 1000 caracteres
                className="form-control"
                placeholder="Escribe una breve biografía relacionada a tus campos de experiencia"
                value={ASKYuser.biography}
                onChange={handleChange}
              />
              <small className="form-text text-muted">
                {ASKYuser.biography.length}/1000 caracteres.
              </small>
              {errors.biography && <p className="text-danger">{errors.biography}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="baseRate">
                Tarifa Base (Askoins) <span style={{ color: "red" }}>*</span>{" "}
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
              {errors.basePrice && <p className="text-danger">{errors.basePrice}</p>}
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
            <Button color="link" onClick={togglePrivacyPolicyModal} className="p-0">
              política de privacidad.
            </Button>
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
            <Button color="link" onClick={toggleTermsModal} className="p-0">
              términos y condiciones.
            </Button>
          </Label>
        </FormGroup>
        <Button type="submit" className="submit-button mt-4" disabled={!privacyPolicyAccepted || !termsAccepted}>
          Terminar Registro
        </Button>
      </Form>
      <Modal isOpen={privacyPolicyModal} toggle={togglePrivacyPolicyModal} size="lg" backdrop="static">
        <ModalHeader toggle={togglePrivacyPolicyModal}>Política de Privacidad</ModalHeader>
        <ModalBody>
          <PrivacyPolicy />
        </ModalBody>
      </Modal>
      <Modal isOpen={termsModal} toggle={toggleTermsModal} size="lg" backdrop="static">
        <ModalHeader toggle={toggleTermsModal}>Términos y Condiciones</ModalHeader>
        <ModalBody>
          <TermsAndConditions />
        </ModalBody>
      </Modal>
    </>
  );
};

export default RegistrationForm;
