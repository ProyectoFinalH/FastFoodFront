
import React, { useState, useEffect } from "react";
import "./cardMenuItems.css";
import { Link, useNavigate } from "react-router-dom";
import carrito from '../../../images/carrito.png';

// Importa las funciones necesarias de localstorage-card
import { obtenerContCarrito,guardarItemCarrito } from '../../localStorage-car/LocalStorageCar';

import Carrito from '../../Carrito/Carrito'

function CardMenuItems({ id, name, description, price, image, handleSelectMenuItem }) {
  const [viewCard, setViewCard] = useState(false);
  const navigator = useNavigate();
  const [id_Card, setId_Card] = useState({ id, name, description, price, image, cont: 0 }); // Inicializa cont en 0

  useEffect(() => {
    // Obtener el contador del localStorage al montar el component
    const cont = obtenerContCarrito(id);
    if(id_Card.cont !==cont){

      setId_Card((prevState) => ({ ...prevState, cont }));
    }
    
    
  }, [id,id_Card.cont]);

  const handleSumar = () => {
    setId_Card((prevState) => {
      const newCont = prevState.cont + 1;
      guardarItemCarrito({ ...prevState, cont: newCont });
      return { ...prevState, cont: newCont };
    });
  };

  const handleRestar = () => {
    setId_Card((prevState) => {
      const newCont = Math.max(0, prevState.cont - 1);
      guardarItemCarrito({ ...prevState, cont: newCont });
      return { ...prevState, cont: newCont };
    });
  };

  const handleMenuCarrito = () => {
    setViewCard(!viewCard);
    navigator('/menu');
  };
  
  
  const handleClick = () => {
  handleSelectMenuItem(id);
};
  
  
  

  return (
    <div className="cardMenuContainer">
      {viewCard && <Carrito onClose={handleMenuCarrito} />}

      
        <img alt="imagemenuitems" src={image} className="cardImage" onClick={handleClick}/>
     
      <div className="cardContent">
        <h2 className="cardTitle">{name}</h2>
        <p className="cardDescription">{description}</p>
        <div className="OrdenarCompra">
          <h2 className="cardPrice">${price}</h2>
          <div className="botonesCarrito">
            <div className="botones-flex">
              <div className="buttonDecInc-Menu">
                <label className="aumentardisminuir" onClick={handleRestar}>-</label>
                <input className="inputcard" type="text" value={obtenerContCarrito(id_Card.id)} disabled />
                <label className="aumentardisminuir" onClick={handleSumar}>+</label>
              </div>
              <img src={carrito} title="Ve Al Carrito" alt="Carrito" className="aumentardisminuir" onClick={handleMenuCarrito} />
            </div>
            <p className="agregarCarritoTitulo"></p>
          </div>
        </div>

      </div>
    </div>
  );
}


export default CardMenuItems;
