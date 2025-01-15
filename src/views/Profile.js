import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Button } from "reactstrap";
import Select from "react-select";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import "../Styles/Profile.css";

export const ProfileComponent = () => {
  const { user } = useAuth0();
  const [isExpert, setIsExpert] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleExpertChange = (selectedOption) => {
    setIsExpert(selectedOption.value === "yes");
  };

  const handleSubjectsChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions || []);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      isExpert,
      subjects: selectedSubjects.map((subject) => subject.value),
    };
    console.log("Datos del formulario:", formData);
    // Aquí puedes enviar formData a tu backend.
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
  ];

  return (
    <Container className="mb-5 profile-container">
      <Row className="align-items-center profile-header mb-4 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Form className="profile-form"  onSubmit={handleSubmit}>
            <h3 className="form-title">Editar Perfil</h3>

            <FormGroup>
              <Label for="firstName">Nombre</Label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                maxLength="60"
                className="form-control"
                placeholder="Ingresa tu nombre"
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
            )}

            <Button color="primary" className="submit-button">
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
