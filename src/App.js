import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SobreNosotros from "./components/AboutUs";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import PrivacyPolicy from "./views/PrivacyPolicy";
import TermsAndConditions from "./views/TermsAndConditions";
import CatalogoExpertos from "./views/CatalogoExpertos";
import Preguntas from "./views/Preguntas";
import ResponderPreguntas from "./views/ResponderPreguntas";
import Askoins from "./views/Askoins"; // Importar la nueva vista
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import ProfileRegistrationModal from "./components/ProfileRegistrationModal";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import FAQ from "./views/FAQ";
initFontAwesome();

const App = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact>
              {isAuthenticated ? <Redirect to="/catalogo-expertos" /> : <Home />}
            </Route>
            <Route path="/profileRegistration" component={ProfileRegistrationModal} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
            <Route path="/faq" component={FAQ} />
            <Route path="/sobre-nosotros" component={SobreNosotros} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-and-conditions" component={TermsAndConditions} />
            <Route path="/catalogo-expertos" component={CatalogoExpertos} />
            <Route path="/preguntas" component={Preguntas} />
            <Route path="/responder-preguntas" component={ResponderPreguntas} />
            <Route path="/askoins" component={Askoins} /> 
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
