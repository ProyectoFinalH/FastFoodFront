import React from "react";
import "./Login_Recuperar_key.css";
import imagen from "../Login_imagenes/logo.png";
//import icono_usuario from "../Login_imagenes/iconos/usuario.png";
//import validationRigistro from "./Validar_Login_ingreso";
//import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";

const Recuperarkey = ({ setView }) => {
  return (
    <div className="bodyIngreso">
      <img src={imagen} alt="Logo Fast Foot" className="imageningreso mx-auto mt-4" />
      <p className="text-center">
        Hola, si tienes inconvenientes con el acceso a tu cuenta, comunícate con nosotros en el siguiente correo electrónico:
        <br />
        <span className="Correo-foot text-blue-500">fastfoodapp2024@gmail.com</span>
      </p>
      <div className="contenedoringreso">
        <div className="Grupoingreso">
          <div
            className="Registrate text-center text-blue-500 cursor-pointer mt-4"
            onClick={() => {
              setView("login");
            }}
          >
            Regresa al inicio
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recuperarkey;
