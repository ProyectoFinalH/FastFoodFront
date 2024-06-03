import React, { useEffect, useState } from "react";
import "./Login_Admin.css";
import imagen from "../Login_imagenes/food_sin_fondosi.png";
import icono_usuario from "../Login_imagenes/iconos/usuario.png";
import icono_key from "../Login_imagenes/iconos/contrasena.png";
import icono_ver from "../Login_imagenes/iconos/cerrar-ojo-black.png";
import icono_ocultar from "../Login_imagenes/iconos/ojo-con-pestanas-black.png";

import { login_User } from "../../../Redux/actions";
import validationIngreso from "./Validar_Login_Admin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginAdmin = ({ setView }) => {
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.USER);
  const [keyVisible, setKeyVisible] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const toggleVisibility = () => {
    setKeyVisible(!keyVisible);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors(
      validationIngreso({
        ...formData,
        [name]: value,
      })
    );
  };

  const handleSubmit = () => {
    const validationErrors = validationIngreso(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Lógica para enviar los datos del formulario al servidor
      console.log("Datos del formulario:", formData);
      dispatch(login_User(formData));
    }
  };

  useEffect(() => {
    if (USER === true) {
      navigate("/mainPage");
    }
  }, [USER, navigate]);

  return (
    <div className="bodyIngreso">
      <img src={imagen} alt="Logo Fast Food" className="imageningreso" />
      <div className="contenedoringreso">
        <div className="Grupoinput">
          <img src={icono_usuario} alt="icono ingreso" />
          <input
            type="text"
            name="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={handleChange}
            maxLength={100}
            placeholder="Datos de Administrador"
          />
        </div>
        {errors.emailOrPhone && (
          <div className="espacioError">{errors.emailOrPhone}</div>
        )}
        <div className="Grupoinput">
          <img src={icono_key} alt="icono ingreso" />
          <input
            type={keyVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            maxLength={15}
            placeholder="Contraseña"
          />
          <img
            src={keyVisible ? icono_ocultar : icono_ver}
            alt="Mostrar/Ocultar"
            onClick={toggleVisibility}
            className="ver"
          />
        </div>
        {errors.password && (
          <div className="espacioError">{errors.password}</div>
        )}
        <div className="olvidastekey" onClick={() => setView("recuperarkey")}>
          ¿Olvidaste tu Contraseña?
        </div>
        <div className="ov-btn-container">
          <div className="ov-btn-grow-box" onClick={handleSubmit}>
            Ingresar
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
