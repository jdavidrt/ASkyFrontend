import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Progress } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import userService from "../services/UserService";
import "../Styles/Askoins.css"; // Usar estilos propios
import { faWallet, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Askoins = () => {
  const { user, isAuthenticated } = useAuth0();
  const [askoinCount, setAskoinCount] = useState(0); // Inicializar el estado de ASKoins
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
        setAskoinCount(currentUser.amountAskoins || 0); // Actualizar el contador de ASKoins
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
          <h1 className="askoins-title">ASKoins</h1>
        </Col>
        <Col>
          <p className="askoins-subtitle">Tu saldo actual de ASKoins es: <strong>{askoinCount}</strong></p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Card className="askoins-item mb-4 h-100">
            <CardBody className="d-flex flex-column align-items-center text-center">
              <Button color="primary" className="view-more-button text-center" onClick={toggleRechargeModal}>
                Recargar ASKoins <FontAwesomeIcon icon={faWallet} style={{ marginRight: "0.5rem" }} />
              </Button>
              <CardText className="note-text">
                💡 Recarga tu saldo de ASKoins para poder realizar más consultas.
              </CardText>
            </CardBody>
          </Card>
        </Col>

        {isConsultant && (
          <Col md="6">
            <Card className="askoins-item mb-4 h-100">
              <CardBody className="d-flex flex-column align-items-center text-center">
                <Button color="secondary" className="view-more-button text-center" onClick={toggleWithdrawModal}>
                  Retirar ASKoins <FontAwesomeIcon icon={faMoneyBillWave} style={{ marginRight: "0.5rem" }} />
                </Button>
                <CardText className="note-text">
                  💸 Retira tus ASKoins acumulados a tu cuenta de PayPal.
                </CardText>
              </CardBody>
            </Card>
          </Col>

        )}
      </Row>

      <Modal isOpen={rechargeModal} toggle={toggleRechargeModal}>
        <ModalHeader
          toggle={toggleRechargeModal}
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            backgroundColor: "#0891b2",
            color: "white",
            textAlign: "center",
            padding: "15px",
            borderRadius: "8px 8px 0 0",
          }}
        >
          Recargar ASKoins
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="rechargeAmount" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Monto de recarga (<i>ASKoins</i>)
            </Label>
            <Input
              type="number"
              name="rechargeAmount"
              id="rechargeAmount"
              value={rechargeAmount}
              onChange={handleRechargeAmountChange}
              placeholder="Ingresa el monto a recargar"
              style={{ fontSize: "1.1rem", padding: "10px", borderRadius: "5px" }}
            />
          </FormGroup>

          {rechargeAmount && (
            <div className="recharge-summary">
              <h5 style={{ fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>Resumen de Recarga</h5>
              <p>
                <strong>Equivalente en pesos colombianos:</strong>
                <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#0891b2" }}> ${convertedAmount} COP</span>
              </p>
              <p>
                <strong>Comisión (10%):</strong>
                <span style={{ fontStyle: "italic", fontWeight: "bold", color: "#A2A2A2" }}> ${convertedAmount * 0.10} COP</span>
              </p>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold", textAlign: "center", marginTop: "10px" }}>
                Total a pagar: <span style={{ color: "#d97706" }}>${totalToPay} COP</span>
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            style={{
              backgroundColor: "#0891b2",
              borderColor: "#0891b2",
              fontSize: "1.1rem",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
            onClick={handleRecharge}
          >
            Recargar
          </Button>
          <Button color="secondary" onClick={toggleRechargeModal} style={{ fontSize: "1.1rem", padding: "10px 20px" }}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={withdrawModal} toggle={toggleWithdrawModal}>
        <ModalHeader
          toggle={toggleWithdrawModal}
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            backgroundColor: "#148E61",
            color: "white",
            textAlign: "center",
            padding: "15px",
            borderRadius: "8px 8px 0 0",
          }}
        >
          Retirar ASKoins
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="withdrawAmount" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Monto de retiro (<i>ASKoins</i>)
            </Label>
            <Input
              type="number"
              name="withdrawAmount"
              id="withdrawAmount"
              value={withdrawAmount}
              onChange={handleWithdrawAmountChange}
              placeholder="Ingresa el monto a retirar"
              style={{ fontSize: "1.1rem", padding: "10px", borderRadius: "5px" }}
            />
          </FormGroup>

          {withdrawAmount && (
            <div className="withdraw-summary">
              <h5 style={{ fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>Resumen de Retiro</h5>
              <p>
                <strong>Equivalente en pesos colombianos:</strong>
                <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#0891b2" }}> ${convertedAmount} COP</span>
              </p>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold", textAlign: "center", marginTop: "10px" }}>
                Total a retirar: <span style={{ color: "#1c64f2" }}>${convertedAmount} COP</span>
              </p>

              <Progress
                value={getProgressValue()}
                color={withdrawAmount >= 40 ? "success" : "warning"}
                style={{ height: "25px", borderRadius: "8px", marginTop: "10px" }}
              >
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                  {withdrawAmount >= 40 ? "Cantidad mínima alcanzada" : `${withdrawAmount} / 40 ASKoins`}
                </span>
              </Progress>
            </div>
          )}

          {withdrawError && (
            <p style={{ color: "red", fontSize: "1rem", textAlign: "center", marginTop: "10px" }}>
              ⚠️ {withdrawError}
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            style={{
              backgroundColor: "#148E61",
              borderColor: "#148E61",
              fontSize: "1.1rem",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
            disabled={withdrawAmount >= 40 ? false : true}
            onClick={handleWithdraw}
          >
            Retirar
          </Button>
          <Button color="secondary" onClick={toggleWithdrawModal} style={{ fontSize: "1.1rem", padding: "10px 20px" }}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Askoins;
