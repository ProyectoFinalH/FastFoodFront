import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import carrito from "../../images/carrito.svg";
import inicio from "../../images/inicio.png";
import usuario from "../../images/usuario.png";
import pedidos from "../../images/pedidos.png";
// import cerrarSesion from "../../images/cerrarSesion.png";
import "./navbar.css";
import { useSelector } from "react-redux";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const User = useSelector((state) => state.USER);

  return (
    <div className="navContainer">
      
      <div>
        <div
          className="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="menuUl">
          <ul className={menuOpen ? "open" : ""}>
            <li className="iconoMenu">
              <NavLink to="/home">
                <img className="iconoMenu" src={inicio} alt="" />
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/account">
                <img src={usuario} alt="" />
                Mi cuenta
              </NavLink>
            </li>
            <li>
              <NavLink to="/order">
                <img src={pedidos} alt="" />
                Mi Pedido
              </NavLink>
            </li>
            {/* <li>
            <NavLink to="/login">
          <img src={cerrarSesion} alt="" />
              Cerrar sesion
              </NavLink>
          </li> */}
          </ul>
        </div>
      </div>
      <div className="logoContainer">
        <img src={logo} alt="logo" className="logo" />
      </div>

      <div className="overlay" style={{ display: menuOpen ? "block" : "none" }}></div>
      
          {
              User==='invitado'
              ?null
            :
            <div className="carritoContainer"><Link to="/carrito">
            <img src={carrito} alt="Carrito" className="carrito-img" />
          </Link>
          </div>

          }
        
      

    </div>
  );
}

export default Navbar;
