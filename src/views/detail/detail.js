import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { RiShoppingCart2Line } from "react-icons/ri";
import Carrito from "../../Components/Carrito/Carrito";
import {
  obtenerContCarrito,
  handleSumar,
  handleDisminuir,
} from "../../Components/localStorage-car/LocalStorageCar";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";

function Detail({ isOpen, handleCloseModal, menuItemId }) {
  const [viewCard, setViewCard] = useState(false);
  const [menuItem, setMenuItem] = useState({});
  const [cant, setCant] = useState(1);

  const detailRef = useRef(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const { data } = await axios(
          `http://localhost:5000/menuitems/${menuItemId}`
        );
        if (data?.id) {
          setMenuItem(data);
          const storedCant = obtenerContCarrito(data.id);
          setCant(storedCant || 0);
        }
      } catch (error) {
        console.log("Error al ingresar al menuItem", error);
      }
    };

    if (menuItemId) {
      fetchMenuItem();
    }

    return () => setMenuItem({});
  }, [menuItemId]);

  useEffect(() => {
    const storedCant = obtenerContCarrito(menuItemId);
    setCant(storedCant || 0);
  }, [menuItemId]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key && event.key.startsWith("card-")) {
        const storedCant = obtenerContCarrito(menuItemId);
        setCant(storedCant || 0);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [menuItemId]);

  const handleMenuCarrito = () => {
    setViewCard(!viewCard);
  };

  const handleDisminuirItem = async (idcard) => {
    if (cant === 0) {
      alertify.warning("No puedes disminuir de 0");
    } else {
      const newCant = await handleDisminuir(idcard);
      setCant(newCant);
    }
  };

  const handleAumentarItem = async (idcard) => {
    const newCant = await handleSumar(idcard);
    setCant(newCant);
  };

  if (!isOpen || !menuItem) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-4 rounded-lg max-w-md w-full overflow-hidden"
        ref={detailRef}
      >
        <div className="flex items-center justify-between pb-4">
          <button onClick={handleCloseModal} className="text-2xl font-bold">
            &times;
          </button>
          <h1 className="text-2xl font-bold">{menuItem?.name}</h1>
          <div className="w-8"></div>
        </div>

        <hr className="my-4 border-gray-300" />
        <div className="flex justify-center">
          <img
            src={menuItem?.image_url}
            alt={menuItem.name}
            className="w-64 h-auto rounded-lg"
          />
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="p-4">
          <p className="text-gray-700">{menuItem?.description}</p>
        </div>
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg">
          <h2>Unidades</h2>
          <div className="flex items-center space-x-2">
            <button
              className="bg-gray-200 px-3 py-1 rounded-md"
              onClick={() => handleDisminuirItem(menuItem.id)}
            >
              -
            </button>
            <input
              className="w-12 text-center border border-gray-300"
              type="text"
              value={obtenerContCarrito(menuItem.id)}
              disabled
            />
            <button
              className="bg-gray-200 px-3 py-1 rounded-md"
              onClick={() => handleAumentarItem(menuItem.id)}
            >
              +
            </button>
            <div
              className="carritoIcon w-10 h-10 flex items-center justify-center cursor-pointer transition-transform duration-300 transform hover:scale-110 bg-red-500 text-white rounded-full"
              onClick={handleMenuCarrito}
            >
              <RiShoppingCart2Line size={24} />
            </div>
          </div>
        </div>
      </div>
      {viewCard && <Carrito onClose={handleMenuCarrito} />}
    </div>
  );
}

export default Detail;
