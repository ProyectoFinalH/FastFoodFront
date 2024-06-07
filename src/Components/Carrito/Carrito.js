import React, { useState, useEffect } from "react";
import "./Carrito.css";
import Eliminarproducto from "../../images/eliminar.png";

function Carrito({ onClose }) {
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const cardKeys = Object.keys(localStorage);
    const cards = cardKeys
      .filter((key) => key.startsWith("card-"))
      .map((key) => JSON.parse(localStorage.getItem(key)))
      .filter((card) => card.cont > 0); // Filtrar los items con cont > 0
    setSelectedCards(cards);
  }, []);

  const handleDelete = (id) => {
    setSelectedCards((prevCards) => {
      const updatedCards = prevCards.map((card) => {
        if (card.id === id && card.cont > 0) {
          const newCount = card.cont - 1;
          const updatedCard = { ...card, cont: newCount };
          if (newCount === 0) {
            localStorage.removeItem(`card-${id}`);
            return null; // Marcar para eliminación
          } else {
            localStorage.setItem(`card-${id}`, JSON.stringify(updatedCard));
            return updatedCard;
          }
        }
        return card;
      }).filter(Boolean); // Filtrar los elementos null
      return updatedCards.filter((card) => card.cont > 0); // Asegurarse de no incluir items con cont = 0
    });
  };

  return (
    <div className="CarritoBody">
      <div className="carCarrito">
        <div className="carCarritoHeader">
          <h1>Pagos</h1>
          <div className="closeButton" onClick={onClose}>X</div>
        </div>
        <div className="carCarritoContent">
          {selectedCards.map((card) => (
            <div className="cardProducto" key={card.id}>
              <img src={card.image} alt="imgproducto" />
              <div className="card-nombre-costo">
                <label>{card.name}</label>
                <label>${card.price}</label>
              </div>

              <div className="CarritoBotones">
                <div className="signos" onClick={() => handleDelete(card.id)}>
                  <img src={Eliminarproducto} alt="Eliminar comida" />
                </div>
                <div>
                  <input type="text" maxLength={100} value={card.cont} disabled />
                </div>
                <div className="signos">+</div>
              </div>
              
              <div className="costoTotal">
                <label className="labelTotal">Costo Total</label>
                <label>${card.price * card.cont}</label>
              </div>
            </div>
          ))}
        </div>
        <div className="Pagarproductos">
          <label className="pagolabel">Costo Total</label>
          <label className="pagolabel">
            ${selectedCards.reduce((acc, card) => acc + card.price * card.cont, 0)}
          </label>
          <button>Pagar</button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
