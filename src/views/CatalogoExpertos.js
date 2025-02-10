import React, { useState, useEffect, useCallback } from "react";
import { Container, Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import Select from "react-select";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "../Styles/CatalogoExpertos.css";
import ExpertoProfile from "../assets/ExpertoProfile.jpg";
import expertService from "../services/ExpertsService";
import topicService from "../services/TopicService";

const CatalogoExpertos = () => {
  const [experts, setExperts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    topic: null,
    sortBy: null,
  });
  const [errors, setErrors] = useState({});

  const sortOptions = [
    { value: "", label: "Ninguno" },
    { value: "relevance", label: "Relevancia" },
    { value: "price", label: "Precio de menor a mayor" },
    { value: "rating", label: "Calificación de mayor a menor" },
  ];

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await topicService.getTopics();
      const topicOptions = response.data.data.map((topic) => ({
        value: topic.name,
        label: topic.name,
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
    } catch (error) {
      console.error("Error fetching experts:", error);
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
              <img src={ExpertoProfile} alt="Foto de perfil" className="profile-picture" />
              <div className="expert-card-content">
                <h3>{`${expert.firstName} ${expert.lastName}`}</h3>
                <p>{expert.biography}</p>
                <p>Calificación: <span style={{ fontSize: "13px" }}>{expert.averageRating}</span> <span style={{ verticalAlign: "top", marginLeft: "5px" }}>{renderStars(expert.averageRating)}</span></p>
                <p>Tarifa: {expert.basePrice} Askoins.</p>
                <p className="response-rate"><strong><em>Responde el {expert.responseRate}% de las veces.</em></strong></p>
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
