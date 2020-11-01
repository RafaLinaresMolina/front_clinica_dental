import React, { useState } from "react";
import ClientContent from "./components/ClientContent";
import ClientNavBar from "./components/ClientNavBar";
import './Client.scss';
function Client() {
  const [action, setAction] = useState('citas');

  return (    
    <div className="wholeContainer">
      <ClientNavBar action={action} setAction={setAction}/>
      <ClientContent action={action} setAction={setAction}/>
    </div>
  );
}

export default Client;
