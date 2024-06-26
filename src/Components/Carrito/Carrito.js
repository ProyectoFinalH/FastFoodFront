import React, { useState, useEffect } from "react";
import "./Carrito.css";
import Eliminarproducto from "../../images/eliminar.png";
import sindatos from '../../images/pizzeria-SINDATOS.png';
import { Desarrollode_Compra, ID_Registro_Mercado_Pago, Sellcionar_Restaurante } from '../../Redux/actions';
import {
  obtenerContCarrito,
  obtenerItemsCarrito,
  eliminarItemCarrito,
  setOrder,
  actualizarItemCarrito,
} from "../localStorage-car/LocalStorageCar";
import {  getSelctRestaurantapp } from "../Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
import { useDispatch, useSelector } from "react-redux";
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import alertify from "alertifyjs";

function Carrito({ onClose }) {
  const User = useSelector((state) => state.USER);
  const Carrito = useSelector((state) => state.Carrito);
  const [slectedResid, setSelectRestid] = useState();
  const restaurante = useSelector((state) => state.SELCTRESTAURANT);
  const [selectedCards, setSelectedCards] = useState([]);
  const [compraRealizada, setCompraRealizada] = useState(false);
  const [ordenCompra, setOrdenCompra] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [pagarstado, setPagarestado] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Estado para controlar el procesamiento

  const dispatch = useDispatch();

  initMercadoPago('APP_USR-2bf331dc-c934-490b-b87a-76fe4f965b37');

  const createPreference = async () => {
    try {
      const cards = obtenerItemsCarrito();
      const total_price = cards.reduce((acc, card) => acc + card.price * card.cont, 0).toFixed(2);
      const compramercadopago = {
        descriptions: "App Fast Food",
        price: total_price,
        quantity: "1"
      };
      const datos = await dispatch(ID_Registro_Mercado_Pago(compramercadopago));
      return datos.id;
    } catch (error) {
      console.error(error);
      alertify.alert("Error", "No se pudo crear la preferencia de pago.");
      return null;
    }
  }

  const handleBuy = async () => {
    if (isProcessing) return; // Evitar múltiples ejecuciones
    setIsProcessing(true);
    try {
      await handlePagar();
      const id = await createPreference();
      if (id) {
        const baseUrl = "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=";
        const prefere = id.replace(baseUrl, "");
        if (prefere) {
          setPreferenceId(prefere);
        } else {
          alertify.alert("Error", "Por favor intenta nuevamente la compra");
        }
      }
    } catch (error) {
      console.error("Error en handleBuy", error);
    } finally {
      setIsProcessing(false);
    }
  }

  const handelIniciarsesion = () => {
    alertify.alert("Mensaje", "Para hacer la compra debes iniciar sesion");
  }

  useEffect(() => {
    const cards = obtenerItemsCarrito() || [];
    setSelectedCards(cards);
   // alertify.alert("error", "este es el carrito"+ getSelctRestaurantapp())
    if (!restaurante) {
      dispatch(Sellcionar_Restaurante(getSelctRestaurantapp()))
      setSelectRestid(getSelctRestaurantapp());
    } else {
      setSelectRestid(restaurante);
    }
  }, [restaurante, dispatch]);

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
      return updatedCards;
    });
  };

  const handlePagar = async () => {
    if (!User || !User.state) {
      alert("Debes registrarte para poder hacer tu pedido");
      return;
    }
    const cards = obtenerItemsCarrito();
    const total_price = cards.reduce((acc, card) => acc + card.price * card.cont, 0).toFixed(2);
    const order_date = new Date().toISOString();
    try {
      const carr = await dispatch(Desarrollode_Compra(cards, User.id, slectedResid));
      const compraData = {
        Carritos: {
          id: carr.id,
          user_id: User.email,
          restaurante,
          items: selectedCards,
          total_price,
          order_date,
          active: true,
          statusorder_id: 1
        }
      };
      setOrder(carr.id);
      setSelectedCards([]);
      setCompraRealizada(true);
      setOrdenCompra(compraData);
      setPagarestado(true);
    } catch (error) {
      console.error("Error al procesar el pago", error.message);
      alertify.alert("Error", "Error al procesar el pago: " + error.message);
    }
  };

  const handleDeleteItem = async (id) => {
    await eliminarItemCarrito(id);
    setSelectedCards((prevCards) => {
      return prevCards.filter((card) => card.id !== id);
    });
  };

  const handleSalirCarrito = () => {
    if (pagarstado) {
      window.location.replace('http://localhost:3000/menu/' + slectedResid);
    }
    onClose();
  };

  const renderTiqueteCompra = () => {
    if (!ordenCompra) return null;
    return (
      <div className="ticketCompra">
        <h2>************ Tiquete de Compra ************</h2>
        <p>ID de Orden: {Carrito.id}</p>
        <p>Fecha: {ordenCompra.Carritos.order_date}</p>
        <p>Usuario: {ordenCompra.Carritos.user_id}</p>
        <p>Restaurante: {ordenCompra.Carritos.restaurant_id}</p>
        <h3>Productos:</h3>
        <ul>
          {ordenCompra.Carritos.items.map((item, index) => (
            <li key={index}>- {item.name} x {item.cont} = ${(item.price * item.cont).toFixed(2)}</li>
          ))}
        </ul>
        <p>Total: ${ordenCompra.Carritos.total_price}</p>
        <h2>********************************************</h2>
        <div className="boton_flex">
          <div className="login-button-regresar" onClick={handleSalirCarrito}>Salir</div>
          {preferenceId && (
            <Wallet initialization={{ preferenceId }} customization={{ texts: { valueProp: 'smart_option' } }} />
          )}
        </div>
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
            <>
              {renderTiqueteCompra()}
            </>
          ) : (
            <>
              {selectedCards.length === 0 ? (
                <div className="emptyCarrito">
                  <img src={sindatos} alt="Eliminar producto" />
                  <p>¡Comienza tu carrito con tus comidas favoritas!</p>
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
                    <div>
                      <div className="card-eliminar">
                        <img src={Eliminarproducto} onClick={() => handleDeleteItem(card.id)} alt="Eliminar comida" style={{ width: '30px', height: '30px' }} />
                      </div>
                      <div className="car-aumentardisminuir" onClick={() => handleDisminuir(card.id)}>-</div>
                      <div>
                        <input className="card-inputcard" name="contador" type="text" maxLength={100} value={obtenerContCarrito(card.id)} disabled />
                      </div>
                      <div className="car-aumentardisminuir" onClick={() => handleSumar(card.id)}>+</div>
                    </div>
                    <div className="costoTotal">
                      <label>Costo Total</label>
                      <label>${(card.price * card.cont).toFixed(2)}</label>
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
              ${selectedCards.reduce((acc, card) => acc + card.price * card.cont, 0).toFixed(2)}
            </label>
            {preferenceId ? null : (
              User.name === "invitado" ?
                <button onClick={handelIniciarsesion} style={{ 'background-color': 'red' }}>Pagar</button> :
                <button onClick={handleBuy} disabled={isProcessing}>{isProcessing ? 'Procesando...' : 'Pagar'}</button>
            )}
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;
