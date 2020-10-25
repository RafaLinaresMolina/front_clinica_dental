import axios from "axios";
import React, { useEffect } from "react";
import "./AllLoggedUsers.scss";


function AllLoggedUsers(props) {

  useEffect(() => {
    const options = {
      headers: { Authorization: `Bearer ${props.user.token}` }
    }
    axios.get(process.env.REACT_APP_BASE_URL + "/admin/users/logged", options)
      .then( (res) => {
          props.setUsersLogged(res.data.reverse());
    
      }).catch( (err) => {
        console.log( err );
      });
  },[]);

  return (
    <div className="tableAppointment">

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>email</th>
            <th>Creación del usuario</th>
          </tr>
        </thead>
        {props.usersLogged?.map((user) => (
          <tbody key={user._id}>
            <tr>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
export default AllLoggedUsers;
