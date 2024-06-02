import React, { useState } from "react";
import './Login_Recuperar_key.css'
import imagen from "../Login_imagenes/food_sin_fondosi.png";
import icono_usuario from "../Login_imagenes/iconos/usuario.png";
import validationRigistro from "./Validar_Login_ingreso";

const Recuperarkey = ({setView}) => {
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
      if (!userData.name.trim()) {
        setErrors({ name: "Por favor, ingresa tu correo electrónico o número de celular" });
        setAttemptedSubmit(true);
        return;
      }

      const validationErrors = validationRigistro(userData);
      setErrors(validationErrors);
      setAttemptedSubmit(true);

      if (Object.keys(validationErrors).length === 0) {
      }
    };

    return (
      <div className="bodyIngreso">
        <img src={imagen} alt="Logo Fast Foot" className="imageningreso" />
        <p>Ingresa tu correo electrónico o número de celular asociado a tu cuenta:</p>
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

          <div className="ov-btn-container">
            <div className="ov-btn-grow-box" onClick={handleSubmit}>
              Enviar
            </div>
          </div>

          <div className="Grupoingreso">
            <div
              className="Registrate"
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
}

export default Recuperarkey;
