import React, { useState, useEffect } from "react";
import "./Carrito.css";
import Eliminarproducto from "../../images/eliminar.png";
import sindatos from '../../images/pizzeria-SINDATOS.png';
import { Desarrollode_Compra, ID_Registro_Mercado_Pago } from '../../Redux/actions';
import {
  obtenerContCarrito,
  obtenerItemsCarrito,
  eliminarItemCarrito,
  resetearCarrito,
  actualizarItemCarrito,
} from "../localStorage-car/LocalStorageCar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';





function Carrito({ onClose }) {
  //const dispach = useDispatch()
  const User = useSelector((state) => state.USER);
  const Empresa = useSelector((state)=>state.allRestaurants)
  const Carrito = useSelector((state) => state.Carrito);
  const [selectedCards, setSelectedCards] = useState([]);
  const [mensaje] = useState("¡Comienza tu carrito con tus comidas favoritas!");
  
  const [compraRealizada, setCompraRealizada] = useState(false);
  const [ordenCompra, setOrdenCompra] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  
  const [mensajePago] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  // Inicializar Mercado Pago
  initMercadoPago('TEST-50122e74-1f4b-40e3-8ddb-a830cd00b7bf', 
    {
      locale:"es-CO"
    }
  );


  // Función para crear la preferencia de pago
  const createPreference = async () => {
    try {
      const cards = obtenerItemsCarrito();
      const total_price = cards.reduce((acc, card) => acc + card.price * card.cont, 0).toFixed(2);
      const compramercadopago = {
        descriptions: "App Fast Food",
        price: total_price, // Total de la compra
        quantity: "1"
      }
      
      const datos = await dispatch(ID_Registro_Mercado_Pago(compramercadopago));
      const { id } = datos; // Ajusta esto según la estructura de `venta
      
      
      //alert(id)
      
      
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  // Función para manejar la compra a través de Mercado Pago
  const handleBuy = async () => {
    handlePagar()
     const id = await createPreference();

   //  alert(id)
          if (id) {
     
        setPreferenceId(id);
     
      }
    
   
  }



  useEffect(() => {
    const cards = obtenerItemsCarrito() || [];
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

  const handlePagar = () => {
    const restaurant_id = Empresa[0].id //!agrego item Empresa para comprender a quien se le vende, se debe identificar el vector al que pertenece
   
    if (!User || !User.state) {
      alert("Debes registrarte para poder hacer tu pedido");
    } else {
     
      const cards = obtenerItemsCarrito();
      const total_price = cards.reduce((acc, card) => acc + card.price * card.cont, 0).toFixed(2);
      const order_date = new Date().toISOString();
      const compraData = {
        Carrito: {
          id: Math.floor(Math.random() * 1000),
          user_id: User.email,
          restaurant_id,
          items: selectedCards,
          total_price,
          order_date,
          active: true,
          statusorder_id:1

        }
      };

      dispatch(Desarrollode_Compra(cards, User.id, restaurant_id ))
        .then(() => {
          resetearCarrito();
          setSelectedCards([]);
          setCompraRealizada(true);
          setOrdenCompra(compraData);

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
        <div className="boton_flex">
        <div className="login-button-regresar" onClick={handleSalirCarrito}>Salir</div>
        {preferenceId 
        && (   
          

        
<Wallet initialization={{ preferenceId, redirectMode: 'blank' }} target="_blank" customization={{ texts:{ valueProp: 'smart_option'}, visual: {
        buttonBackground: 'black', // Cambia este valor al color que desees
        borderRadius: '6px',
      },}} />

      

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
              <div>{mensajePago}</div>
              {renderTiqueteCompra()}
            </>
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
                    <div className="buttonDecInc-Menu">
                      <div className="signos">
                        <img src={Eliminarproducto} onClick={() => handleDeleteItem(card.id)} alt="Eliminar comida" />
                      </div>
                      <div className="aumentardisminuir" onClick={() => handleDisminuir(card.id)}>-</div>
                      <div>
                        <input name="contador" type="text" maxLength={100} value={obtenerContCarrito(card.id)} disabled />
                      </div>
                      <div className="aumentardisminuir" onClick={() => handleSumar(card.id)}>+</div>
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
            {preferenceId ? null: (
              
              <button onClick={handleBuy}>Pagar</button>
            )}
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;

