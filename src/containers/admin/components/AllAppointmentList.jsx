import axios from "axios";
import React, { useEffect } from "react";
import "./AllAppointmentList.scss";

const getStyle = (status) => {
  const values = {
    0: "trCancell",
    1: "trPending",
    2: "trAccepted",
    3: "trDone",
  };
  return values[status];
};

const translateStatus = (status) => {
  const values = {
    0: "Cancelada",
    1: "Pendiente",
    2: "Aceptada",
    3: "Finalizada",
  };
  return values[status];
};

function AllAppointmentList(props) {

  useEffect(() => {
    const options = {
      headers: { Authorization: `Bearer ${props.user.token}` }
    }
    axios.get(process.env.REACT_APP_BASE_URL + "/admin/appointments", options)
      .then( (res) => {
          props.setAppointments(res.data.reverse());
    
      }).catch( (err) => {
        console.log( err );
      });
  },[]);

  return (
    <div className="tableAppointment">
      <table>
        <thead>
          <tr>
            <th>Intervención</th>
            
            <th>Creada en</th>
            <th>Visita para</th>
            <th>Cliente</th>
            <th>Atendido por</th>
            <th>Estado</th>
          </tr>
        </thead>
        {props.appointments?.map((cita) => (
          <tbody key={cita._id}>
            <tr className={getStyle(cita.status)}>
              <td>{cita.title}</td>
              <td>{cita.creationDate}</td>
              <td>{cita.date}</td>
              <td>{cita.ClientId?.name} {cita.ClientId?.lastName}</td>
              <td>{cita.DentistId?.name} {cita.DentistId?.lastName}</td>
              <td>{translateStatus(cita.status)}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
export default AllAppointmentList;
