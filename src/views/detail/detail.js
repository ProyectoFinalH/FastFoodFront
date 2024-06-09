import React, { useEffect, useState } from "react";
import "./detail.css";
import axios from "axios";
import carrito from '../../images/carrito.png'
import Carrito from "../../Components/Carrito/Carrito";
import { obtenerContCarrito, handleSumar, handleDisminuir } from '../../Components/localStorage-car/LocalStorageCar'

function Detail({ isOpen, handleCloseModal, menuItemId }) {
  const [viewCard, setViewCard] = useState(false);
  const [menuItem, setMenuItem] = useState({});
  const [cant, setCant] = useState(0); // Inicializa la cantidad en 0

  useEffect(() => {
    // Fetch menu item details
    axios(`http://localhost:5000/menuitems/${menuItemId}`)
      .then(({ data }) => {
        if (data?.id) {
          setMenuItem(data);
          // Obtener la cantidad del localStorage
          const storedCant = obtenerContCarrito(data.id);
          setCant(storedCant);
        }
      })
      .catch(() => {
        console.log("Error al ingresar al menuItem");
      });
  }, [menuItemId]);

  useEffect(() => {
    // Actualiza la cantidad del localStorage en el estado cuando menuItem cambia
    if (menuItem.id) {
      const storedCant = obtenerContCarrito(menuItem.id);
      setCant(storedCant);
    }
  }, [menuItem]);

  const handleSumarItem = (id) => {
    handleSumar(id);
    setCant(obtenerContCarrito(id)); // Actualiza el estado
  };

  const handleDisminuirItem = (id) => {
    handleDisminuir(id);
    setCant(obtenerContCarrito(id)); // Actualiza el estado
  };

  const handleMenuCarrito = () => {
    setViewCard(!viewCard);
    setCant(obtenerContCarrito(menuItemId)); 

  };

  if (!isOpen || !menuItem) return null;

  return (
    <div className="detailContainer">
      {viewCard && <Carrito onClose={handleMenuCarrito} />}
      <div className="detailCardContainer">
        <div className="buttonClose">
          <button onClick={handleCloseModal}>X</button>
        </div>
        <div className="imageDetail">
          <img src={menuItem?.image_url} alt={menuItem.name} />
        </div>
        <div className="cardDetail">
          <div className="titleDetail">
            <h2>{menuItem?.name}</h2>
            <h2>${menuItem?.price}</h2>
          </div>
          <p>{menuItem?.description}</p>
        </div>
        <div className="cantContainer">
          <h2>Unidades</h2>
          <div className="botones-flex">
            <div className="buttonDecInc-Menu">
              <label className="aumentardisminuir" onClick={() => handleDisminuirItem(menuItem.id)}>
                -
              </label>
              <input
                className="inputcard"
                type="text"
                value={cant} // Usa el estado para mostrar la cantidad
                disabled
              />
              <label className="aumentardisminuir" onClick={() => handleSumarItem(menuItem.id)}>
                +
              </label>
            </div>
            <img
              src={carrito}
              title="Ve Al Carrito"
              alt="Carrito"
              className="aumentardisminuir"
              onClick={handleMenuCarrito}
            />
          </div>
        </div>
        <div className="buttonContainer">
          <button onClick={handleCloseModal}>Volver al menu</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
