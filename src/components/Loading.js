import React from "react";
import logo from "../assets/ASKYLogo.png";
import "../Styles/Loading.css";

const Loading = () => (
  <div className="loading-container">
    <img src={logo} alt="Loading" className="loading-logo" />
    <div className="loading-spinner"></div>
  </div>
);

export default Loading;
