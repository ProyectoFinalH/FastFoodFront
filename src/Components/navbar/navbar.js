import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../images/logo.png";
import carrito from "../../images/carrito.svg";
import closeIcon from "../../images/GgCloseR.png";
import "./navbar.css";
import { logoutUser } from "../../Redux/actions";
import Carrito from "../Carrito/Carrito";

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
    <div className="navbar-container">
      <div className="left-section">
        <NavLink to="/home" className="logo-container">
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
        <div className="logo-container fastfood-text">
          <span>FastFood</span>
        </div>
      </div>
      <div className="right-section">
        {!User || User.name !== "invitado" ? (
          <div
            className="carrito-container"
            onClick={handleMenuCarrito}
            role="button"
            aria-label="Open cart"
          >
            <img src={carrito} alt="Carrito" className="carrito-img" />
          </div>
        ) : null}
        <div
          className="menu"
          onClick={toggleMenu}
          role="button"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menu-content ${menuOpen ? "open" : ""}`}>
          <div className="close-btn-x" onClick={toggleMenu}>
            <img src={closeIcon} alt="Close" />
          </div>
          <ul>
            <li>
              <NavLink to="/home" onClick={toggleMenu}>
                Inicio
              </NavLink>
            </li>
            {!User || User.name !== "invitado" ? (
              <li>
                <NavLink to="/account" onClick={toggleMenu}>
                  Mi cuenta
                </NavLink>
              </li>
            ) : null}
            {!User || User.name !== "invitado" ? (
              <li>
                <button className="close-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            ) : (
              <li>
                <NavLink onClick={handleIniciarSesion}>Iniciar sesión</NavLink>
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
