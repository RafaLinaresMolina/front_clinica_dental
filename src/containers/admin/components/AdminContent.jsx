import React from "react";
import Profile from "../../profile/Profile";
import AllAppointmentList from "./AllAppointmentList";
import "./AdminContent.scss";
import AllLoggedUsers from "./AllLoggedUsers";

function AdminContent(props) {

  const loadComponentByAction = (action) => {
    const actions = {
      'citas': <AllAppointmentList
      user={props.user}
      getClientCitas={props.getClientCitas}
      appointments={props.appointments}
      setAppointments={props.setAppointments}
      />,
      'profile': <Profile user={props.user}/>,
      'logged': <AllLoggedUsers user={props.user} usersLogged={props.usersLogged} setUsersLogged={props.setUsersLogged} />
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




export default AdminContent;