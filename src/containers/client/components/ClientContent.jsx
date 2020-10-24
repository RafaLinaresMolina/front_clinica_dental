import React from "react";
import "./ClientContent.scss"

const getStyle = (status) => {

  const values = {
    0: 'trCancell',
    1: 'trPending',
    2: 'trAccepted',
    3: 'trDone',
  }
  return values[status];
}

const translateStatus = (status) => {

  const values = {
    0: 'Cancelada',
    1: 'Pendiente',
    2: 'Aceptada',
    3: 'Finalizada',
  }
  return values[status];
}

const hideButton = (status) => {
  return([0,3].includes(+status)) ;
}

function ClientContent(props) {
  return (
    <div className="content">
      <div className="actionName">
        <h1>{props.action}</h1>
        <div className="tableAppointment">
        <table>
          <thead>
          <tr>
            <th>Intervención</th>
            <th>Descripción</th>
            <th>Creada en</th>
            <th>Visita para</th>
            <th>Atendido por</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
          </thead>
        {props.appointments?.map(cita => 
         <tbody key={cita._id}>
            <tr className={getStyle(cita.status)}>
            <td>{cita.title}</td>
            <td>{cita.description}</td>
            <td>{cita.creationDate}</td>
            <td>{cita.date}</td>
            <td>{cita.DentistId?.name}</td>
            <td>{translateStatus(cita.status)}</td>
            {hideButton(cita.status) ? <td></td> : <td><div className="cancelButton"> X </div></td>}
            </tr>
          </tbody>
         )
        }
        </table>
        </div>
      </div>
    </div>
  );
}
export default ClientContent;
