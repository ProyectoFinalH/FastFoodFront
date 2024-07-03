import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiShoppingCart2Line } from "react-icons/ri";
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
  });
  const [isRestored, setIsRestored] = useState(false);
  const token = useSelector((state) => state.token.data);

  useEffect(() => {
    const cont = obtenerContCarrito(id);
    if (id_Card.cont !== cont) {
      setId_Card((prevState) => ({ ...prevState, cont }));
    }
  }, [id, id_Card.cont]);

  useEffect(() => {
    const fetchMenuState = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/menuitems/${id}`
        );
        setIsRestored(response.data.active);
      } catch (error) {
        console.error("Error al cargar el estado del menú", error);
      }
    };

    fetchMenuState();
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
        ? `http://localhost:5000/menuitems/delete/${id}`
        : `http://localhost:5000/menuitems/restore/${id}`;
      configureAxios(token);
      const response = await axiosInstance.put(url);
      setIsRestored(!isRestored);
      console.log(response.data);
    } catch (error) {
      console.error("Hubo un error al realizar la solicitud", error);
    }
  };

  return (
    <div>
      {viewCard && <Carrito onClose={handleMenuCarrito} />}
      <div className="cardMenuContainer bg-gray-100 shadow-md rounded-lg overflow-hidden cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1 mb-8 mx-3 w-80 h-[400px]">
        <img
          alt="imagemenuitems"
          src={image}
          className="cardImage w-full h-40 object-cover rounded-t-lg"
          onClick={handleClick}
        />
        <div className="cardContent flex flex-col justify-between p-4 h-[250px]">
          <h2 className="cardTitle text-xl font-bold text-gray-800">{name}</h2>
          <p className="cardDescription text-gray-600 mb-4">
            {description.substring(0, 30)}...
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <h2 className="cardPrice text-xl font-bold text-red-500">
                ${price}
              </h2>
            </div>
            <div className="flex items-center space-x-10">
              <div className="buttonDecInc-Menu flex items-center space-x-2">
                <button
                  className="aumentardisminuir w-8 h-8 flex items-center justify-center bg-gray-200 border border-gray-300 rounded"
                  onClick={handleRestar}
                >
                  -
                </button>
                <input
                  className="inputcard w-12 text-center text-lg font-semibold"
                  type="text"
                  value={obtenerContCarrito(id_Card.id)}
                  disabled
                />
                <button
                  className="aumentardisminuir w-8 h-8 flex items-center justify-center bg-gray-200 border border-gray-300 rounded"
                  onClick={handleSumar}
                >
                  +
                </button>
              </div>
              <div
                onClick={handleMenuCarrito}
                className="carritoIcon w-10 h-10 flex items-center justify-center cursor-pointer transition-transform duration-300 transform hover:scale-110 bg-red-500 text-white rounded-full"
                title="Ve Al Carrito"
              >
                <RiShoppingCart2Line className="text-white" />
              </div>
            </div>
          </div>
          {showEyeIcon && (
            <div
              onClick={toggleItemState}
              className={`iconoOjo px-5 py-1 text-sm rounded cursor-pointer ${
                isRestored
                  ? "bg-red-500 text-white"
                  : "bg-gray-500 text-gray-300"
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
