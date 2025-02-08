import React, { useState, useEffect } from "react";
import { Container, Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import Select from "react-select";
import { motion } from "framer-motion";
import "../Styles/CatalogoExpertos.css";
import ExpertoProfile from "../assets/ExpertoProfile.jpg";

const CatalogoExpertos = () => {
  const [experts, setExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    topic: null,
    sortBy: null,
  });
  const [errors, setErrors] = useState({});

  const topicOptions = [
    { value: "", label: "Ninguno" },
    { value: "matematicas", label: "Matemáticas" },
    { value: "fisica", label: "Física" },
    { value: "programacion", label: "Programación" },
    { value: "idiomas", label: "Idiomas" },
    { value: "quimica", label: "Química" },
    { value: "historia", label: "Historia" },
  ];

  const sortOptions = [
    { value: "", label: "Ninguno" },
    { value: "relevance", label: "Relevancia" },
    { value: "price", label: "Precio de menor a mayor" },
    { value: "rating", label: "Calificación de mayor a menor" },
  ];

  useEffect(() => {
    // JSON de ejemplo para visualizar la vista del catálogo
    const exampleExperts = [
      {
        userId: 1,
        firstName: "Ana",
        lastName: "García",
        biography: "Experta en matemáticas y física.",
        averageRating: 4.8,
        basePrice: 30.0,
        topics: ["matematicas", "fisica"],
        availability: true,
        responseRate: 95,
      },
      {
        userId: 2,
        firstName: "Carlos",
        lastName: "Pérez",
        biography: "Especialista en programación y bases de datos.",
        averageRating: 4.7,
        basePrice: 40.0,
        topics: ["programacion"],
        availability: true,
        responseRate: 90,
      },
      {
        userId: 3,
        firstName: "María",
        lastName: "López",
        biography: "Profesora de idiomas con experiencia en inglés y francés.",
        averageRating: 4.9,
        basePrice: 35.0,
        topics: ["idiomas"],
        availability: true,
        responseRate: 98,
      },
      {
        userId: 4,
        firstName: "Frank",
        lastName: "Wilson",
        biography: "AI and Data Science expert, focusing on ML applications.",
        averageRating: 4.9,
        basePrice: 50.0,
        topics: ["programacion"],
        availability: true,
        responseRate: 98,
      },
      {
        userId: 5,
        firstName: "Laura",
        lastName: "Martínez",
        biography: "Química con especialización en química orgánica.",
        averageRating: 4.6,
        basePrice: 25.0,
        topics: ["quimica"],
        availability: true,
        responseRate: 85,
      },
      {
        userId: 6,
        firstName: "David",
        lastName: "Gómez",
        biography: "Historiador especializado en historia contemporánea.",
        averageRating: 4.5,
        basePrice: 20.0,
        topics: ["historia"],
        availability: true,
        responseRate: 80,
      },
    ];
    setExperts(exampleExperts);
    setFilteredExperts(exampleExperts);
  }, []);

  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filterExperts = () => {
    let filtered = experts;

    if (filters.name) {
      const normalizedFilterName = normalizeString(filters.name.toLowerCase());
      filtered = filtered.filter((expert) =>
        normalizeString(`${expert.firstName} ${expert.lastName}`).toLowerCase().includes(normalizedFilterName)
      );
    }

    if (filters.topic && filters.topic.value) {
      filtered = filtered.filter((expert) =>
        expert.topics.includes(filters.topic.value)
      );
    }

    if (filters.sortBy && filters.sortBy.value) {
      if (filters.sortBy.value === "price") {
        filtered = filtered.sort((a, b) => a.basePrice - b.basePrice);
      } else if (filters.sortBy.value === "rating") {
        filtered = filtered.sort((a, b) => b.averageRating - a.averageRating);
      } else if (filters.sortBy.value === "relevance") {
        filtered = filtered.sort((a, b) => b.responseRate - a.responseRate);
      }
    }

    setFilteredExperts(filtered);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    filterExperts();
  };

  return (
    <Container className="catalogo-expertos-container">
      <h1 className="text-center mb-4">Catálogo de Expertos</h1>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row form>
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
                options={topicOptions}
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
        <div className="text-center">
          <Button type="submit" color="primary" className="search-button">Buscar</Button>
        </div>
      </Form>
      <Row>
        {filteredExperts.map((expert) => (
          <Col md={12} key={expert.userId} className="mb-4">
            <motion.div className="expert-card-horizontal" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <img src={ExpertoProfile} alt="Foto de perfil" className="profile-picture" />
              <div className="expert-card-content">
                <h3>{`${expert.firstName} ${expert.lastName}`}</h3>
                <p>{expert.biography}</p>
                <p>Calificación: {expert.averageRating}</p>
                <p>Precio base: {expert.basePrice} Askoins</p>
              </div>
              <Button color="primary" className="ask-button" style={{ backgroundColor: "#0891b2", borderColor: "#0891b2", borderRadius: "20px", padding: "10px 20px" }}>Hacer pregunta</Button>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CatalogoExpertos;
