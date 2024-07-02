import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiShoppingCart2Line, RiCloseLine, RiMenu3Line } from "react-icons/ri";
import logo from "../../images/logo.png";
import Carrito from "../Carrito/Carrito";
import { logoutUser } from "../../Redux/actions";
import { eliminarDatosUsuario } from "../Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
import {
  eliminarItemCarrito,
  resetearCarrito,
} from "../localStorage-car/LocalStorageCar";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menucarrito, setMenucarrito] = useState(false);
  const User = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    eliminarDatosUsuario();
    eliminarItemCarrito();
    resetearCarrito();
    window.location.href = "/";
  };

  const handleIniciarSesion = () => {
    dispatch(logoutUser());
    eliminarDatosUsuario();
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuCarrito = () => {
    setMenucarrito(!menucarrito);
  };

  return (
    <div className="navbar-container bg-white shadow-md px-6 py-1 flex justify-between items-center">
      <div className="left-section flex items-center">
        <NavLink to="/home" className="logo-container flex items-center">
          <img src={logo} alt="logo" className="logo w-16 h-auto" />
          <span className="fastfood-text text-2xl font-bold ml-4">
            FastFood
          </span>
        </NavLink>
      </div>
      <div className="right-section flex items-center">
        {!User || User.name !== "invitado" ? (
          <div
            className="carrito-container ml-auto mr-6 cursor-pointer"
            onClick={handleMenuCarrito}
            aria-label="Open cart"
          >
            <RiShoppingCart2Line className="text-black text-2xl" />
          </div>
        ) : null}
        <div
          className="menu cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <RiMenu3Line className="text-black text-2xl" />
        </div>
        <div
          className={`menu-content fixed top-0 right-0 h-full bg-white z-50 w-60 px-6 py-10 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="close-btn-x absolute top-0 right-0 mr-10 mt-4 cursor-pointer">
            <RiCloseLine className="text-black text-2xl" onClick={toggleMenu} />
          </div>
          <ul className="mt-10">
            <li className="mb-6">
              <NavLink
                to="/home"
                onClick={toggleMenu}
                className="text-black text-lg hover:underline"
              >
                Inicio
              </NavLink>
            </li>
            {!User || User.name !== "invitado" ? (
              <li className="mb-6">
                <NavLink
                  to="/account"
                  onClick={toggleMenu}
                  className="text-black text-lg hover:underline"
                >
                  Mi cuenta
                </NavLink>
              </li>
            ) : null}
            {!User || User.name !== "invitado" ? (
              <li>
                <button
                  className="close-btn border border-gray-300 rounded px-4 py-2 mt-8 text-base text-gray-700 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <li>
                <NavLink
                  onClick={handleIniciarSesion}
                  className="text-black text-lg hover:underline"
                >
                  Iniciar sesión
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      {menucarrito && <Carrito onClose={handleMenuCarrito} />}
    </div>
  );
}

export default Navbar;
