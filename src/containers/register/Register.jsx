import React, { useState } from "react";
import "./Register.scss"
import axios from 'axios';
import { connect } from "react-redux";
import { ERROR_NOTIFICATION, SUCCSESS_NOTIFICATION, WARNING_NOTIFICATION } from "../../redux/types";
const validationErrorMessages = {
  errorPassword: 'Passwords not contain minimum 8 characters, does not contains at least 1 special character, 1 Upercase and at leas 1 number',
  errorEmptyRequired: 'Required inputs came empty',
  errorEqualPassword: 'Passwords did not match',
}

const validateAndSend = async (register, props) => {
  try{

    let notificationMessage = [];

    let allOk = true;
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if(register.name === "" || register.lastName === "" || register.password === "" || register.email === ""){
      
      notificationMessage.push(validationErrorMessages.errorEmptyRequired);
      allOk = false;
    }
    if((register.password !== register.rePassword)){
      notificationMessage.push(validationErrorMessages.errorEqualPassword);
      allOk = false;
    }
    if(!passRegex.test(register.password)){
      notificationMessage.push(validationErrorMessages.errorPassword)
      allOk = false;
    }
    if(allOk){
      return await doRegister(register, props);
    } else {
      props.dispatch({
        type: WARNING_NOTIFICATION,
        payload: {
          notification: {
            title: "Advertencia",
            msg: notificationMessage,
          },
          show: true,
        },
      });
    }
  }catch(err){
    props.dispatch({
      type: ERROR_NOTIFICATION,
      payload: {
        notification: {
          title: "Error",
          msg: err.response.data.trace,
        },
        show: true,
      },
    });
    throw err;
  }
}

const doRegister = async (register, props) => {
  try{
    const resLogin = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`,register);
    props.dispatch({
      type: SUCCSESS_NOTIFICATION,
      payload: {
        notification: {
          title: "Registro correcto",
          msg: `Gracias por hacerte una cuenta con nosotros ${register.name}`,
        },
        show: true,
      },
    });
    return resLogin.data;
  }catch(err){
    throw err;
  }
}

function Register(props) {
  const [register, setRegister] = useState({
    name: "",
    lastName: "",
    address: "",
    covidPassed: false,
    email: "",
    password: "",
    rePassword: ""
  });

  const eventHandler = (ev) => {
    setRegister({ ...register, [ev.target.name]: ev.target.type !== "checkbox" ? ev.target.value : ev.target.checked});
  };

  return (

    <div className="registerForm">
   
      <label>* Nombre: <input type="text" name="name" required onChange={eventHandler}/></label> 
      <label>* Apellidos: <input type="text" name="lastName" required onChange={eventHandler}/></label> 
      <label className="checkCovid">Ha llegado a contraer el covid-19 ? <input onChange = {eventHandler} type="checkbox" name="covidPassed" /></label>
      <label> Direccion: <input type="text" onChange={eventHandler} name="address"/></label> 
      <label>* email: <input type="email" onChange={eventHandler} name="email" required/></label> 
      <label>* Contraseña: <input type="password" onChange={eventHandler} name="password" required/></label> 
      <label>* Confirmar contraseña: <input onChange={eventHandler} type="password" name="rePassword" required/></label> 
      
      
     <button className="turqButton" onClick={async () => {
        try{
          const ok = await validateAndSend(register, props);
          if(ok){
            setTimeout(() => {
              props.handleClose();
            }, 1000);
          }
        }catch(err){
          console.log(err.message)
        }
       }}> Register </button>
    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    errorNotification: state.errorNotification,
    warningNotification: state.warningNotification,
    successNotification: state.successNotification,
    infoNotification: state.infoNotification,
  };
};

export default connect(mapStateToProps)(Register);