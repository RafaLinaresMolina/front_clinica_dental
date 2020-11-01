import React, { useState } from "react";
import logo from "../../images/logo.png";
import GenericModal from "../../component/GenericModal";
import "../../component/GenericModal.scss";
import Login from "../../containers/login/Login";
import "../../containers/login/Login.scss";
import Register from "../../containers/register/Register";
import "../../containers/register/Register.scss";
import "./Header.scss";
function Header(props) {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const showModalLogin = () => {setShowLogin(true);};
  const hideModalLogin = () => {setShowLogin(false);};

  const showModalRegister = () => {setShowRegister(true);};
  const hideModalRegister = () => {setShowRegister(false);};

  return (
    <div className="homeContainer">
      
      <GenericModal show={showLogin} handleClose={hideModalLogin} header={3} title={"Iniciar sesión"}>
        <Login handleClose={hideModalLogin} />
      </GenericModal>

      <GenericModal show={showRegister} handleClose={hideModalRegister} header={3} title={"Registrarse"} >
        <Register handleClose={hideModalRegister} />
      </GenericModal>
      <div className="header">
        <div className="logoContainer">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="nameContainer">
          <h1>Una Clinica Dental </h1>
          <div>Como las de toda la vida</div>
        </div>
        <div className="buttons">
          <div className="turqButton" onClick={() => showModalLogin()}>
            Iniciar sesión
          </div>
          <div className="turqButton" onClick={() => showModalRegister()}>
            Registrarse
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
