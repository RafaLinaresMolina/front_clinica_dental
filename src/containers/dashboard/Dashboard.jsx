import React from "react"
import Admin from "../admin/Admin";
import Client from "../client/Client";
import Dentist from "../dentist/Dentist";

function Dashboard(props) {

  const cargarVista = (roleId) => {
    const layouts = {
      0: <Admin user={props.user}/>,
      1: <Client user={props.user}/>,
      2: <Dentist user={props.user}/>
    }
    return layouts[roleId] ? layouts[roleId] : <Client user={props.user}/>;
  }

  return (
    <div className="homeInfo">
      {cargarVista(props.user.roleId)}
      <div>! {props.user.name} !</div>
    </div>
  );
}

export default Dashboard;
