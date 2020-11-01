import React, { useState } from "react";
import axios from "axios";
import Select from 'react-select'
import './ClientAppointmentForm.scss';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

function ClientAppointmentForm(props) {

  const [validationEmptyRequired, setValidationEmptyRequired] = useState();
  const [validationDateToday, setValidationDateToday] = useState();
  const [requestError, setRequestError] = useState();


  const initialDate = new Date();

  const [appointment, setAppointment] = useState({
    title: "",
    description: "",
    observations: "",
    date: initialDate,
  });

  const validationErrorMessages = {
    errorEmptyRequired: 'Required inputs came empty',
    errorDateToday: 'Date cannot be today',
  }


  const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
  };

  const validateAndSend = async (appointment, validators) => {
    try{
      validators.setValidationEmptyRequired();
      validators.setValidationDateToday();
      validators.setRequestError();
      let allOk = true;
      if(appointment.title === "" || appointment.description === ""){
        validators.setValidationEmptyRequired(validationErrorMessages.errorEmptyRequired);
        allOk = false;
      }else {
        validators.setValidationEmptyRequired();
      }

      if(isToday(appointment.date)){
        validators.setValidationDateToday(validationErrorMessages.errorDateToday);
        allOk = false;
      }else {
        validators.setValidationDateToday();
      }

      if(allOk){
        return await doAppointment(appointment);
      }
    }catch(err){
      throw err;
    }
  }

  const doAppointment = async(appointment) => {
    try {
      const options = {
        headers: { Authorization: `Bearer ${props.user.token}` }
      }
      const response = await axios.post(process.env.REACT_APP_BASE_URL + '/client/appointment/', appointment, options);
      return response;
    } catch (error) {
      throw error
    }
  }

  const validators = {setValidationEmptyRequired, setValidationDateToday, setRequestError};
  
  const eventHandler = (ev) => {
    validators.setValidationEmptyRequired();
    validators.setValidationDateToday();
    validators.setRequestError();
    if(!ev.target){
      setAppointment({ ...appointment, date: ev});
    }else{
       setAppointment({ ...appointment, [ev.target.name]: ev.target.type !== "checkbox" ? ev.target.value : ev.target.checked});
    }
  };

  const options = [
    { label: 'Limpieza bucal', target: {name: 'title', type: 'select',  value: 'Limpieza bucal'} },
    { label: 'Chequeo' , target: {name: 'title', type: 'select', value: 'Chequeo'} },
    { label: 'Endodoncia' , target: {name: 'title', type: 'select', value: 'Endodoncia'} },
    { label: 'Empaste' , target: {name: 'title', type: 'select', value: 'Empaste'} },
    { label: 'Extracción de muelas del jucio', target: {name: 'title', type: 'select', value: 'Extracción de muelas del jucio'}  },
    { label: 'Ortodoncia' , target: {name: 'title', type: 'select', value: 'ortodoncia'} },
  ]

  const colourStyles = {
    control: styles => ({ ...styles, width: "15em"})
  };

  function disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }
  return (
    <div className="registerContainer">
      <div className={requestError ? 'errorToast' : null}>{requestError}</div>
      <div className={validationEmptyRequired ? 'warningToast' : null}>{validationEmptyRequired}</div>
      <div className={validationDateToday ? 'warningToast' : null}>{validationDateToday}</div>
      <div className="registerForm">
      <Select styles={colourStyles} placeholder="* Motivo de la cita" name="title" className="selector" id="selector" options={options} onChange={eventHandler} value={options.value}/>

      <label>* Descripción: <textarea type="text" name="description" required onChange={eventHandler}/></label> 
      <label> Observaciones: <textarea type="text" name="observations" required onChange={eventHandler}/></label> 
      <label>* Fecha:
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker hinttext="Weekends Disabled" shouldDisableDate={disableWeekends} name="date" minDate={initialDate} value={appointment.date} onChange={eventHandler} />
        </MuiPickersUtilsProvider></label>
     <button className="turqButton" onClick={async () => {
        try{
          const response = await validateAndSend(appointment, validators);
            if(response){
              setTimeout(() => {
                props.setAction('Citas');
              }, 1000);
            }            
        }catch(err){
          console.log(err.message)
        }
       }}> Crear cita </button>
    </div>
    </div>
  );
}

export default ClientAppointmentForm;
