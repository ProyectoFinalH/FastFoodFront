import React from "react";
import imgOpiniones from "../../../images/imageOpiniones.jpg";
import "./cardOpiniones.css";

function CardOpiniones() {
  return (
    <div className="cardResContainer cardOtherContainer">
      <div>
        <img src={imgOpiniones} alt="Opiniones" />
      </div>
      <div className="textContainer">
        <h2 className="restaurantName">Opiniones</h2>
        <p className="restaurantType">Contanos como fue tu experiencia</p>
      </div>
    </div>
  );
}

export default CardOpiniones;
