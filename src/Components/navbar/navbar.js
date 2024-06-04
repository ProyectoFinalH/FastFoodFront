import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import carrito from "../../images/carrito.svg";
import closeIcon from "../../images/GgCloseR.png";
import "./navbar.css";
import { useSelector } from "react-redux";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const User = useSelector((state) => state.USER);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="navbar-container">
      {/* Capa de fondo que se vuelve borrosa */}
      {menuOpen && <div className="background-layer"></div>}

      <div className="left-section">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <span>FastFood</span>
        </div>
      </div>
      <div className="right-section">
        {User === "invitado" ? null : (
          <div className="carrito-container">
            <Link to="/carrito">
              <img src={carrito} alt="Carrito" className="carrito-img" />
            </Link>
          </div>
        )}
        <div
          ref={menuRef}
          className={`menu ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menu-content ${menuOpen ? "open" : ""}`}>
          <div className="menu-header">
            <button className="close-btn" onClick={() => setMenuOpen(false)}>
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
          <ul>
            <li>
              <NavLink to="/home">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/account">Mi cuenta</NavLink>
            </li>
            <li>
              <NavLink to="/order">Mi Pedido</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
