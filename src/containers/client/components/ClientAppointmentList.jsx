import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../../../component/Modal";
import "./ClientContent.scss";

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

const hideButton = (status) => {
  return [0, 3].includes(+status);
};

function ClientAppointmentList(props) {

  const [show, setShow] = useState(false);
  const [cita, setCita] = useState({});

  const showModal = (cita) => {
    setShow(true);
    setCita(cita);
  };

  const hideModal = () => {
    setShow(false);
  };

  useEffect(() => {
    const options = {
      headers: { Authorization: `Bearer ${props.user.token}` }
    }
    axios.get(process.env.REACT_APP_BASE_URL + "/client/appointments", options)
      .then( (res) => {
          props.setAppointments(res.data);
    
      }).catch( (err) => {
        console.log( err );
      });
  },[]);

  return (
    <div className="tableAppointment">
      <Modal
        show={show}
        handleClose={hideModal}
        header={1}
        title={'Cancelar cita'}
        cita={cita}
        user={props.user}
        getClientCitas={props.getClientCitas}
      />
      <table>
        <thead>
          <tr>
            <th>Intervención</th>
            <th>Descripción</th>
            <th>Observaciones</th>
            <th>Creada en</th>
            <th>Visita para</th>
            <th>Atendido por</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {props.appointments?.map((cita) => (
          <tbody key={cita._id}>
            <tr className={getStyle(cita.status)}>
              <td>{cita.title}</td>
              <td>{cita.description}</td>
              <td>{cita.observations}</td>
              <td>{cita.creationDate}</td>
              <td>{cita.date}</td>
              <td>{cita.DentistId?.name} {cita.DentistId?.lastName}</td>
              <td>{translateStatus(cita.status)}</td>
              {hideButton(cita.status) ? (
                <td></td>
              ) : (
                <td>
                  <div className="cancelButton" onClick={() => showModal(cita)}>
                    {" "}
                    X{" "}
                  </div>
                </td>
              )}
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
export default ClientAppointmentList;
