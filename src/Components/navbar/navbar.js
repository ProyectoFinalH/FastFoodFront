import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import carrito from "../../images/carrito.svg";
import inicio from "../../images/inicio.png";
import usuario from "../../images/usuario.png";
import pedidos from "../../images/pedidos.png";
import "./navbar.css";
import { useSelector } from "react-redux";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const User = useSelector((state) => state.USER);

  return (
    <div className="navbar-container">
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
          className={`menu ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menu-content ${menuOpen ? "open" : ""}`}>
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
