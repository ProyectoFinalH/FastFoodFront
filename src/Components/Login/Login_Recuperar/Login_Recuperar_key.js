import React, { useEffect, useState } from "react";
import "./Login_Recuperar_key.css";
import imagen from "../Login_imagenes/logo.png";
import icono_usuario from "../Login_imagenes/iconos/usuario.png";
import validationRigistro from "./Validar_Login_ingreso";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";

const Recuperarkey = ({ setView }) => {
  const [userData, setUserData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedData = { ...userData, [name]: value };
    setUserData(updatedData);

    const validationErrors = validationRigistro(updatedData);
    setErrors(validationErrors);
   // alert(JSON.stringify(validationErrors))
  
    if(JSON.stringify(validationErrors)==='{}'){
      setIsButtonEnabled(true);
    }
    
  };

  const handleSubmit = () => {
    const validationErrors = validationRigistro(userData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alertify.confirm(
        "Confirmación",
        "¿Deseas enviar el formulario? Un administrador se pondrá en contacto contigo en menos de 24 horas a través de un correo electrónico para actualizar tus datos y permitirte ingresar con tu cuenta.",
        function () {
          alertify.success("Formulario enviado");
          setView("login");
        },
        function () {
          alertify.error("Acción cancelada");
        }
      ).set({ labels: { ok: "Enviar", cancel: "Cancelar" } });
    }
  };

  useEffect(() => {
    const validationErrors = validationRigistro(userData);
    setErrors(validationErrors);
    setIsButtonEnabled(Object.keys(validationErrors).length === 0);
  }, [userData]);

  return (
    <div className="bodyIngreso">
      <img src={imagen} alt="Logo Fast Foot" className="imageningreso" />
      <p>
        Por favor, ingresa tu correo electrónico asociado a tu cuenta. Un
        administrador se pondrá en contacto contigo en menos de 24 horas para
        actualizar tus datos.
      </p>
      <div className="contenedoringreso">
        <div className="Grupoinput">
          <img src={icono_usuario} alt="icono ingreso" />
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
            maxLength={100}
            placeholder="Ingresa tu Correo"
          />
          <br />
        </div>
        <br />
        {errors.email && (
          <label className="espacioError-recordarkey">{errors.email}</label>
        )}
        <div className="ov-btn-container">
          <div
            className={`login-button ${isButtonEnabled ? "" : "disabled"}`}
            onClick={isButtonEnabled ? handleSubmit : null}
            style={{ cursor: isButtonEnabled ? "pointer" : "not-allowed" }}
          >
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
};

export default Recuperarkey;
