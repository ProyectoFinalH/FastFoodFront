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
  //const USER = useSelector((state) => state?.USER);
  const [keyVisible, setKeyVisible] = useState(false);
  const token = useSelector((state)=> state.token)
  
  const navigate = useNavigate();

  //console.log("user", USER)

  const [formData, setFormData] = useState({
    email: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validationIngreso(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      //console.log("Datos del formulario:", formData);
      dispatch(loginAdmin(formData, navigate));
      
    }
  };

  const isButtonDisabled = Object.keys(errors).length !== 0;

  // useEffect(()=>{
  //   if(token){
  //     navigate("/Admin");
  //   }
  // },[token,navigate]);

  useEffect(()=>{
    if (token){
      //console.log(token.data);
      const infoAdmin=jwtDecode(token.data);
      //console.log(infoAdmin);
      if(infoAdmin.role_id!==3){
        alertify.alert("Mensaje", 
          'Usuario no autorizado',()=>{
            dispatch(logoutAdmin());
            navigate("/loginAdmin");
          }); 
        }
      else{
        navigate("/Admin")
      }  

    }else{
      alertify.alert("Mensaje", 
        'No hay token presente, debe loguearse para continuar',()=>{
          navigate("/loginAdmin");
        }); 
      
    }
  },[token,navigate,dispatch]);

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
