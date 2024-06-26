import React, { useState, useEffect } from "react";
import "./Login_ingreso.css";
import imagen from "../Login_imagenes/logo.png";
import icono_usuario from "../Login_imagenes/iconos/usuario.png";
import icono_key from "../Login_imagenes/iconos/contrasena.png";
import icono_ver from "../Login_imagenes/iconos/cerrar-ojo-black.png";
import icono_ocultar from "../Login_imagenes/iconos/ojo-con-pestanas-black.png";
import { login_User, login_user_localstorag, login_Emrpesa, Data_Empresa } from "../../../Redux/actions";
import validationIngreso from "./Validar_Login_ingreso";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "../Login_Google/Login_Google";

import {
  guardarNombreUsuario,
  guardarCorreoUsuario,
  guardarEstatusUsuario,
  guardarIdUsuario,
  obtenerEstatusUsuario,
  obtenerCorreoUsuario,
  obtenerNombreUsuario,
  obtenerIdUsuario,
} from "./LocalStorange_user/LocalStorange_user";


const LoginIngreso = ({ setView }) => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state?.USER);
  const Empresa = useSelector((state)=> state.EMPRESAUSER)
  const [keyVisible, setKeyVisible] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

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
      
      try {
        if(userType === "user"){
        const responseData = await dispatch(login_User(formData));//se guarda el token para luego decodificarlo con jwtDecode
        console.log(responseData);

        if (responseData) {
          guardarNombreUsuario(responseData.name);
          guardarCorreoUsuario(responseData.email);
          guardarEstatusUsuario(responseData.state);
          guardarIdUsuario(responseData.id);
          navigate("/home");
        }
      }else
      if(userType === "business"){
        const responseData = await dispatch(login_Emrpesa(formData));
        console.log(responseData);
      }
       
      } catch (error) {
        console.error("Error al intentar iniciar sesión:", error.message);
        setLoginError(error.message);
      }
    }
  };
  

  const handleInvitado = () => {
    dispatch(login_User("invitado"));
  };

  useEffect(() => {
    if (obtenerCorreoUsuario()) {
      const tem_Users = {
        state: obtenerEstatusUsuario(),
        id: obtenerIdUsuario(),
        email: obtenerCorreoUsuario(),
        name: obtenerNombreUsuario(),
      };
      dispatch(login_user_localstorag(tem_Users));
      navigate("/home");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (User) {
      guardarNombreUsuario(User?.name);
      guardarCorreoUsuario(User?.email);
      guardarEstatusUsuario(User?.state);
      guardarIdUsuario(User?.id);
      navigate("/home");
    } else {
      navigate("/");
    }


    
  }, [User, navigate]);

  useEffect(()=>{
    if(Empresa && Empresa.role_id === 2 ){
      dispatch(Data_Empresa(Empresa.id))
      navigate("/company");
    }
      


    
  },[Empresa, navigate, dispatch])




  useEffect(() => {
    const isValidEmailOrPhone = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{7,15}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    };

    setIsButtonEnabled(
      isValidEmailOrPhone(formData?.emailOrPhone?.trim()) &&
        formData?.password?.trim() !== "" &&
        userType !== ""
    );
  }, [formData, userType]);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className="login-container">
      <div className="login-body">
        <img src={imagen} alt="Logo Fast Food" className="login-image" />
        <div className="login-content">
          <div className="user-type-radio">
            <label>
              <input
                type="radio"
                name="userType"
                value="user"
                checked={userType === "user"}
                onChange={handleUserTypeChange}
              />{" "}
              Usuario
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="business"
                checked={userType === "business"}
                onChange={handleUserTypeChange}
              />{" "}
              Empresa
            </label>
          </div>
          <div className="input-group">
            <img src={icono_usuario} alt="icono ingreso" />
            <input
              type="text"
              name="emailOrPhone"
              value={formData?.emailOrPhone}
              onChange={handleChange}
              maxLength={100}
              placeholder="Celular/Correo"
            />
          </div>
          {errors.emailOrPhone && (
            <div className="error-space">{errors?.emailOrPhone}</div>
          )}
          <div className="input-group">
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
              className="password-toggle"
            />
          </div>
          {errors.password && (
            <div className="error-space">{errors?.password}</div>
          )}
          {loginError && <div className="error-space">{loginError}</div>}
          <div
            className="forgot-password"
            onClick={() => setView("recuperarkey")}
          >
            ¿Olvidaste tu Contraseña?
          </div>
          <div className="button-container">
            <div
              className={`login-button ${isButtonEnabled ? "" : "disabled"}`}
              onClick={isButtonEnabled ? handleSubmit : null}
              style={{ cursor: isButtonEnabled ? "pointer" : "not-allowed" }}
            >
              Ingresar
            </div>
          </div>
          <div className="login-group">
            <LoginGoogle />
            <div className="register" onClick={() => setView("registro")}>
              ¿No tienes una cuenta? Regístrate aquí
            </div>
            <div
              className="register"
              onClick={() => setView("registroEmpresa")}
            >
              ¿Eres una empresa? Regístrate aquí
            </div>
            <div className="register" onClick={handleInvitado}>
              Ingresa como Invitado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginIngreso;
