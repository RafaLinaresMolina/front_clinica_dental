import React, { useState, useEffect } from "react";
import axios from "axios";
function ClientAppointmentForm(props) {
  const [appointment, setAppointment] = useState({
    name: "",
    lastName: "",
    address: "",
    covidPassed: false,
    email: "",
    password: "",
    rePassword: ""
  });
  
  const eventHandler = (ev) => {
    setAppointment({ ...appointment, [ev.target.name]: ev.target.type !== "checkbox" ? ev.target.value : ev.target.checked});
  };

  return (
    <div className="">
      <div className="registerForm">
   
      <label>* Nombre: <input type="text" name="name" required onChange={eventHandler}/></label> 
      <label>* Apellidos: <input type="text" name="lastName" required onChange={eventHandler}/></label> 
      <label className="checkCovid">Ha llegado a contraer el covid-19 ? <input onChange = {eventHandler} type="checkbox" name="covidPassed" /></label>
      <label> Direccion: <input type="text" onChange={eventHandler} name="address"/></label> 
      <label>* email: <input type="email" onChange={eventHandler} name="email" required/></label> 
      <label>* Contraseña: <input type="password" onChange={eventHandler} name="password" required/></label> 
      <label>* Confirmar contraseña: <input onChange={eventHandler} type="password" name="rePassword" required/></label> 
      
      
     <button className="turqButton" > Register </button>
    </div>
    </div>
  );
}

export default ClientAppointmentForm;
