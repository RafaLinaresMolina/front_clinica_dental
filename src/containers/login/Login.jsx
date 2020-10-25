import React, { useState } from "react";
import "./Login.scss";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import logo from "../../images/logo.png";


const validationErrorMessages = {
  errorEmptyRequired: 'Required inputs came empty'
}

const doLogin = async (login) => {
  try{
    const resLogin = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`,login);
    const token = resLogin.data.token;
    const headers = { headers: { Authorization: `Bearer ${token}` }};
    const resUser = await axios.get(process.env.REACT_APP_BASE_URL + '/auth/user',headers);
    console.log(resUser)
    const user = {
      name: resUser.data.name,
      lastName: resUser.data.lastName,
      email: resUser.data.email,
      address: resUser.data.address,
      roleId: resUser.data.roleId,
      token: token
    }
    localStorage.setItem('user',JSON.stringify(user));
    return user; 
  }catch(err){
      throw err;
  }
}

const validateAndSend = async (object, validators) => {
  try{
    validators.setValidationEmptyRequired();
    validators.setRequestError();
    if(object.password === "" || object.email === ""){
      validators.setValidationEmptyRequired(validationErrorMessages.errorEmptyRequired);
    }else {
      validators.setValidationEmptyRequired();
      return await doLogin(object);
    }
  }catch(err){
    validators.setRequestError(err.response.data.trace)
    throw err;
  }
}

function Login({user,setUser}) {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [validationEmptyRequired, setValidationEmptyRequired] = useState();
  const [requestError, setRequestError] = useState();
  const [requestOk, setRequestOk] = useState();
  const validators = {setValidationEmptyRequired, setRequestError};

  const eventHandler = (ev) => {
    setLogin({ ...login, [ev.target.name]: ev.target.value });
    validators.setValidationEmptyRequired();
    validators.setRequestError();
  };

  const history = useHistory();
    
  return (
    <div className="loginContainer">
      <div className="innerHeader">
        <div className="logoContainer">
          <img src={logo} className="logo" alt="logo"/>
        </div>
        <div className="nameContainer">
          <h1>Login</h1>
        </div>
      </div>
      <div className="loginForm">
        <div className={requestError ? 'errorToast' : null}>{requestError}</div>
        <div className={validationEmptyRequired ? 'warningToast' : null}>{validationEmptyRequired}</div>
        <div className={requestOk ? 'correctToast' : null}>{requestOk}</div>
        <label> * Email: <input type="text" name="email" required onChange={eventHandler} placeholder="some@mail.com" /></label>
        <label> * Contraseña: <input type="password" name="password" required onChange={eventHandler} placeholder="password"/> </label>
        <button className="turqButton" onClick={async () => {
          try{
            const data = await validateAndSend(login, validators);
            console.log(data)
            setRequestOk(`Login correcto, bienvenido ${data.name}`)
            if(data){
              setTimeout(() => {
                setUser(data);
                history.push('/dashboard')
              }, 1500);
            }
          }catch(err){
            console.log(err.message)
          }
        }}> Login </button>
      </div>
    </div>
  );
};

export default Login;
