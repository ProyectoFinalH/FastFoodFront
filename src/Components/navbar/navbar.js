import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../images/logo.png";
import carrito from "../../images/carrito.svg";
import closeIcon from "../../images/GgCloseR.png";
import "./navbar.css";
import { logoutUser } from "../../Redux/actions";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const User = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar-container">
      <div className="left-section">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <span>FastFood</span>
        </div>
      </div>
      <div className="right-section">
        {User !== "invitado" && (
          <div className="carrito-container">
            <Link to="/carrito">
              <img src={carrito} alt="Carrito" className="carrito-img" />
            </Link>
          </div>
        )}
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
              <NavLink to="/home" onClick={toggleMenu}>Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/account" onClick={toggleMenu}>Mi cuenta</NavLink>
            </li>
            <li>

              <NavLink to="/order">
                {/* <img src={pedidos} alt="" /> */}
                Mi Pedido
              </NavLink>
            </li>            
            <li>
              <NavLink to="/menu/create">
                {/* <img src={pedidos} alt="" /> */}
                Crear Menu
              </NavLink>

            </li>
            {User !== "invitado" && (
              <li>
                <button className="close-btn" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
