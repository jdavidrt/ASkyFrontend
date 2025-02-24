import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

const Askoins = () => {
  const askoinCount = 100; // Cantidad fija de ASKoins

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>ASKoins</h1>
          <p>Tu saldo actual de ASKoins es: <strong>{askoinCount}</strong></p>
          <Button color="primary" className="mr-2">Recargar ASKoins</Button>
          <Button color="secondary">Retirar ASKoins</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Askoins;
