import React, { useState } from "react";
import imagen from "../Login_imagenes/food_sin_fondosi.png";
import icono_usuario from "../Login_imagenes/iconos/usuario.png";
import icono_home from "../Login_imagenes/iconos/entrega-a-domicilio.png";
import icono_mesa from "../Login_imagenes/iconos/mesa-redonda.png";
//import icono_ver from "../Login_imagenes/iconos/cerrar-ojo-black.png";
//import icono_google from "../Login_imagenes/iconos/icons8-google-48.png";
//import icono_ocultar from "../Login_imagenes/iconos/ojo-con-pestanas-black.png";
import validationIngresoinvitado from "./Validar_Login_invitado";
const LoginInvitado = ({ setView }) => {
  // const [keyver, setKeyver] = useState(false);
  const [deliveryType, setDeliveryType] = useState("restaurante");

  const [userData, setUserData] = useState({
    name: "",
    pass: "",
  });
  const [errors, setErrors] = useState({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const validationErrors = validationIngresoinvitado(userData);
    setErrors(validationErrors);
    setAttemptedSubmit(true);

    if (Object.keys(validationErrors).length === 0) {
    }
  };
  return (
    <div className="bodyinvitado">
      <img src={imagen} alt="Logo Fast Foot" className="imageningreso" />
      <p>invitado</p>
      <div className="contenedoringreso">
        <div className="Grupoinput">
          <img src={icono_usuario} alt="icono ingreso" />
          <input
            type="text"
            name="name"
            value={userData?.name}
            onChange={handleChange}
            maxLength={100}
            placeholder="Nombre del Usuario"
          />
          {attemptedSubmit && errors?.name && (
            <div className="espacioError">{errors.name}</div>
          )}
        </div>

        <div className="Gruporadiobuton">
          <div>
            <input
              className="input-radio-buton"
              type="radio"
              id="restaurante"
              name="deliveryType"
              value="restaurante"
              checked={deliveryType === "restaurante"}
              onChange={(e) => setDeliveryType(e.target.value)}
            />
            Restaurante
          </div>
          <div>
            <input
              type="radio"
              id="restaurante"
              name="deliveryType"
              value="restaurante"
              checked={deliveryType === "restaurante"}
              onChange={(e) => setDeliveryType(e.target.value)}
            />
            Domicilio
          </div>
        </div>

        <div className="Grupoinput">
          <img
            src={deliveryType === "domicilio" ? icono_home : icono_mesa}
            alt="icono ingreso"
          />
          <input
            type="text"
            name="domicilio"
            value={userData?.domicilio}
            onChange={handleChange}
            maxLength={15}
            placeholder={
              deliveryType === "domicilio" ? "Direccion" : "Número de la mesa"
            }
          />

          {attemptedSubmit && errors.pass && (
            <div className="espacioError">{errors?.pass}</div>
          )}
        </div>

        <div className="ov-btn-container">
          <div className="ov-btn-grow-box" onClick={handleSubmit}>
            Ingresar
          </div>
        </div>

        <div className="Grupoingreso">
          <div
            className="Registrate"
            onClick={() => {
              setView("login");
            }}
          >
            Regresar
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginInvitado;
