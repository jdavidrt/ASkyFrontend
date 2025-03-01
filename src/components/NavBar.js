import React, { useState, useEffect, useCallback } from "react";
import { NavLink as RouterNavLink, useHistory } from "react-router-dom"; // Importar useHistory
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox, faCoins } from "@fortawesome/free-solid-svg-icons"; // Cambiar el icono a una bandeja de entrada
import logo from "../assets/ASKYLogo.png";
import "../Styles/NavBar.css";
import DarkModeButton from "./DarkMode";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";
import userService from "../services/UserService";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConsultant, setIsConsultant] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para el dropdown
  const [askoinCount, setAskoinCount] = useState(0); // Inicializar el estado de ASKoins
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen); // Función para togglear el dropdown
  const history = useHistory(); // Inicializar useHistory

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

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });

  const handleLogoClick = () => {
    if (isAuthenticated) {
      history.push("/catalogo-expertos");
    } else {
      history.push("/");
    }
  };

  return (
    <div className="nav-container">
      <Navbar color="light" light expand="md" container={false}>
        <Container>
          <NavbarBrand onClick={handleLogoClick} style={{ cursor: "pointer" }}>
            <img src={logo} alt="ASKY Logo" width="50" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {isAuthenticated ? (
                <>
                  <NavItem>
                    <NavLink
                      tag={RouterNavLink}
                      to="/catalogo-expertos"
                      exact
                      activeClassName="router-link-exact-active"
                      className="nav-link-custom"
                    >
                      Catálogo de expertos
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={RouterNavLink}
                      to="/preguntas"
                      exact
                      activeClassName="router-link-exact-active"
                      className="nav-link-custom"
                    >
                      Mis Consultas
                    </NavLink>
                  </NavItem>
                  {isConsultant && (
                    <NavItem>
                      <NavLink
                        tag={RouterNavLink}
                        to="/responder-preguntas"
                        exact
                        activeClassName="router-link-exact-active"
                        className="nav-link-custom"
                      >
                        Responder consultas
                      </NavLink>
                    </NavItem>
                  )}
                  <NavItem>
                    <NavLink
                      tag={RouterNavLink}
                      to="/askoins"
                      exact
                      activeClassName="router-link-exact-active"
                      className="nav-link-custom"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#0891B2", // Color acorde al resto de la página
                        fontWeight: "bold",
                        fontSize: "1rem", // Ajustar tamaño de fuente
                      }}
                    >
                      <FontAwesomeIcon icon={faCoins} style={{ marginRight: "0.5rem" }} />
                      ASKoins <span style={{ marginLeft: "0.5rem", backgroundColor: "#0891B2", color: "white", borderRadius: "0.5rem", padding: "0.2rem 0.5rem" }}>{askoinCount}</span>
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <NavLink
                      tag={RouterNavLink}
                      to="/"
                      exact
                      activeClassName="router-link-exact-active"
                      className="nav-link-custom"
                    >
                      Inicio
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={RouterNavLink}
                      to="/sobre-nosotros"
                      exact
                      activeClassName="router-link-exact-active"
                      className="nav-link-custom"
                    >
                      Sobre Nosotros
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              <NavItem><DarkModeButton></DarkModeButton></NavItem>
              {isAuthenticated && (
                <>
                  <NavItem>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                      <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={dropdownOpen}
                        style={{
                          color: "#0891B2",
                          fontSize: "1.8rem",
                          cursor: "pointer",
                          padding: "0.5rem",
                          marginRight: "0.9rem",
                          transition: "transform 0.2s",
                          display: "inline-block" // Asegura que el elemento sea inline-block
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      >
                        <FontAwesomeIcon icon={faInbox} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Notificaciones</DropdownItem>
                        <DropdownItem>Opción 1</DropdownItem>
                        <DropdownItem>Opción 2</DropdownItem>
                        <DropdownItem>Opción 3</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </NavItem>
                </>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    style={{ backgroundColor: "#0891B2", borderColor: "#0891B2", color: "white" }}
                    onClick={() => loginWithRedirect()}
                  >
                    Iniciar Sesión
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && user && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Perfil
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Cerrar Sesión
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="Info"
                    block
                    onClick={() => loginWithRedirect()}
                  >
                    Iniciar Sesión
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && user && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
                style={{ minHeight: 170 }}
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{user.name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Perfil
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logoutWithRedirect()}
                  >
                    Cerrar Sesión
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
