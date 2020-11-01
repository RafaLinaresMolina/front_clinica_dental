import axios from "axios";
import React, { useEffect } from "react";
import "./AllLoggedUsers.scss";
import GenericReactTable from "../../../component/GenericReactTable";

function AllLoggedUsers(props) {
  useEffect(() => {
    const options = {
      headers: { Authorization: `Bearer ${props.user.token}` },
    };
    axios
      .get(process.env.REACT_APP_BASE_URL + "/admin/users/logged", options)
      .then((res) => {
        props.setUsersLogged(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const typeAccout = (roleId) => {
    const roles ={
      0: 'Administrador',
      1: 'Cliente',
      2: 'Dentista'
    }
    return roles[roleId];
  }

  const headers = [
    {
      Header: "Tipo de cuenta",
      accessor: (row, i) => {
        return `${typeAccout(row.roleId)}`;
      },
      Cell: ({value}) => {
        return <span> <b>{`${value}`}</b> </span>
      },
    },
    {
      Header: "Usuario",
      accessor: (row, i) => {
        return `${row.name} ${row.lastName}`;
      },
      Cell: ({value}) => {
        return <span style={{ whiteSpace: "nowrap" }}> <b>{`${value}`}</b> </span>
      },
    },
    {
      Header: "Correo electronico",
      accessor: "email",
    },
    {
      Header: "Creación del usuario",
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
  ];

  return (
    <GenericReactTable
      data={props.usersLogged}
      columns={headers}
      defaultStyle={true}
    />
  );
}
export default AllLoggedUsers;
