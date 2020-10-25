import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import "./Header.scss";
function Header({ user, setUser }) {
  return (
    <div className="homeContainer">
      <div className="header">
        <div className="logoContainer">
          <img src={logo} className="logo" alt="logo"/>
        </div>
        <div className="nameContainer">
          <h1>Una Clinica Dental </h1>
          <div>Como las de toda la vida</div>
        </div>
        <div className="buttons">
            <Link className="turqButton" to="/login">
              Iniciar sesión
            </Link>
            <Link className="turqButton" to="/register">
              Registrarse
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
