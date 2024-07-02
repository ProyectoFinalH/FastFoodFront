import React, { useState, useEffect } from "react";
import Eliminarproducto from "../../images/eliminar.png";
import sindatos from "../../images/pizzeria-SINDATOS.png";
import {
  Desarrollode_Compra,
  ID_Registro_Mercado_Pago,
  Sellcionar_Restaurante,
} from "../../Redux/actions";
import {
  obtenerContCarrito,
  obtenerItemsCarrito,
  eliminarItemCarrito,
  setOrder,
  actualizarItemCarrito,
} from "../localStorage-car/LocalStorageCar";
import { getSelctRestaurantapp } from "../Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
import { useDispatch, useSelector } from "react-redux";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
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
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch();

  initMercadoPago("APP_USR-2bf331dc-c934-490b-b87a-76fe4f965b37");

  const createPreference = async () => {
    try {
      const cards = obtenerItemsCarrito();
      const total_price = cards
        .reduce((acc, card) => acc + card.price * card.cont, 0)
        .toFixed(2);
      const compramercadopago = {
        descriptions: "App Fast Food",
        price: total_price,
        quantity: "1",
      };
      const datos = await dispatch(ID_Registro_Mercado_Pago(compramercadopago));
      return datos.id;
    } catch (error) {
      console.error(error);
      alertify.alert("Error", "No se pudo crear la preferencia de pago.");
      return null;
    }
  };

  const handleBuy = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await handlePagar();
      const id = await createPreference();
      if (id) {
        const baseUrl =
          "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=";
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
  };

  const handelIniciarsesion = () => {
    alertify.alert("Mensaje", "Para hacer la compra debes iniciar sesion");
  };

  useEffect(() => {
    const cards = obtenerItemsCarrito() || [];
    setSelectedCards(cards);
    // alertify.alert("error", "este es el carrito"+ getSelctRestaurantapp())
    if (!restaurante) {
      dispatch(Sellcionar_Restaurante(getSelctRestaurantapp()));
      setSelectRestid(getSelctRestaurantapp());
    } else {
      setSelectRestid(restaurante);
    }
  }, [restaurante, dispatch]);

  useEffect(() => {
    if (compraRealizada && ordenCompra) {
      console.log(
        "Compra realizada. Mostrando tiquete de compra:",
        ordenCompra
      );
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
    const total_price = cards
      .reduce((acc, card) => acc + card.price * card.cont, 0)
      .toFixed(2);
    const order_date = new Date().toISOString();
    try {
      const carr = await dispatch(
        Desarrollode_Compra(cards, User.id, slectedResid)
      );
      const compraData = {
        Carritos: {
          id: carr.id,
          user_id: User.email,
          restaurante,
          items: selectedCards,
          total_price,
          order_date,
          active: true,
          statusorder_id: 1,
        },
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
      window.location.replace("http://localhost:3000/menu/" + slectedResid);
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
            <li key={index}>
              - {item.name} x {item.cont} = $
              {(item.price * item.cont).toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total: ${ordenCompra.Carritos.total_price}</p>
        <h2>********************************************</h2>
        <div className="boton_flex">
          <div className="login-button-regresar" onClick={handleSalirCarrito}>
            Salir
          </div>
          {preferenceId && (
            <Wallet
              initialization={{ preferenceId }}
              customization={{ texts: { valueProp: "smart_option" } }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg max-w-4xl w-full overflow-hidden">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-2xl font-bold">Pagos</h1>
          <div
            className="cursor-pointer text-xl font-bold text-black"
            onClick={handleSalirCarrito}
          >
            X
          </div>
        </div>
        <div className="overflow-y-auto max-h-96">
          {compraRealizada ? (
            renderTiqueteCompra()
          ) : selectedCards.length === 0 ? (
            <div className="flex flex-col items-center py-12">
              <img
                src={sindatos}
                alt="Eliminar producto"
                className="w-20 h-20 mb-4"
              />
              <p className="mb-4">
                ¡Comienza tu carrito con tus comidas favoritas!
              </p>
              <div
                className="w-full max-w-md text-center rounded-md py-2 px-4 bg-gradient-to-r from-red-500 to-orange-500 text-white cursor-pointer"
                onClick={handleSalirCarrito}
              >
                Regresar al Menú
              </div>
            </div>
          ) : (
            selectedCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center">
                  <img
                    src={card.image}
                    alt="imgproducto"
                    className="w-32 h-32 object-cover mr-4 rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-lg">{card.name}</p>
                    <p className="text-gray-500">${card.price}</p>
                  </div>
                </div>
                <div className="flex items-center ">
                  <div className="flex items-cente ">
                    <img
                      src={Eliminarproducto}
                      onClick={() => handleDeleteItem(card.id)}
                      alt="Eliminar comida"
                      className="w-6 h-6 cursor-pointer mr-2"
                    />
                    <div className="flex items-center ml-4">
                      <div
                        className="text-2xl cursor-pointer mr-2"
                        onClick={() => handleDisminuir(card.id)}
                      >
                        -
                      </div>
                      <input
                        className="w-12 text-center border border-gray-300"
                        name="contador"
                        type="text"
                        maxLength="100"
                        value={obtenerContCarrito(card.id)}
                        disabled
                      />
                      <div
                        className="text-2xl cursor-pointer ml-2 "
                        onClick={() => handleSumar(card.id)}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="ml-10">
                    <p className="font-semibold ">Costo Total</p>
                    <p>${(card.price * card.cont).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {selectedCards.length > 0 && !compraRealizada && (
          <div className="flex justify-between items-center py-4">
            <div>
              <p className="font-semibold">Costo Total</p>
              <p className="font-semibold">
                $
                {selectedCards
                  .reduce((acc, card) => acc + card.price * card.cont, 0)
                  .toFixed(2)}
              </p>
            </div>
            {preferenceId ? null : User.name === "invitado" ? (
              <button
                className="w-32 bg-red-500 text-white font-semibold rounded-md py-2"
                onClick={handelIniciarsesion}
              >
                Pagar
              </button>
            ) : (
              <button
                className="w-32 bg-green-500 text-white font-semibold rounded-md py-2"
                onClick={handleBuy}
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando..." : "Pagar"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;
