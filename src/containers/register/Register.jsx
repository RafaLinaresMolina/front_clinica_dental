import React, { useState } from "react";
import "./Register.scss"
import axios from 'axios';
const validationErrorMessages = {
  errorPassword: 'Passwords not contain minimum 8 characters, does not contains at least 1 special character, 1 Upercase and at leas 1 number',
  errorEmptyRequired: 'Required inputs came empty',
  errorEqualPassword: 'Passwords did not match',
}

const validateAndSend = async (register, validators) => {
  try{
    validators.setValidationEmptyRequired();
    validators.setValidationEqualPassword();
    validators.setValidationPassword();
    validators.setValidationEmptyRequired();
    let allOk = true;
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if(register.name === "" || register.lastName === "" || register.password === "" || register.email === ""){
      validators.setValidationEmptyRequired(validationErrorMessages.errorEmptyRequired);
      allOk = false;
    }else {
      validators.setValidationEmptyRequired();
    }
    if((register.password !== register.rePassword)){
      validators.setValidationEqualPassword(validationErrorMessages.errorEqualPassword);
      allOk = false;
    }else{
      validators.setValidationEqualPassword();
    }
    if(!passRegex.test(register.password)){
      validators.setValidationPassword(validationErrorMessages.errorPassword);
      allOk = false;
    }else{
      validators.setValidationPassword();
    }
    if(allOk){
      return await doRegister(register);
    }
  }catch(err){
    validators.setRequestError(JSON.stringify(err.response.data))
    throw err;
  }
}

const doRegister = async (register) => {
  try{
    return await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`,register);
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

  const [validationPassword, setValidationPassword] = useState();
  const [validationEmptyRequired, setValidationEmptyRequired] = useState();
  const [validationEqualPassword, setValidationEqualPassword] = useState();
  const [requestError, setRequestError] = useState();

  const validators = {setValidationPassword, setValidationEmptyRequired, setValidationEqualPassword, setRequestError};

  const eventHandler = (ev) => {
    setRegister({ ...register, [ev.target.name]: ev.target.type !== "checkbox" ? ev.target.value : ev.target.checked});
    validators.setValidationEmptyRequired();
    validators.setValidationEqualPassword();
    validators.setValidationPassword();
    validators.setValidationEmptyRequired();
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
          const ok = await validateAndSend(register, validators);
          if(ok){
            setTimeout(() => {
              props.handleClose();
            }, 1000);
          }
        }catch(err){
          console.log(err.message)
        }
       }}> Register </button>
      <div className={requestError ? 'errorToast' : null}>{requestError}</div>
      <div className={validationEmptyRequired ? 'warningToast' : null}>{validationEmptyRequired}</div>
      <div className={validationEqualPassword ? 'warningToast' : null}>{validationEqualPassword}</div>
      <div className={validationPassword ? 'warningToast' : null}>{validationPassword}</div>
    </div>

  );
}

export default Register;