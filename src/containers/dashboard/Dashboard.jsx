import React from "react";
import Admin from "../admin/Admin";
import Client from "../client/Client";
import Dentist from "../dentist/Dentist";

function Dashboard(props) {
  const cargarVista = (roleId) => {
    console.log(roleId);
    const layouts = {
      0: <Admin user={props.user} setUser={props.setUser} />,
      1: <Client user={props.user} setUser={props.setUser} />,
      2: <Dentist user={props.user} setUser={props.setUser} />,
    };
    return layouts[roleId] ? (
      layouts[roleId]
    ) : (
      <Client user={props.user} setUser={props.setUser} />
    );
  };

  return (
    <div className="homeInfo">
      {cargarVista(props.user.roleId)}
    </div>
  );
}

export default Dashboard;
