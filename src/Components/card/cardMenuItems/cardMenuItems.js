import React, { useState, useEffect } from "react";
import "./cardMenuItems.css";
import { useNavigate } from "react-router-dom";
import carrito from "../../../images/carrito.png";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  obtenerContCarrito,
  guardarItemCarrito,
} from "../../localStorage-car/LocalStorageCar";
import Carrito from "../../Carrito/Carrito";
import {
  axiosInstance,
  configureAxios,
} from "../../../AuthContext/axiosInstance";

function CardMenuItems({
  id,
  name,
  description,
  price,
  image,
  handleSelectMenuItem,
  hideCartButtons,
  showEyeIcon,
}) {
  const [viewCard, setViewCard] = useState(false);
  const navigator = useNavigate();
  const [id_Card, setId_Card] = useState({
    id,
    name,
    description,
    price,
    image,
    cont: 0,
  }); // Inicializa cont en 0
  const [isRestored, setIsRestored] = useState(false);
  const token = useSelector((state) => state.token.data);
  const URLBACK="https://fastfoodback3-production.up.railway.app";

  useEffect(() => {
    // Obtener el contador del localStorage al montar el component
    const cont = obtenerContCarrito(id);
    if (id_Card.cont !== cont) {
      setId_Card((prevState) => ({ ...prevState, cont }));
    }
  }, [id, id_Card.cont]);

  useEffect(() => {
    const fetchMenuState = async () => {
      try {
        const response = await axios.get(
          URLBACK+`/menuitems/${id}`
        );
        setIsRestored(response.data.active);
      } catch (error) {
        console.error("Error al cargar el estado del menú", error);
      }
    };

    fetchMenuState(); // Llamar a la función al montar el componente
  }, [id]);

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
    navigator("/menu");
  };

  const handleClick = () => {
    handleSelectMenuItem(id);
  };

  const toggleItemState = async () => {
    try {
      const url = isRestored
        ? URLBACK+`/menuitems/delete/${id}`
        : URLBACK+`/menuitems/restore/${id}`;
      configureAxios(token);
      const response = await axiosInstance.put(url); // Usamos POST pero asegúrate de que coincide con el método esperado en tu backend
      setIsRestored(!isRestored); // Cambiamos el estado después de la solicitud
      console.log(response.data); // Manejo opcional de la respuesta
    } catch (error) {
      console.error("Hubo un error al realizar la solicitud", error);
    }
  };

  return (
    <div>
      {viewCard && <Carrito onClose={handleMenuCarrito} />}
      <div className="cardMenuContainer">
        <img
          alt="imagemenuitems"
          src={image}
          className="cardImage"
          onClick={handleClick}
        />

        <div className="cardContent">
          <h2 className="cardTitle">{name}</h2>
          <p className="cardDescription">{description.substring(0, 30)}...</p>
          <div className="OrdenarCompra">
            <h2 className="cardPrice">${price}</h2>
            {!hideCartButtons && (
              <div className="botonesCarrito">
                <div className="botones-flex">
                  <div className="buttonDecInc-Menu">
                    <label className="aumentardisminuir" onClick={handleRestar}>
                      -
                    </label>
                    <input
                      className="inputcard"
                      type="text"
                      value={obtenerContCarrito(id_Card.id)}
                      disabled
                    />
                    <label className="aumentardisminuir" onClick={handleSumar}>
                      +
                    </label>
                  </div>
                  <img
                    src={carrito}
                    title="Ve Al Carrito"
                    alt="Carrito"
                    className="carritoIcon"
                    onClick={handleMenuCarrito}
                  />
                </div>
                <p className="agregarCarritoTitulo"></p>
              </div>
            )}
          </div>
          {showEyeIcon && (
            <div
              onClick={toggleItemState}
              className={`iconoOjo ${
                isRestored ? "iconoOjoOcultar" : "iconoOjoMostrar"
              }`}
            >
              {isRestored ? "👁 Ocultar" : "👁 Mostrar"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardMenuItems;
