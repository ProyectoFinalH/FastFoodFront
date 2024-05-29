import React, { useState } from "react";
import "./Login_ingreso.css";
import imagen from "../Login_imagenes/food_sin_fondosi.png";
import icono_usuario from "../Login_imagenes/iconos/usuario.png";
import icono_key from "../Login_imagenes/iconos/contrasena.png";
import icono_ver from "../Login_imagenes/iconos/cerrar-ojo-black.png";
import icono_google from "../Login_imagenes/iconos/icons8-google-48.png";
import icono_ocultar from "../Login_imagenes/iconos/ojo-con-pestanas-black.png";
import validationIngreso from "./Validar_Login_ingreso";

const LoginIngreso = ({ setView }) => {
  const [keyver, setKeyver] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    pass: "",
  });
  const [errors, setErrors] = useState({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handlever = () => {
    setKeyver(!keyver);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const validationErrors = validationIngreso(userData);
    setErrors(validationErrors);
    setAttemptedSubmit(true);

    if (Object.keys(validationErrors).length === 0) {
      // Aquí puedes hacer algo con los datos del formulario si es necesario
    }
  };

  return (
    <div className="bodyIngreso">
      <img src={imagen} alt="Logo Fast Foot" className="imageningreso" />
      <div className="contenedoringreso">
        <div className="Grupoinput">
          <img src={icono_usuario} alt="icono ingreso" />
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            maxLength={100}
            placeholder="Celular/Correo"
          />
          {attemptedSubmit && errors.name && (
            <div className="espacioError">{errors.name}</div>
          )}
        </div>
        <div className="Grupoinput">
          <img src={icono_key} alt="icono ingreso" />
          <input
            type={!keyver ? "password" : "text"}
            name="pass"
            value={userData.pass}
            onChange={handleChange}
            maxLength={15}
            placeholder="Contraseña"
          />
          <img
            src={keyver ? icono_ocultar : icono_ver}
            alt="Mostrar/Ocultar"
            onClick={handlever}
            className="ver"
          />
          {attemptedSubmit && errors.pass && (
            <div className="espacioError">{errors.pass}</div>
          )}
        </div>

        <div
          className="olvidastekey"
          onClick={() => {
            setView("recuperarkey");
          }}
        >
          ¿Olvidaste tu Contraseña?
        </div>

        <div className="ov-btn-container">
          <div className="ov-btn-grow-box" onClick={handleSubmit}>
            Ingresar
          </div>
        </div>

        <div className="Grupoingreso">
          <div className="centrarlogogoogle">
            <img src={icono_google} alt="icono ingreso" />
            <div> ingresar con google</div>
          </div>
          <div
            className="Registrate"
            onClick={() => {
              setView("registro");
            }}
          >
            ¿No tienes una cuenta? Regístrate aquí
          </div>
          <div
            className="Registrate"
            onClick={() => {
              setView("invitado");
            }}
          >
            Ingresa como Invitado
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginIngreso;
