
import React from "react";
import Profile from "../../profile/Profile";
import ClientAppointmentForm from "./ClientAppointmentForm";
import ClientAppointmentList from "./ClientAppointmentList";
import "./ClientContent.scss";

function ClientContent(props) {


  const loadComponentByAction = (action) => {
    const actions = {
      'citas': <ClientAppointmentList
      user={props.user}
      getClientCitas={props.getClientCitas}
      appointments={props.appointments}
      setAppointments={props.setAppointments}
      />,
      'create': <ClientAppointmentForm
      user={props.user}
      getClientCitas={props.getClientCitas}
      action={props.action}
      setAction={props.setAction}
      />,
      'profile': <Profile user={props.user}/>
    }
    return actions[action] ? actions[action] : actions['citas'];
  }

  const getTitleByAction = (action) => {
    const actions = {
      'citas': 'Ver citas',
      'create': 'Crear nueva cita',
      'profile': 'Perfil de usuario'
    }
    return actions[action] ? actions[action] : actions['citas'];
  }

  return (
    <div className="content">
      <div className="actionName">
        <h1>{getTitleByAction(props.action)}</h1>
        {loadComponentByAction(props.action)}
      </div>
    </div>
  );
}
export default ClientContent;
