import React from "react";
import imgpagos from "../../../images/imagePagos.jpg";
import "./cardPagos.css";

function CardPagos() {
  return (
    <div className="cardResContainer cardOtherContainer">
      <div>
        <img src={imgpagos} alt="Metodos de pago" />
      </div>
      <div className="textContainer">
        <h2 className="restaurantName">Metodos de pago</h2>
        <p className="restaurantType">Descubre todas las Opciones</p>
      </div>
    </div>
  );
}

export default CardPagos;
