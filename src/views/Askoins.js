import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import userService from "../services/UserService";
import "../Styles/Askoins.css"; // Usar estilos propios

const Askoins = () => {
  const { user, isAuthenticated } = useAuth0();
  const [askoinCount] = useState(100); // Cantidad fija de ASKoins
  const [isConsultant, setIsConsultant] = useState(false);

  const fetchUserConsultantStatus = useCallback(async () => {
    if (!user) return;
    try {
      const response = await userService.getAllUsers();
      const currentUser = response.data.data.find(u => u.auth0Id === user.sub);
      if (currentUser) {
        setIsConsultant(currentUser.isConsultant);
      }
    } catch (error) {
      console.error("Error fetching user consultant status:", error);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserConsultantStatus();
    }
  }, [isAuthenticated, user, fetchUserConsultantStatus]);

  return (
    <Container className="askoins-container mt-5">
      <Row>
        <Col>
          <h1 className="askoins-title">ASKoins</h1> {/* Aplicar la clase CSS */}
          <p>Tu saldo actual de ASKoins es: <strong>{askoinCount}</strong></p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Card className="askoins-item mb-4 h-100"> {/* Asegurar que las tarjetas tengan el mismo tamaño */}
            <CardBody>
              <CardTitle tag="h5">Recargar ASKoins</CardTitle>
              <CardText>Recarga tu saldo de ASKoins para poder realizar más consultas.</CardText>
              <Button color="primary" className="view-more-button">Recargar ASKoins</Button>
            </CardBody>
          </Card>
        </Col>
        {isConsultant && (
          <Col md="6">
            <Card className="askoins-item mb-4 h-100"> {/* Asegurar que las tarjetas tengan el mismo tamaño */}
              <CardBody>
                <CardTitle tag="h5">Retirar ASKoins</CardTitle>
                <CardText>Retira tus ASKoins acumulados a tu cuenta de Paypal.</CardText>
                <Button color="secondary" className="view-more-button view-more-button-secondary">Retirar ASKoins</Button>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Askoins;
