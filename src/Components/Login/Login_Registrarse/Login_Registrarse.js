import React, { useEffect, useState } from "react";
import {
  RiUserLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeCloseLine,
} from "react-icons/ri";
import { register_user } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import imagen from "../Login_imagenes/logo.png";

const Registrarse = ({ setView }) => {
  const dispatch = useDispatch();
  const Register = useSelector((state) => state.RegisterUserData);
  const [keyVisible, setKeyVisible] = useState(false);
  const [confirmKeyVisible, setConfirmKeyVisible] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const toggleVisibility = () => {
    setKeyVisible(!keyVisible);
  };

  const toggleConfirmVisibility = () => {
    setConfirmKeyVisible(!confirmKeyVisible);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors(validateField(name, value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(userData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Datos del formulario:", userData);
      dispatch(register_user(userData));
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.username.trim()) {
      errors.username = "El nombre de usuario es requerido";
    } else if (
      data.username.trim().length < 4 ||
      data.username.trim().length > 60
    ) {
      errors.username =
        "El nombre de usuario debe tener entre 4 y 20 caracteres";
    }

    if (!data.email.trim()) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "El correo electrónico ingresado no es válido";
    }

    if (!data.password.trim()) {
      errors.password = "La contraseña es requerida";
    } else if (!/^[a-zA-Z0-9]{5,20}$/.test(data.password)) {
      errors.password =
        "La contraseña debe contener solo letras y números, y tener entre 5 y 20 caracteres";
    }

    if (!data.confirmPassword.trim()) {
      errors.confirmPassword = "Por favor confirma tu contraseña";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
  };

  const validateField = (name, value) => {
    let fieldErrors = {};

    switch (name) {
      case "username":
        if (!value.trim()) {
          fieldErrors.username = "El nombre de usuario es requerido";
        } else if (value.trim().length < 4 || value.trim().length > 60) {
          fieldErrors.username =
            "El nombre de usuario debe tener entre 4 y 20 caracteres";
        }
        break;
      case "email":
        if (!value.trim()) {
          fieldErrors.email = "El correo electrónico es requerido";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          fieldErrors.email = "El correo electrónico ingresado no es válido";
        }
        break;
      case "password":
        if (!value.trim()) {
          fieldErrors.password = "La contraseña es requerida";
        } else if (!/^[a-zA-Z0-9]{5,20}$/.test(value)) {
          fieldErrors.password =
            "La contraseña debe contener solo letras y números, y tener entre 5 y 20 caracteres";
        }
        break;
      case "confirmPassword":
        if (!value.trim()) {
          fieldErrors.confirmPassword = "Por favor confirma tu contraseña";
        } else if (userData.password !== value) {
          fieldErrors.confirmPassword = "Las contraseñas no coinciden";
        }
        break;
      default:
        break;
    }

    return fieldErrors;
  };

  const handleLoginLinkClick = () => {
    setView("login");
  };

  useEffect(() => {
    if (Register) {
      alert("Bienvenido " + Register.username + " ahora puedes continuar");
      setView("login");
    }
  }, [Register, setView]);

  return (
    <div className="login-container flex justify-center items-center h-screen">
      <div className="login-body bg-white rounded-lg shadow-lg overflow-hidden w-96">
        <img
          src={imagen}
          alt="Logo Fast Food"
          className="login-image mx-auto mt-4 h-30"
        />
        <div className="login-content p-6">
          <form className="formRegister" onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-4">
              Registrarse
            </h2>
            <div className="input-group relative my-4 mb-0 border border-gray-500 rounded px-4 py-2 rounded-xl">
              <RiUserLine className="input-icon absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                maxLength={45}
                title="Solo se admiten 45 caracteres"
                onChange={handleChange}
                placeholder="Nombre de usuario"
                className="form-input pl-7 pr-10 w-full"
              />
            </div>
            {errors.username && (
              <span className="text-red-500 text-sm">{errors.username}</span>
            )}

            <div className="input-group relative my-4 mb-0 border border-gray-500 rounded px-4 py-2 rounded-xl">
              <RiUserLine className="input-icon absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                maxLength={60}
                title="Solo se admiten 60 caracteres"
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="form-input pl-7 pr-10 w-full"
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}

            <div className="input-group relative my-4 mb-0 border border-gray-500 rounded px-4 py-2 rounded-xl">
              <RiLockPasswordLine className="input-icon absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={keyVisible ? "text" : "password"}
                id="password"
                name="password"
                value={userData.password}
                maxLength={15}
                onChange={handleChange}
                placeholder="Contraseña"
                className="form-input pl-7 pr-10 w-full"
              />
              <div
                className="password-toggle cursor-pointer absolute right-5 top-1/2 transform -translate-y-1/2"
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
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}

            <div className="input-group relative my-4 mb-0 border border-gray-500 rounded px-4 py-2 rounded-xl">
              <RiLockPasswordLine className="input-icon absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={confirmKeyVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={userData.confirmPassword}
                maxLength={15}
                onChange={handleChange}
                placeholder="Confirmar Contraseña"
                className="form-input pl-7 pr-10 w-full"
              />
              <div
                className="password-toggle cursor-pointer absolute right-5 top-1/2 transform -translate-y-1/2"
                onClick={toggleConfirmVisibility}
              >
                {confirmKeyVisible ? (
                  <RiEyeCloseLine className="input-icon text-gray-400" />
                ) : (
                  <RiEyeLine className="input-icon text-gray-400" />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
            <div className="button-wrapper mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-400 text-white rounded-xl hover:bg-green-500 transition-colors duration-300"
              >
                Registrarse
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <button
              className="text-blue-500 underline"
              onClick={handleLoginLinkClick}
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;
