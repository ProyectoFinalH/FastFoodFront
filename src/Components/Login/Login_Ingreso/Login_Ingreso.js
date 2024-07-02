import React, { useState, useEffect } from "react";
import imagen from "../Login_imagenes/logo.png";
import {
  RiUserLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeCloseLine,
} from "react-icons/ri";
import {
  login_User,
  login_user_localstorag,
  login_Emrpesa,
  Data_Empresa,
} from "../../../Redux/actions";
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
  const Empresa = useSelector((state) => state.EMPRESAUSER);
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
        if (userType === "user") {
          const responseData = await dispatch(login_User(formData));
          console.log(responseData);

          if (responseData) {
            guardarNombreUsuario(responseData.name);
            guardarCorreoUsuario(responseData.email);
            guardarEstatusUsuario(responseData.state);
            guardarIdUsuario(responseData.id);
            navigate("/home");
          }
        } else if (userType === "business") {
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

  useEffect(() => {
    if (Empresa && Empresa.role_id === 2) {
      dispatch(Data_Empresa(Empresa.id));
      navigate("/company");
    }
  }, [Empresa, navigate, dispatch]);

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
    <div className="login-container flex justify-center items-center">
      <div className="login-body bg-white rounded-lg shadow-lg overflow-hidden w-96">
        <img src={imagen} alt="Logo Fast Food" className="login-image" />
        <div className="login-content p-6">
          <div className="mb-4 flex justify-center">
            <div className="user-type-radio flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={userType === "user"}
                  onChange={handleUserTypeChange}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-1 text-gray-700">Usuario</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="business"
                  checked={userType === "business"}
                  onChange={handleUserTypeChange}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-1 text-gray-700">Empresa</span>
              </label>
            </div>
          </div>
          <div className="input-group mb-4 relative border border-gray-500 rounded px-4 py-2 rounded-md">
            <input
              type="text"
              name="emailOrPhone"
              value={formData?.emailOrPhone}
              onChange={handleChange}
              maxLength={100}
              placeholder="Celular/Correo"
              className="form-input pl-10 w-full"
            />
            <RiUserLine className="input-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {errors.emailOrPhone && (
            <div className="error-space text-red-500">
              {errors?.emailOrPhone}
            </div>
          )}
          <div className="input-group mb-4 relative border border-gray-500 rounded px-4 py-2 rounded-md">
            <input
              type={keyVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              maxLength={15}
              placeholder="Contraseña"
              className="form-input pl-10 w-full"
            />
            <RiLockPasswordLine className="input-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <div
              className="password-toggle cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={toggleVisibility}
            >
              {keyVisible ? (
                <RiEyeCloseLine className="input-icon text-gray-400" />
              ) : (
                <RiEyeLine className="input-icon text-gray-400" />
              )}
            </div>
          </div>
          {errors.password && (
            <div className="error-space text-red-500">{errors?.password}</div>
          )}
          {loginError && (
            <div className="error-space text-red-500">{loginError}</div>
          )}
          <div
            className="forgot-password text-sm text-gray-600 cursor-pointer mb-4 hover:border-b-2 border-red-600"
            onClick={() => setView("recuperarkey")}
          >
            ¿Olvidaste tu Contraseña?
          </div>
          <div className="button-container mb-4">
            <div
              className={`login-button bg-indigo-500 text-white px-4 py-2 rounded px-5 py-2 ${
                isButtonEnabled ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={isButtonEnabled ? handleSubmit : null}
            >
              Ingresar
            </div>
          </div>
          <LoginGoogle />
          <div className="login-group flex flex-col items-center mt-4 space-y-2">
            <div
              className="register text-sm text-gray-600 cursor-pointer hover:border-b-2 border-red-600"
              onClick={() => setView("registro")}
            >
              ¿No tienes una cuenta? Regístrate aquí
            </div>
            <div
              className="register text-sm text-gray-600 cursor-pointer hover:border-b-2 border-red-600"
              onClick={() => setView("registroEmpresa")}
            >
              ¿Eres una empresa? Regístrate aquí
            </div>
            <div
              className="register text-sm text-gray-600 cursor-pointer hover:border-b-2 border-red-600"
              onClick={handleInvitado}
            >
              Ingresa como Invitado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginIngreso;
