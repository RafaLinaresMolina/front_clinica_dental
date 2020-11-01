import axios from "axios";
import React, { useEffect, useState } from "react";
import GenericReactTable from "../../../component/GenericReactTable";
import GenericModal from "../../../component/GenericModal";
import "./AllAppointmentList.scss";

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

  const [showDetail, setShowDetail] = useState(false);
  const [row, setRow] = useState({});

  const showModalDetail = () => {
    setShowDetail(true);
  };
  const hideModalDetail = () => {
    setShowDetail(false);
  };

  useEffect(() => {
    const options = {
      headers: { Authorization: `Bearer ${props.user.token}` }
    }
    axios.get(process.env.REACT_APP_BASE_URL + "/admin/appointments", options)
      .then( (res) => {
          props.setAppointments(res.data);
    
      }).catch( (err) => {
        console.log( err );
      });
  },[]);

  const headers = [
    {
      Header: "Cita",
      columns: [
        {
          Header: "Intervención",
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
          Header: "Creación de la cita",
          accessor: "createdAt",
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
          Header: "Cita planificada",
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
          Header: "Cliente",
          accessor: (row, i) => {
            return row.ClientId ? `${row.ClientId.name} ${row.ClientId.lastName}` : ``;
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
        {
          Header: "Atendido por",
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
        {
          Header: "Estado",
          accessor: (row, i) => {
            return translateStatus(row.status, row.date);
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
      ],
    },
  ];


  return (
    <>
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
    <GenericReactTable data={props.appointments} columns={headers}/>
    </>
  );
}
export default AllAppointmentList;
