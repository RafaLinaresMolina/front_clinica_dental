import React from "react";
import "./ClientNavBar.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { LOGOUT, UPDATE_APPOINTMENTS } from "../../../redux/types";

const logOut = async(props) => {
  const config = {
    headers: { Authorization: `Bearer ${props.user.token}` }
  };
  try{
    await axios.get(process.env.REACT_APP_BASE_URL + '/auth/logout', config);
    localStorage.removeItem('user');
    props.dispatch({type:LOGOUT, payload: {}})
    
  }catch(err){
    console.log(err)
  }
}

const getClientCitas = async (props)=>{
  const options = {
    headers: { Authorization: `Bearer ${props.user.token}` }
  }
  try{
    const citas = await axios.get(process.env.REACT_APP_BASE_URL + "/client/appointments", options);
    return citas.data;
  }catch(err){
    throw err
  }
}
function ClientNavBar(props) {
  const history = useHistory();
  return (
    <div className="navBar">
      <div className="greetings">
        <div className="greetingsText">Bienvenido</div>
        <div className="greetingsText">{props.user.name} {props.user.lastName}</div>
      </div>
      <div className="actions">
        <div className="turqButton" onClick={async() => {
          props.setAction('citas');
          const res = await getClientCitas(props);
          props.dispatch({type: UPDATE_APPOINTMENTS, payload: res})
          }}>
          Ver citas
        </div>
        <div className="turqButton" onClick={() => props.setAction('create')}>
          Crear cita
        </div>
        <div className="turqButton" onClick={() => props.setAction('profile')}>
          Ver perfil
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

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps) (ClientNavBar);
