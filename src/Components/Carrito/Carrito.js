import React, { useState, useEffect } from "react";
import "./Carrito.css";
import Eliminarproducto from "../../images/eliminar.png";
import sindatos from '../../images/pizzeria-SINDATOS.png';
import { Desarrollode_Compra } from '../../Redux/actions';
import {
  obtenerContCarrito,
  obtenerItemsCarrito,
  eliminarItemCarrito,
  resetearCarrito,
  actualizarItemCarrito,
} from "../localStorage-car/LocalStorageCar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Carrito({ onClose }) {
  const User = useSelector((state) => state.USER);
  const Carrito = useSelector((state) => state.Carrito);
  const [selectedCards, setSelectedCards] = useState([]);
  const [mensaje] = useState("¡Comienza tu carrito con tus comidas favoritas!");
  const [compraRealizada, setCompraRealizada] = useState(false);
  const [ordenCompra, setOrdenCompra] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id_restaurante = 1;

  useEffect(() => {
    const cards = obtenerItemsCarrito() || [];
    console.log("Datos cargados desde localStorage:", cards);
    setSelectedCards(cards);
  }, []);

  useEffect(() => {
    if (compraRealizada && ordenCompra) {
      console.log("Compra realizada. Mostrando tiquete de compra:", ordenCompra);
    }
  }, [compraRealizada, ordenCompra]);

  const handleDisminuir = (id) => {
    setSelectedCards((prevCards) => {
      const updatedCards = prevCards.map((card) => {
        if (card.id === id && card.cont > 0) {
          const newCount = card.cont - 1;
          const updatedCard = { ...card, cont: newCount };
          actualizarItemCarrito(updatedCard);
          return updatedCard;
        }
        return card;
      });
      console.log("Datos después de disminuir:", updatedCards);
      return updatedCards.filter((card) => card.cont > 0);
    });
  };

  const handleSumar = (id) => {
    setSelectedCards((prevCards) => {
      const updatedCards = prevCards.map((card) => {
        if (card.id === id) {
          const newCount = card.cont + 1;
          const updatedCard = { ...card, cont: newCount };
          actualizarItemCarrito(updatedCard);
          return updatedCard;
        }
        return card;
      });
      console.log("Datos después de sumar:", updatedCards);
      return updatedCards;
    });
  };

  const handlePagar = () => {
    if (!User || !User.state) {
      alert("Debes registrarte para poder hacer tu pedido");
    } else {
      const cards = obtenerItemsCarrito();
      const total_price = cards.reduce((acc, card) => acc + card.price * card.cont, 0).toFixed(2);
      const order_date = new Date().toISOString();
      const compraData = {
        Carrito: {
          id: Math.floor(Math.random() * 1000),  // Generamos un ID aleatorio para la orden
          user_id: User.register,
          restaurant_id: id_restaurante,
          items: cards,
          total_price,
          order_date,
          active: true,
        }
      };

      dispatch(Desarrollode_Compra(cards, User.register, id_restaurante))
        .then(() => {
          resetearCarrito();
          setSelectedCards([]);
          setCompraRealizada(true);
          setOrdenCompra(compraData); // Aquí guardamos la orden de compra
          console.log("Compra realizada con éxito:", compraData);
          alert("Pago desarrollado con éxito");
        })
        .catch((error) => {
          console.error("Error al procesar el pago", error.message);
          alert("Error al procesar el pago", error.message);
        });
    }
  };

  const handleDeleteItem = (id) => {
    eliminarItemCarrito(id);
    setSelectedCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card.id !== id);
      console.log("Datos después de eliminar:", updatedCards);
      return updatedCards;
    });
  };

  const handleSalirCarrito = () => {
    onClose();
    navigate('/menu');
  };


  const renderTiqueteCompra = () => {
    if (!ordenCompra) return null;

    return (
      <div className="ticketCompra">
        <h2>************ Tiquete de Compra ************</h2>
        <p>ID de Orden: {Carrito.id}</p>
        <p>Fecha: {ordenCompra.Carrito.order_date}</p>
        <p>Usuario: {ordenCompra.Carrito.user_id}</p>
        <p>Restaurante: {ordenCompra.Carrito.restaurant_id}</p>

        <h3>Productos:</h3>
        <ul>
          {ordenCompra.Carrito.items.map((item, index) => (
            <li key={index}>- {item.name} x {item.cont} = ${(item.price * item.cont).toFixed(2)}</li>
          ))}
        </ul>
        
        <p>Total: ${ordenCompra.Carrito.total_price}</p>
        <h2>********************************************</h2>
        <div className="login-button-regresar" onClick={handleSalirCarrito}>Salir</div> 
      </div>
    );
  };

  return (
    <div className="CarritoBody">
      <div className="carCarrito">
        <div className="carCarritoHeader">
          <h1>Pagos</h1>
          <div className="closeButton" onClick={handleSalirCarrito}>X</div>
        </div>
        <div className="carCarritoContent">
          {compraRealizada ? (
            renderTiqueteCompra()
          ) : (
            <>
              {selectedCards.length === 0 ? (
                <div className="emptyCarrito">
                  <img src={sindatos} alt="Eliminar producto" />
                  <p>{mensaje}</p>
                  <div className="login-button-regresar" onClick={handleSalirCarrito}>Regresar al Menú</div>
                </div>
              ) : (
                selectedCards.map((card) => (
                  <div className="cardProducto" key={card.id}>
                    <img src={card.image} alt="imgproducto" />
                    <div className="card-nombre-costo">
                      <label>{card.name}</label>
                      <label>${card.price}</label>
                    </div>
                    <div className="CarritoBotones">
                      <div className="signos">
                        <img src={Eliminarproducto} onClick={() => handleDeleteItem(card.id)} alt="Eliminar comida" />
                      </div>
                      <div className="signos" onClick={() => handleDisminuir(card.id)}>-</div>
                      <div>
                        <input name="contador" type="text" maxLength={100} value={obtenerContCarrito(card.id)} disabled />
                      </div>
                      <div className="signos" onClick={() => handleSumar(card.id)}>+</div>
                    </div>
                    <div className="costoTotal">
                      <label>Costo Total</label>
                      <label>${card.price * card.cont}</label>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
        {selectedCards.length > 0 && !compraRealizada && (
          <div className="Pagarproductos">
            <label className="pagolabel">Costo Total</label>
            <label className="pagolabel">
              ${selectedCards.reduce((acc, card) => acc + card.price * card.cont, 0)}
            </label>
            <button onClick={handlePagar}>Pagar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;
