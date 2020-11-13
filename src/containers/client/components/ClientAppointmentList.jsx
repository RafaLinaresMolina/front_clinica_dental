import axios from "axios";
import React, { useEffect, useState } from "react";
import GenericReactTable from "../../../component/GenericReactTable";
import GenericModal from "../../../component/GenericModal";
import "./ClientContent.scss";
import { connect } from "react-redux";
import { INFO_NOTIFICATION, SET_APPOINTMENTS, UPDATE_APPOINTMENTS } from "../../../redux/types";



function ClientAppointmentList(props) {
  const translateStatus = (status, date) => {
    const values = {
      0: "Cancelada",
      1: "Pendiente",
      2: "Aceptada",
      3: "Finalizada",
    };

    console.log("translateStatus", isPastDue(date), date)
    return [1, 2].includes(+status) && isPastDue(date) ? <span>
          <del>{values[status]}</del>{" "}
          <b style={{ whiteSpace: "nowrap", backgroundColor: "unset" }}>
            Fecha vencida
          </b>
        </span> : values[status];
  };

  const isPastDue = (date) => (date < new Date());
  
  const getClientCitas = async (props)=>{
    const options = {
      headers: { Authorization: `Bearer ${props.user.token}` }
    }
    try{
      const citas = await axios.get(process.env.REACT_APP_BASE_URL + "/client/appointments", options);
      props.dispatch({
        type: UPDATE_APPOINTMENTS,
        payload: citas.data
      });
    }catch(err){
      throw err
    }
  }
  
  const cancelAppointment = async (
    row,
    hideModalCancel,
    props
  ) => {
    try {
      const options = { headers: { Authorization: `Bearer ${props.user.token}` } };
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/client/appointment/${row._id}`,
        options
      );
      props.dispatch({
        type: INFO_NOTIFICATION,
        payload: {
          notification: {
            title: "Cita Cancelada",
            msg: `La cita ${row.title} ha sido cancelada`,
          },
          show: true,
        },
      });
      hideModalCancel();
      await getClientCitas(props);
    } catch (err) {
      console.log(err);
    }
  };

  const [showDetail, setShowDetail] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const [row, setRow] = useState({});

  const showModalDetail = () => {
    setShowDetail(true);
  };
  const hideModalDetail = () => {
    setShowDetail(false);
  };

  const showModalCancel = () => {
    setShowCancel(true);
  };
  const hideModalCancel = () => {
    setShowCancel(false);
  };

  const headers = [
    {
      Header: "Cita",
      columns: [
        {
          Header: "Motivo",
          accessor: "title",
          Cell: ({ value }) => {
            return value ? (
              <b style={{ whiteSpace: "nowrap" }}> {`${value}`}</b>
            ) : (
              ""
            );
          },
        },

        {
          Header: "Fecha de Cita",
          accessor: "date",
          Cell: ({ value }) => {
            return value ? (
              <span style={{ whiteSpace: "nowrap" }}>
                {" "}
                {`${new Date(value).toLocaleDateString("es-ES")} - ${new Date(
                  value
                ).toLocaleTimeString("es-ES")}`}
              </span>
            ) : (
              ""
            );
          },
        },
        {
          Header: "Estado",
          accessor: (row, i) => {
            console.log('HEADER STATUS: ', row.date)
            return translateStatus(row.status, new Date(row.date));
          },
        },
      ],
    },
    {
      Header: "Dentista",
      columns: [
        {
          Header: "Nombre",
          accessor: (row, i) => {
            return row.DentistId ? `${row.DentistId.name} ${row.DentistId.lastName}` : ``;
          },
          Cell: ({value}) => {
            return value ? (
              <span style={{ whiteSpace: "nowrap" }}>
                {" "}
                <b>{`${value}`}</b>
              </span>
            ) : (
              <span style={{ whiteSpace: "nowrap" }}>
                <i>sin dentista asignado</i>
              </span>
            );
          },
        },
      ],
    },
    {
      Header: "Acciones",
      columns: [
        {
          Header: "Detalle",
          accessor: (row, i) => {
            return (
              <div
                className={"turqButton"}
                onClick={() => {
                  showModalDetail();
                  setRow(row);
                }}
              >
                {" "}
                <span role="img" aria-label="Ver detalle">
                  &#x1F50D;
                </span>{" "}
              </div>
            );
          },
        },
        {
          Header: "Cancelar",
          accessor: (row, i) => {
            const isNotCancelable = ![0, 3].includes(+row.status);
            const isPastDate = isPastDue(new Date(row.date));
            console.log("Cancel Header", isNotCancelable, isPastDate, row.date, new Date(row.date), new Date())
            return isNotCancelable && !isPastDate ? (
              <div className="actionButtons">
                <div
                  className={"redButton"}
                  onClick={() => {
                    showModalCancel();
                    setRow(row);
                  }}
                >
                  {" "}
                  <span role="img" aria-label="Cancelar cita">
                    &#10060;
                  </span>{" "}
                </div>
              </div>
            ) : (
              ""
            );
          },
        },
      ],
    },
  ];

  useEffect(() => {
    const options = {
      headers: { Authorization: `Bearer ${props.user.token}` },
    };
    if (props.appointments.length === 0) {
      axios
        .get(process.env.REACT_APP_BASE_URL + "/client/appointments", options)
        .then((res) => {
          props.dispatch({ type: SET_APPOINTMENTS, payload: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="tableAppointment">
      <GenericModal
        show={showDetail}
        handleClose={hideModalDetail}
        header={3}
        title={"Detalle de cita"}
      >
        {row ? (
          <div className="row">
            <div className="detailLine">
              <label>
                <b>Motivo:</b> {row.title}
              </label>
            </div>
            <div className="detailLine">
              <label>
                <b>Descripción:</b> {row.description}
              </label>
            </div>
            {row.observations ? (
              <div className="detailLine">
                <label>
                  <b>Observaciones:</b> {row.observations}
                </label>
              </div>
            ) : (
              ""
            )}

            <div className="detailLine">
              <label>
                <b>Cita creada el </b> {row.creationDate}
              </label>
            </div>
            <div className="detailLine">
              <label>
                <b>Día de la cita </b>{" "}
                {`${new Date(row.date).toLocaleDateString(
                  "es-ES"
                )} : ${new Date(row.date).toLocaleTimeString("es-ES")}`}
              </label>
            </div>
            <div className="detailLine">
              <label>
                <b>Estado: </b> {translateStatus(row.status, row.date)}
              </label>
            </div>
          </div>
        ) : (
          ""
        )}
      </GenericModal>
      <GenericModal
        show={showCancel}
        handleClose={hideModalCancel}
        header={1}
        title={"Cancelar cita"}
      >
        <div className="modal-text">
          <i>Esta seguro que desea cancelar la cita</i>
          <b>{row.title}</b>
          <i> del día </i>
          <b>
            {`${new Date(row.date).toLocaleDateString(
              "es-ES"
            )} a las ${new Date(row.date).toLocaleTimeString("es-ES")}`}
          </b>
        </div>
        <div
          className="turqButton"
          onClick={async () => {
            await cancelAppointment(
              row,
              hideModalCancel,
              props
            );
          }}
        >
          Cancelar cita
        </div>
      </GenericModal>
      <GenericReactTable data={props.appointments} columns={headers} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user, appointments: state.appointments };
};
export default connect(mapStateToProps)(ClientAppointmentList);
