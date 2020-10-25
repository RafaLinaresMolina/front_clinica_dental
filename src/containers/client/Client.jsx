import React, { useState, useEffect } from "react";
import ClientContent from "./components/ClientContent";
import ClientNavBar from "./components/ClientNavBar";
import './Client.scss';
import axios from "axios";
function Client(props) {
  const [action, setAction] = useState('Citas');
  const [appointments, setAppointments] = useState([]);

  const token = props.user.token;
  const getClientCitas = async ()=>{
    const options = {
      headers: { Authorization: `Bearer ${token}` }
    }
    try{
      const citas = await axios.get(process.env.REACT_APP_BASE_URL + "/client/appointments", options);
      setAppointments(citas.data)
      return citas.data;
    }catch(err){
      throw err
    }
  }

  
  return (
    
    <div className="wholeContainer">
      <ClientNavBar action={action} setAction={setAction} user={props.user} setUser={props.setUser} getClientCitas={getClientCitas} appointments={appointments} setAppointments={setAppointments}/>
      <ClientContent action={action} setAction={setAction} user={props.user} setUser={props.setUser} getClientCitas={getClientCitas} appointments={appointments} setAppointments={setAppointments}/>
    </div>
  );
}

export default Client;
