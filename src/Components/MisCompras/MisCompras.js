import React, { useState, useEffect } from "react";
import "./MisCompras.css";
import Eliminarproducto from "../../images/eliminar.png";
import sindatos from "../../images/pizzeria-SINDATOS.png";

import {
  obtenerContCarrito,
  obtenerItemsCarrito,
  eliminarItemCarrito,
  limpiarCarrito,
  actualizarItemCarrito,
} from "../localStorage-car/LocalStorageCar";
import { useNavigate } from "react-router-dom";

const MisCompras = ({ onClose }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const cards = obtenerItemsCarrito();
    setSelectedCards(cards);
  }, []);

  const handleDisminuir = (id) => {
    setSelectedCards((prevCards) => {
      const updatedCards = prevCards?.map((card) => {
        if (card?.id === id && card?.cont > 0) {
          const newCount = card?.cont - 1;
          const updatedCard = { ...card, cont: newCount };
          actualizarItemCarrito(updatedCard);
          return updatedCard;
        }
        return card;
      });
      return updatedCards.filter((card) => card?.cont > 0);
    });
  };

  const handleSumar = (id) => {
    setSelectedCards((prevCards) => {
      const updatedCards = prevCards?.map((card) => {
        if (card?.id === id && card?.cont > 0) {
          const newCount = card?.cont + 1;
          const updatedCard = { ...card, cont: newCount };
          actualizarItemCarrito(updatedCard);
          return updatedCard;
        }
        return card;
      });
      return updatedCards;
    });
  };

  const handlePagar = () => {
    limpiarCarrito();
    onClose();
  };

  const handleDeleteItem = (id) => {
    eliminarItemCarrito(id);
    setSelectedCards((prevCards) =>
      prevCards?.filter((card) => card?.id !== id)
    );
  };

  const handleSalirCarrito = () => {
    onClose();
    navigate("/menu");
  };

  return (
    <div className="CarritoBody">
      <div className="carCarrito">
        <div className="carCarritoHeader">
          <h1>Pagos</h1>
          <div className="closeButton" onClick={handleSalirCarrito}>
            X
          </div>
        </div>
        <div className="carCarritoContent">
          {selectedCards?.length === 0 ? (
            <div className="emptyCarrito">
              <img src={sindatos} alt="Eliminar producto" />
              <p>¡Comienza tu carrito con tus comidas favoritas!</p>
              <label>Agrega productos y disfruta del delicioso sabor.</label>
              <div
                className="login-button-regresar"
                onClick={handleSalirCarrito}
              >
                Regresar al Menú
              </div>
            </div>
          ) : (
            selectedCards?.map((card) => (
              <div className="cardProducto" key={card?.id}>
                <img src={card?.image} alt="imgproducto" />
                <div className="card-nombre-costo">
                  <label>{card?.name}</label>
                  <label>${card?.price}</label>
                </div>
                <div className="CarritoBotones">
                  <div className="signos">
                    <img
                      src={Eliminarproducto}
                      onClick={() => handleDeleteItem(card?.id)}
                      alt="Eliminar comida"
                    />
                  </div>
                  <div
                    className="signos"
                    onClick={() => handleDisminuir(card?.id)}
                  >
                    -
                  </div>
                  <div>
                    <input
                      name="contador"
                      type="text"
                      maxLength={100}
                      value={obtenerContCarrito(card?.id)}
                      disabled
                    />
                  </div>
                  <div className="signos" onClick={() => handleSumar(card?.id)}>
                    +
                  </div>
                </div>
                <div className="costoTotal">
                  <label>Costo Total</label>
                  <label>${card?.price * card?.cont}</label>
                </div>
              </div>
            ))
          )}
        </div>
        {selectedCards?.length > 0 && (
          <div className="Pagarproductos">
            <label className="pagolabel">Costo Total</label>
            <label className="pagolabel">
              $
              {selectedCards?.reduce(
                (acc, card) => acc + card?.price * card?.cont,
                0
              )}
            </label>
            <buttonpagarButton onClick={handlePagar}>Pagar</buttonpagarButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisCompras;
