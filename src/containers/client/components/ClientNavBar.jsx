import React from "react";
import "./ClientNavBar.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";

const logOut = async(props) => {
  const config = {
    headers: { Authorization: `Bearer ${props.user.token}` }
  };
  try{
    await axios.get(process.env.REACT_APP_BASE_URL + '/auth/logout', config);
    props.setUser();
    localStorage.removeItem('user');
    
  }catch(err){
    console.log(err)
  }
}
function ClientNavBar(props) {
  const history = useHistory();
  return (
    <div className="navBar">
      <div className="greetings">
        <div className="greetingsText">Bienvenido</div>
        <div className="greetingsText">{props.user.name}</div>
      </div>
      <div className="actions">
        <div className="turqButton" onClick={async() => {
          props.setAction('Citas');
          await props.getClientCitas(props);
          }}>
          Ver citas
        </div>
        <div className="turqButton" onClick={() => props.setAction('Formulario de nueva cita')}>
          Crear cita
        </div>
        <div className="turqButton" onClick={async() => {
            try {
              await logOut(props);
              history.push('/');
            } catch (error) {
              console.log(error)
            } 
          }}>
          LogOut
        </div>
      </div>
    </div>
  );
}

export default ClientNavBar;
