import React, { useEffect, useState } from "react";
import logo from "../../../images/logo.png";
import {
  RiUserLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeCloseLine,
} from "react-icons/ri";
import { loginAdmin } from "../../../Redux/actions";
import validationIngreso from "./Validar_Login_Admin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import { jwtDecode } from "jwt-decode";
import { logoutAdmin } from "../../../Redux/actions";

const LoginAdmin = () => {
  const dispatch = useDispatch();

  const [keyVisible, setKeyVisible] = useState(false);
  const token = useSelector((state) => state.token);

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

  useEffect(() => {
    dispatch(logoutAdmin()); //borrar token variable global
    window.localStorage.removeItem("loggedFastFoodAdmin"); //borrar token localstorage
  }, [dispatch]);

  useEffect(() => {
    console.log("entre para hacer post", submitComplete);
    if (submitComplete.email) {
      dispatch(loginAdmin(submitComplete))
        .then()
        .catch()
        .finally(() => {
          setIsLoginComplete(true);
        }); //Lee y guarda token en variable global
    }
  }, [submitComplete, dispatch]);

  useEffect(() => {
    console.log("entre porque cambio el token");
    if (isLoginComplete && token) {
      const infoAdmin = jwtDecode(token.data); //Decodifica el token

      if (infoAdmin.role_id !== 3) {
        //si el token no tiene rol de superadmin regresa Login
        alertify.alert("Mensaje", "Usuario no autorizado", () => {
          dispatch(logoutAdmin());
          window.localStorage.removeItem("loggedFastFoodAdmin");
          navigate("/loginAdmin");
        });
      } else {
        window.localStorage.setItem(
          "loggedFastFoodAdmin",
          JSON.stringify(token)
        );
        navigate("/Admin"); //si tiene rol superadmin va Admin
      }
    } else if (isLoginComplete && !token) {
      alertify.alert(
        "Mensaje", //si no hay token regresa a Login
        "Credenciales invalidas, debe loguearse para continuar",
        () => {
          navigate("/loginAdmin");
        }
      );
    }
  }, [token, isLoginComplete, navigate, dispatch]);

  return (
    <div className="login-container flex justify-center items-center h-screen">
      <div className="login-body bg-white rounded-lg shadow-lg overflow-hidden w-96">
        <img src={logo} alt="Logo Fast Food" className="login-image mx-auto mt-4 h-30" />
        <div className="login-content p-6">
          <form className="formRegister" onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-bold mb-4">Ingresar como Administrador</h2>
            <div className="input-group relative my-4 mb-0 border border-gray-500 rounded px-4 py-2 rounded-md">
              <RiUserLine className="input-icon absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="email"
                value={formData.email}
                maxLength={100}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="form-input pl-7 pr-10 w-full"
              />
            </div>
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            <div className="input-group relative my-4 mb-0 border border-gray-500 rounded px-4 py-2 rounded-md">
              <RiLockPasswordLine className="input-icon absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={keyVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                maxLength={15}
                onChange={handleChange}
                placeholder="Contraseña"
                className="form-input pl-7 pr-10 w-full"
              />
              <div className="password-toggle cursor-pointer absolute right-5 top-1/2 transform -translate-y-1/2" onClick={toggleVisibility}>
                {keyVisible ? (
                  <RiEyeCloseLine className="input-icon text-gray-400" />
                ) : (
                  <RiEyeLine className="input-icon text-gray-400" />
                )}
              </div>
            </div>
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            <div className="button-container">
              <button type="submit" className={`w-full  my-4 mb-0 py-2 px-4 bg-green-400 text-white rounded-md ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500 transition-colors duration-300"}`}>
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
