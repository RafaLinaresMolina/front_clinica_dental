import React from "react";
import "./Modal.scss";
import axios from "axios"

//{ handleClose, show, children }
function Modal(props)  {
  const showHideClassName = props.show ? "modal display-block" : "modal display-none";
  const headerModal = {
    0: "modal-error",
    1: "modal-warning",
    2: "modal-ok",
    3: "modal-default"
  }

  const classes = `modal-header ${headerModal[props.header]}`

  const cancelAppointment = async(id) => {
    try {
      const options = {
        headers: { Authorization: `Bearer ${props.user.token}` }
      }
      await axios.put(`${process.env.REACT_APP_BASE_URL}/client/appointment/${id}`, options);
      props.getClientCitas();
      props.handleClose();
    } catch (error) {
      throw error.response;
    }
  }

  return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className={classes}>
            <div className="redButton modal-exit" onClick={props.handleClose}>&nbsp;X&nbsp;</div>
            <div className='modal-title'>{props.title}</div>
          </div>
          <div className="modal-body">
            <div className="modal-text">
            <i>Esta seguro que desea cancelar la cita</i>
            {props.cita.title}
            <i> del día </i>
            {props.cita.date}
            </div>
          </div>
          <div className="modal-footer">
            <div className="turqButton" onClick={async () => await cancelAppointment(props.cita.id)}>Cancelar cita</div>
          </div>
        </section>
      </div>
  );
};

export default Modal;