import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Hero from "../components/Hero";
import LandingPage from "../components/LandingPage";

const Home = () => {
  const { isAuthenticated } = useAuth0();
  console.log("User Auth:", isAuthenticated)

  return (
    <Fragment>
      <LandingPage />
    </Fragment>
  );
};

export default Home;
