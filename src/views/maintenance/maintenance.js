import React from 'react'
import "./maintenance.css";
import logo from "../../images/logo.png"

function Maintenance() {
  return (
    <div className="maintenanceContainer">
        <img src={logo} alt='logo'/>
    <h1>¡Página en Mantenimiento!</h1>
    <p>Estamos trabajando para mejorar la experiencia. Vuelve pronto.</p>
  </div>
  )
}

export default Maintenance