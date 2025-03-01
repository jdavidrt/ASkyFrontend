import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Progress } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import userService from "../services/UserService";
import "../Styles/Askoins.css"; // Usar estilos propios

const Askoins = () => {
  const { user, isAuthenticated } = useAuth0();
  const [askoinCount] = useState(100); // Cantidad fija de ASKoins
  const [isConsultant, setIsConsultant] = useState(false);
  const [rechargeModal, setRechargeModal] = useState(false); // Estado para la ventana emergente de recarga
  const [withdrawModal, setWithdrawModal] = useState(false); // Estado para la ventana emergente de retiro
  const [rechargeAmount, setRechargeAmount] = useState(""); // Estado para el monto de recarga
  const [withdrawAmount, setWithdrawAmount] = useState(""); // Estado para el monto de retiro
  const [convertedAmount, setConvertedAmount] = useState(0); // Estado para el monto convertido
  const [totalToPay, setTotalToPay] = useState(0); // Estado para el total a pagar
  const [withdrawError, setWithdrawError] = useState(""); // Estado para el mensaje de error de retiro

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

  const toggleRechargeModal = () => {
    setRechargeModal(!rechargeModal);
  };

  const toggleWithdrawModal = () => {
    setWithdrawModal(!withdrawModal);
    setWithdrawError(""); // Limpiar el mensaje de error al abrir/cerrar el modal
  };

  const handleRechargeAmountChange = (e) => {
    const amount = e.target.value;
    const conversionRate = 1000;
    const commissionRate = 0.10;
    const converted = amount * conversionRate;
    const commission = converted * commissionRate;
    const total = converted + commission;

    setRechargeAmount(amount);
    setConvertedAmount(converted);
    setTotalToPay(total);
  };

  const handleWithdrawAmountChange = (e) => {
    const amount = e.target.value;
    const conversionRate = 1000;
    const converted = amount * conversionRate;

    setWithdrawAmount(amount);
    setConvertedAmount(converted);
    setWithdrawError(""); // Limpiar el mensaje de error al cambiar la cantidad
  };

  const handleRecharge = () => {
    // Lógica para recargar ASKoins
    console.log(`Recargando ${rechargeAmount} ASKoins (${convertedAmount} pesos colombianos)`);
    setRechargeAmount("");
    setConvertedAmount(0);
    setTotalToPay(0);
    toggleRechargeModal();
  };

  const handleWithdraw = () => {
    if (withdrawAmount < 40) {
      setWithdrawError("No se puede retirar menos de 40 ASKoins.");
      return;
    }
    // Lógica para retirar ASKoins
    console.log(`Retirando ${withdrawAmount} ASKoins (${convertedAmount} pesos colombianos)`);
    setWithdrawAmount("");
    setConvertedAmount(0);
    toggleWithdrawModal();
  };

  const getProgressValue = () => {
    return (withdrawAmount / 40) * 100;
  };

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
              <Button color="primary" className="view-more-button" onClick={toggleRechargeModal}>Recargar ASKoins</Button>
            </CardBody>
          </Card>
        </Col>
        {isConsultant && (
          <Col md="6">
            <Card className="askoins-item mb-4 h-100"> {/* Asegurar que las tarjetas tengan el mismo tamaño */}
              <CardBody>
                <CardTitle tag="h5">Retirar ASKoins</CardTitle>
                <CardText>Retira tus ASKoins acumulados a tu cuenta de Paypal.</CardText>
                <Button color="secondary" className="view-more-button view-more-button-secondary" onClick={toggleWithdrawModal}>Retirar ASKoins</Button>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>

      <Modal isOpen={rechargeModal} toggle={toggleRechargeModal}>
        <ModalHeader toggle={toggleRechargeModal}>Recargar ASKoins</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="rechargeAmount">Monto de recarga (ASKoins)</Label>
            <Input
              type="number"
              name="rechargeAmount"
              id="rechargeAmount"
              value={rechargeAmount}
              onChange={handleRechargeAmountChange}
              placeholder="Ingresa el monto de ASKoins a recargar"
            />
          </FormGroup>
          {rechargeAmount && (
            <div className="recharge-summary">
              <>
                <p>Equivalente en pesos colombianos: <strong>{convertedAmount}</strong> COP</p>
                <p>Comisión (10%): <strong>{convertedAmount * 0.10}</strong> COP</p>
                <p>Total a pagar: <strong>{totalToPay}</strong> COP</p>
              </>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" style={{ backgroundColor: "#0891b2", borderColor: "#0891b2" }} onClick={handleRecharge}>Recargar</Button>
          <Button color="secondary" onClick={toggleRechargeModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={withdrawModal} toggle={toggleWithdrawModal}>
        <ModalHeader toggle={toggleWithdrawModal}>Retirar ASKoins</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="withdrawAmount">Monto de retiro (ASKoins)</Label>
            <Input
              type="number"
              name="withdrawAmount"
              id="withdrawAmount"
              value={withdrawAmount}
              onChange={handleWithdrawAmountChange}
              placeholder="Ingresa el monto de ASKoins a retirar"
            />
          </FormGroup>
          {withdrawAmount && (
            <div className="recharge-summary">
              <p>Equivalente en pesos colombianos: <strong>{convertedAmount}</strong> COP</p>
              <p>Total a retirar: <strong>{convertedAmount}</strong> COP</p>
              <Progress value={getProgressValue()} color={withdrawAmount >= 40 ? "success" : "warning"}>
                {withdrawAmount >= 40 ? "Cantidad mínima alcanzada" : `${withdrawAmount} / 40 ASKoins`}
              </Progress>
            </div>
          )}
          {withdrawError && (
            <p style={{ color: "red" }}>{withdrawError}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" style={{ backgroundColor: "#0891b2", borderColor: "#0891b2" }} onClick={handleWithdraw}>Retirar</Button>
          <Button color="secondary" onClick={toggleWithdrawModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Askoins;
