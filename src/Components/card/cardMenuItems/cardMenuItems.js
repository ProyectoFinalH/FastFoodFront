import { useEffect, useState } from "react";
import "./cardMenuItems.css";
import { Link } from "react-router-dom";
import carrito from '../../../images/carrito.png';

import Carrito from '../../Carrito/Carrito'

function CardMenuItems({ id, name, description, price, image }) {
  const [viewCard, setViewCard] = useState(false);
  const [id_Card, setId_Card] = useState(() => {
    const storedData = localStorage.getItem(`card-${id}`);
    return storedData ? JSON.parse(storedData) : { id, name, description, price, image, cont: 0 };
  });

  const handleSumar = () => {
    setId_Card((prevState) => ({
      ...prevState,
      cont: prevState.cont <= 0 ? 1 : prevState.cont + 1,
    }));
  };

  const handleRestar = () => {
    setId_Card((prevState) => ({
      ...prevState,
      cont: prevState.cont <= 0 ? 0 : prevState.cont - 1,
    }));
  };

  const handleMenuCarrito = () => {
    setViewCard(!viewCard);
  };



  useEffect(() => {
    localStorage.setItem(`card-${id}`, JSON.stringify(id_Card));
  }, [id_Card, id]);

  return (
    <div className="cardMenuContainer">
      {
        viewCard && <Carrito onClose={handleMenuCarrito} />
      }

      <Link to={`${id}`} className="cardLink">
        <img alt="imagemenuitems" src={image} className="cardImage" />
      </Link>
      <div className="cardContent">
        <h2 className="cardTitle">{name}</h2>
        <p className="cardDescription">{description}</p>
        <div className="OrdenarCompra">
          <h2 className="cardPrice">${price}</h2>
          <div className="botonesCarrito">
            <div className="botones-flex">
              <label className="aumentardisminuir" onClick={handleRestar}>
                -
              </label>
              <input
                className="inputcard"
                type="text"
                value={id_Card.cont}
                disabled
              />
              <label className="aumentardisminuir" onClick={handleSumar}>
                +
              </label>
              <img
                src={carrito}
                title="Ve Al Carrito"
                alt="Carrito"
                className="aumentardisminuir"
                onClick={handleMenuCarrito}
              />
            </div>
            <p className="agregarCarritoTitulo"></p>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default CardMenuItems;
