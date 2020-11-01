
import React from "react";
import { connect } from "react-redux";
import Profile from "../../profile/Profile";
import ClientAppointmentForm from "./ClientAppointmentForm";
import ClientAppointmentList from "./ClientAppointmentList";
import "./ClientContent.scss";

function ClientContent(props) {

  const loadComponentByAction = (action) => {

    const actions = {
      'citas': <ClientAppointmentList/>,
      'create': <ClientAppointmentForm action={props.action} setAction={props.setAction} />,
      'profile': <Profile/>
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

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps) (ClientContent);
