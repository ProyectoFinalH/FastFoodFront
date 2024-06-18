import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css'; // Importa los estilos de AlertifyJS
import 'alertifyjs/build/css/themes/default.min.css';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import "./detail.css";
import axios from "axios";

import carrito from '../../images/carrito.png';
import Carrito from "../../Components/Carrito/Carrito";
import { obtenerContCarrito, handleSumar, handleDisminuir } from '../../Components/localStorage-car/LocalStorageCar';

function Detail({ isOpen, handleCloseModal, menuItemId }) {
  const [viewCard, setViewCard] = useState(false);
  const [menuItem, setMenuItem] = useState({});
  const [cant, setCant] = useState(1);

  const detailRef = useRef(null);

  useEffect(() => {
    axios(`http://localhost:5000/menuitems/${menuItemId}`)
      .then(({ data }) => {
        if (data?.id) {
          setMenuItem(data);
          const storedCant = obtenerContCarrito(data.id);
          setCant(storedCant);
        }
      })
      .catch(() => {
        console.log("Error al ingresar al menuItem");
      });

    return () => setMenuItem({});
  }, [menuItemId]);

  const handleMenuCarrito = () => {
    setViewCard(!viewCard);
  };

  const handleClickOutside = (event) => {
    if (detailRef.current && !detailRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
   // document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDisminuirItem = (idcard) => {
    if (cant === 0) {
      alertify.warning("no puedes disminuir de 0");
    } else {
      const newCant = handleDisminuir(idcard);
      setCant(newCant);
    }
  };

  const handleAumentarItem = (idcard) => {
    const newCant = handleSumar(idcard);
    setCant(newCant);
  };

  if (!isOpen || !menuItem) return null;

  return (
    <div>
    <div className="detailContainer">
      

      <div ref={detailRef} className="detailCardContainer">
        <div className="buttonClose">
          <button onClick={handleCloseModal}>X</button>
        </div>
        <div className="imageDetail">
          <img src={menuItem?.image_url} alt={menuItem.name} />
        </div>
        <div className="cardDetail">
          <div className="titleDetail">
            <h2>{menuItem?.name}</h2>
          </div>
          <p className="description-detal">{menuItem?.description}</p>
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
                value={cant} 
                disabled
              />
              <label className="aumentardisminuir" onClick={() => handleAumentarItem(menuItem.id)}>
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
      </div>
    </div>
    {viewCard && <Carrito onClose={handleMenuCarrito} />}
    </div>
  );
}

export default Detail;