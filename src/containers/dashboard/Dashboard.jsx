import React from "react";
import { connect } from "react-redux";
import Admin from "../admin/Admin";
import Client from "../client/Client";
import Dentist from "../dentist/Dentist";

function Dashboard(props) {
  const cargarVista = (roleId) => {
    const layouts = {
      0: <Admin />,
      1: <Client />,
      2: <Dentist />,
    };
    return layouts[roleId] ? (
      layouts[roleId]
    ) : (
      <Client />
    );
  };

  return (
    <div className="homeInfo">
      {cargarVista(props.user.roleId)}
    </div>
  );
}

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps) (Dashboard);
