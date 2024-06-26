import React, {useEffect, useState } from "react";
import "./Login_Admin.css";
import logo from "../../../images/logo.png"
import icono_usuario from "../Login_imagenes/iconos/usuario.png";
import icono_key from "../Login_imagenes/iconos/contrasena.png";
import icono_ver from "../Login_imagenes/iconos/cerrar-ojo-black.png";
import icono_ocultar from "../Login_imagenes/iconos/ojo-con-pestanas-black.png";

import { loginAdmin} from "../../../Redux/actions";
import validationIngreso from "./Validar_Login_Admin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import { jwtDecode } from "jwt-decode";
import { logoutAdmin } from "../../../Redux/actions";

const LoginAdmin = () => {
  const dispatch = useDispatch();

  const [keyVisible, setKeyVisible] = useState(false);
  const token = useSelector((state)=> state.token)
  
  const navigate = useNavigate();

  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [submitComplete, setSubmitComplete] = useState({});
  const [isLoginComplete, setIsLoginComplete] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validationIngreso(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitComplete(formData);
    }
  };

  const isButtonDisabled = Object.keys(errors).length !== 0;

  useEffect(()=>{
    dispatch(logoutAdmin());//borrar token variable global
    window.localStorage.removeItem('loggedFastFoodAdmin');//borrar token localstorage
  },[dispatch]);


  useEffect(()=>{
    console.log("entre para hacer post",submitComplete);
    if(submitComplete.email){

      dispatch(loginAdmin(submitComplete))
      .then()
      .catch()
      .finally(()=>{setIsLoginComplete(true);});//Lee y guarda token en variable global
      
    }
    
  },[submitComplete,dispatch]);


  useEffect(()=>{
    console.log("entre porque cambio el token");
    if (isLoginComplete&&token){
    
      const infoAdmin=jwtDecode(token.data);//Decodifica el token
      
      if(infoAdmin.role_id!==3){//si el token no tiene rol de superadmin regresa Login
        alertify.alert("Mensaje", 
          'Usuario no autorizado',()=>{
            dispatch(logoutAdmin());
            window.localStorage.removeItem('loggedFastFoodAdmin');;
            navigate("/loginAdmin");
          }); 
        }
      else{
        
        window.localStorage.setItem('loggedFastFoodAdmin',JSON.stringify(token))
        navigate("/Admin")//si tiene rol superadmin va Admin
      }  

    }else if(isLoginComplete&&!token){
      alertify.alert("Mensaje", //si no hay token regresa a Login
        'Credenciales invalidas, debe loguearse para continuar',()=>{
          navigate("/loginAdmin");
        }); 
      
    }
  },[token,isLoginComplete,navigate,dispatch]);

  

  return (
    <div className="login-admin-container">
      <div className="login-admin-bodyIngreso">
        <img src={logo} alt="Logo Fast Food" className="login-admin-imageningreso" />
        <div className="login-admin-contenedoringreso">
          <div className="login-admin-Grupoinput">
            <img src={icono_usuario} alt="icono ingreso" />
            <input
              type="text"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              maxLength={100}
              placeholder="Datos de Administrador"
            />
          </div>
          {errors.email && (
            <div className="login-admin-espacioError">{errors?.email}</div>
          )}
          <div className="login-admin-Grupoinput">
            <img src={icono_key} alt="icono ingreso" />
            <input
              type={keyVisible ? "text" : "password"}
              name="password"
              value={formData?.password}
              onChange={handleChange}
              maxLength={15}
              placeholder="Contraseña"
            />
            <img
              src={keyVisible ? icono_ocultar : icono_ver}
              alt="Mostrar/Ocultar"
              onClick={toggleVisibility}
              className="login-admin-ver"
            />
          </div>
          {errors.password && (
            <div className="login-admin-espacioError">{errors?.password}</div>
          )}
          <div className="button-container">
            <div className={`login-button ${isButtonDisabled ? 'disabled' : ''}`} onClick={handleSubmit}>
              Ingresar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
