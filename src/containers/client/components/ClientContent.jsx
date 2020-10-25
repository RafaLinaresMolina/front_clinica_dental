
import React from "react";
import ClientAppointmentForm from "./ClientAppointmentForm";
import ClientAppointmentList from "./ClientAppointmentList";
import "./ClientContent.scss";

function ClientContent(props) {

  return (
    <div className="content">
      <div className="actionName">
        <h1>{props.action}</h1>
        {
          props.action === 'Citas' ? 
          <ClientAppointmentList
          user={props.user}
          getClientCitas={props.getClientCitas}
          appointments={props.appointments}
          setAppointments={props.setAppointments}
          /> : 
          <ClientAppointmentForm
          user={props.user}
          getClientCitas={props.getClientCitas}
          action={props.action}
          setAction={props.setAction}
          
          />
        }
        
      </div>
    </div>
  );
}
export default ClientContent;
