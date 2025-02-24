import React from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText } from "reactstrap";
import "../Styles/Askoins.css"; // Usar estilos propios

const Askoins = () => {
  const askoinCount = 100; // Cantidad fija de ASKoins

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
        <Col md="6">
          <Card className="askoins-item mb-4 h-100"> {/* Asegurar que las tarjetas tengan el mismo tamaño */}
            <CardBody>
              <CardTitle tag="h5">Retirar ASKoins</CardTitle>
              <CardText>Retira tus ASKoins acumulados a tu cuenta de Paypal.</CardText>
              <Button color="secondary" className="view-more-button view-more-button-secondary">Retirar ASKoins</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Askoins;
