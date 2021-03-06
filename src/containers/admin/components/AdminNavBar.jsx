import React from "react";
import "./AdminNavBar.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {LOGOUT} from '../../../redux/types';
import { connect } from "react-redux";

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
function AdminNavBar(props) {
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
          }}>
          Ver todas las citas
        </div>
        <div className="turqButton" onClick={() => props.setAction('profile')}>
          Ver perfil
        </div>
        <div className="turqButton" onClick={() => props.setAction('logged')}>
          Usuarios activos
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

export default connect(mapStateToProps) (AdminNavBar);
