import React, { useEffect, useState } from "react";
import "./Login_ingreso.css";
import imagen from "../Login_imagenes/food_sin_fondosi.png";
import icono_usuario from "../Login_imagenes/iconos/usuario.png";
import icono_key from "../Login_imagenes/iconos/contrasena.png";
import icono_ver from "../Login_imagenes/iconos/cerrar-ojo-black.png";
import icono_ocultar from "../Login_imagenes/iconos/ojo-con-pestanas-black.png";
import icono_google from "../Login_imagenes/iconos/icons8-google-48.png";
import { login_User } from "../../../Redux/actions";
import validationIngreso from "./Validar_Login_ingreso";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginIngreso = ({ setView }) => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.USER);
  const [keyVisible, setKeyVisible] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [userType, setUserType] = useState(""); 


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

  const handleSubmit = async () => {
    const validationErrors = validationIngreso(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Lógica para enviar los datos del formulario al servidor
      console.log("Datos del formulario:", formData);
      await dispatch(login_User(formData));
    }
  };

  const handleGoogleLogin = () => {

  };

  const handleInvitado = () =>{
    dispatch(login_User('invitado'))
  }

  useEffect(() => {

    if (User) {
      navigate('/home');
    } else {
      navigate('/');
    }
   
  }, [User, navigate]);

  useEffect(() => {
    const isValidEmailOrPhone = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{7,15}$/; 
      return emailRegex.test(value) || phoneRegex.test(value);
    };

    setIsButtonEnabled(
      isValidEmailOrPhone(formData.emailOrPhone.trim()) && 
      formData.password.trim() !== "" &&
      userType !== ""
    );
  }, [formData, userType]);



  const handleUserTypeChange = (event) => {
    setUserType(event.target.value); // Actualiza el tipo de usuario seleccionado
  };
  return (
    <div className="bodyIngreso">
      <img src={imagen} alt="Logo Fast Food" className="imageningreso" />
      <div className="contenedoringreso">
      
      <div className="raio_select">
          <label>
            <input
              type="radio"
              name="userType"
              value="user"
              checked={userType === "user"}
              onChange={handleUserTypeChange}
            /> Usuario
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="business"
              checked={userType === "business"}
              onChange={handleUserTypeChange}
            /> Empresa
          </label>
        </div>
        <div className="Grupoinput">
          <img src={icono_usuario} alt="icono ingreso" />
          <input
            type="text"
            name="emailOrPhone"
            value={formData.emailOrPhone}
            onChange={handleChange}
            maxLength={100}
            placeholder="Celular/Correo"
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
        <div 
            className={isButtonEnabled
                        ? 'ov-btn-grow-box' 
                        : 'ov-btn-grow-box-L2'
              
              
             } 
            onClick={isButtonEnabled ? handleSubmit : null}
            //style={{ cursor: isButtonEnabled ? 'pointer' : 'not-allowed' }}
          >
            Ingresar
          </div>
        </div>
        <div className="Grupoingreso">
          <div
            className="centrarlogogoogle"
            onClick={handleGoogleLogin}
            style={{ cursor: "pointer" }}
          >
            <img src={icono_google} alt="icono ingreso" />
            <div>Ingresar con Google</div>
          </div>
          <div className="Registrate" onClick={() => setView("registro")}>
            ¿No tienes una cuenta? Regístrate aquí
          </div>
          <div
            className="Registrate"
            onClick={() => setView("registroEmpresa")}
          >
            ¿Eres una empresa? Regístrate aquí
          </div>
          <div className="Registrate" onClick={handleInvitado}>
            Ingresa como Invitado
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginIngreso;
