import React from "react";
import { connect } from "react-redux";
import './Home.scss'



function HomeInfo() {
  const classesClinic = 'homeContent clinic';
  const classesCovid = 'homeContent covid';
  const classesEquipment = 'homeContent equipment';
  const classesPerson = 'homeContent person';
  return (
    <div className="homeInfo">      
      <div className={classesClinic}> 
        <div className="homeImg">  </div>
        <div className="homeText"> 
          <div className="textTitle"> 
            <h2>Tecnologia ultimo modelo</h2> 
          </div>
          <div className="textDesc"> 
            Lorem ipsum dolor sit amet consectetur
           adipisicing elit. Magni natus repellat iste perspiciatis 
           voluptate facilis laudantium animi iusto asperiores tempore 
           officia nulla, eum cupiditate cumque vitae amet fuga voluptatum 
           provident.
          </div>
        </div> 
      </div>
      <div className={classesCovid}> 
        <div className="homeText"> 
          <div className="textTitle"> 
            <h2>Medidas frente al Covid-19</h2> 
          </div>
          <div className="textDesc"> 
            Lorem ipsum dolor sit amet consectetur
           adipisicing elit. Magni natus repellat iste perspiciatis 
           voluptate facilis laudantium animi iusto asperiores tempore 
           officia nulla, eum cupiditate cumque vitae amet fuga voluptatum 
           provident.
          </div>
        </div> 
        <div className="homeImg">  </div>
      </div>
      <div className={classesPerson}> 
        <div className="homeImg">  </div>
        <div className="homeText"> 
          <div className="textTitle"> 
            <h2>Bonos para revisiones anuales</h2> 
          </div>
          <div className="textDesc"> 
            Lorem ipsum dolor sit amet consectetur
           adipisicing elit. Magni natus repellat iste perspiciatis 
           voluptate facilis laudantium animi iusto asperiores tempore 
           officia nulla, eum cupiditate cumque vitae amet fuga voluptatum 
           provident.
          </div>
        </div> 
      </div>
      <div className={classesEquipment}> 
        <div className="homeText">
          <div className="textTitle"> 
            <h2>Profesionales dedicados</h2> 
          </div>
          <div className="textDesc"> 
            Lorem ipsum dolor sit amet consectetur
           adipisicing elit. Magni natus repellat iste perspiciatis 
           voluptate facilis laudantium animi iusto asperiores tempore 
           officia nulla, eum cupiditate cumque vitae amet fuga voluptatum 
           provident.
          </div>  
        </div> 
        <div className="homeImg">  </div>
      </div>
    </div>
  );
}

export default connect() (HomeInfo);
