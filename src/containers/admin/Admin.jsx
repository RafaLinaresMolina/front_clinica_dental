import React, { useState } from "react";
import AdminContent from "./components/AdminContent";
import AdminNavBar from "./components/AdminNavBar";
import './Admin.scss';
import axios from "axios";
function Admin(props) {
  const [action, setAction] = useState('citas');
  const [appointments, setAppointments] = useState([]);
  const [usersLogged, setUsersLogged] = useState([]);
  const token = props.user.token;
   const getClientCitas = async ()=>{
     const options = {
       headers: { Authorization: `Bearer ${token}` }
     }
     try{
       const citas = await axios.get(process.env.REACT_APP_BASE_URL + "/admin/appointments", options);
       setAppointments(citas.data.reverse())
       return citas.data;
     }catch(err){
       throw err
     }
   }

  return (    
    <div className="wholeContainer">
      <AdminNavBar action={action} setAction={setAction} user={props.user} setUser={props.setUser} getClientCitas={getClientCitas} appointments={appointments} setAppointments={setAppointments}/>
      <AdminContent action={action} setAction={setAction} user={props.user} setUser={props.setUser} getClientCitas={getClientCitas} appointments={appointments} setAppointments={setAppointments} usersLogged={usersLogged} setUsersLogged={setUsersLogged}/>
    </div>
  );
}

export default Admin;
