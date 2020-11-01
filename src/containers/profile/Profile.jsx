import React from "react";
import { connect } from "react-redux";


function Profile(props) {
  
  const typeAccout = (roleId) => {
    const roles ={
      0: 'Administrador',
      1: 'Cliente',
      2: 'Dentista'
    }
    return roles[roleId];
  }

  return (
    <div className="loginContainer">
      <div className="loginForm">
        <label> Nombre: <input readOnly type="text" name="name" value={props.user.name} /></label>
        <label> Apellidos: <input readOnly type="text" name="lastname" value={props.user.lastName}/> </label>
        <label> Direccion: <input readOnly type="text" name="address" value={props.user.address} /></label>
        <label> Cuenta de tipo: <input readOnly type="text" name="roleId" value={typeAccout(props.user.roleId)} /> </label>
        <label> Correo: <input readOnly type="text" name="email" value={props.user.email} /></label>

      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps) (Profile);
