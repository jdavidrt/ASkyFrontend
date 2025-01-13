import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Hero from "../components/Hero";
import LandingPage from "../components/LandingPage";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Fragment>
      {isAuthenticated ? <Hero /> : <LandingPage />}
    </Fragment>
  );
};

export default Home;
