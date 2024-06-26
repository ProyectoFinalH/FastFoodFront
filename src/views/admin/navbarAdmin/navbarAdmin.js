import React from "react";
import cerrarSesion from "../../../images/cerrarSesion.svg";
import "./navbarAdmin.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearTokenAdmin, logoutAdmin } from "../../../Redux/actions";



function NavbarAdmin() {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAdmin())//token a null
    dispatch(clearTokenAdmin)//localstorage de token a null
  }


  return (
    <div className="dasboardContainer">
      <div className="tittleDash">
        <h2>Dashboard Admin</h2>
      </div>
      <Link to="/loginAdmin">
      <div>
        <button className="buttonDashboard" onClick={handleLogout}>
          <div >
            <h2>Cerrar Sesion</h2>
          </div>
          <div>
            <img src={cerrarSesion} alt="imagesc" />{" "}
          </div>
        </button>
      </div>
      </Link>
    </div>
  );
}

export default NavbarAdmin;
