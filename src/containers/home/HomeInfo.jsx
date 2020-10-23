import React from "react";
import './Home.scss'

function HomeInfo() {
  return (
    <div className="homeInfo">
      <h1>Clinica dental </h1>
      <div className="homeContent"> 
        <div className="homeImg"> Image </div>
        <div className="homeText"> TEXT </div> 
      </div>
      <div className="homeContent"> 
        <div className="homeText"> TEXT </div> 
        <div className="homeImg"> Image </div>
      </div>
      <div className="homeContent"> 
        <div className="homeImg"> Image </div>
        <div className="homeText"> TEXT </div> 
      </div>
    </div>
  );
}

export default HomeInfo;
