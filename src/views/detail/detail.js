/* eslint-disable react-hooks/exhaustive-deps */

// import { /*useNavigate,*/ useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./detail.css";
import axios from "axios";
// import Navbar from "../../Components/navbar/navbar";

import carrito from "../../images/carrito.png";
import Carrito from "../../Components/Carrito/Carrito";
import {
  obtenerContCarrito,
  handleSumar,
  handleDisminuir,
} from "../../Components/localStorage-car/LocalStorageCar";

function Detail({ isOpen, handleCloseModal, menuItemId }) {
  const [viewCard, setViewCard] = useState(false);
  // const params = useParams();
  const [menuItem, setMenuItem] = useState({});
  const [cant, setCant] = useState(1);
  // const navigate = useNavigate();
  const detailRef = useRef(null);

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

    return () => setMenuItem({});
  }, [menuItemId]);

  const handleMenuCarrito = () => {
    setViewCard(!viewCard);
    //navigate('/menu')
  };

  const handleClickOutside = (event) => {
    console.log("Clicked outside");
    if (detailRef.current && !detailRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!isOpen || !menuItem) return null;

  return (
    <div className="detailContainer">
      {viewCard && <Carrito onClose={handleMenuCarrito} />}

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
              <label
                className="aumentardisminuir"
                onClick={() => handleDisminuir(menuItem.id)}
              >
                -
              </label>
              <input
                className="inputcard"
                type="text"
                value={cant} // Usa el estado para mostrar la cantidad
                disabled
              />
              <label
                className="aumentardisminuir"
                onClick={() => handleSumar(menuItem.id)}
              >
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
  );
}

export default Detail;
