import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import {
  updateUser,
  Listado_Orders_Usuario,
  login_user_localstorag,
  Data_Usuario,
} from "../../Redux/actions";
import Notification from "../../Components/Notification/Notification";
import NotificationCenter from "./Components/NotificationCenter";
import OrderUsers from "../Orders_User/Order_User";
import {
  obtenerEstatusUsuario,
  obtenerCorreoUsuario,
  obtenerNombreUsuario,
  obtenerIdUsuario,
  guardarNombreUsuario,
} from "../../Components/Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
import {
  validarUsername,
  validarPassword,
} from "./Components/validacionAccount";

function Account() {
  const user = useSelector((state) => state.AllDATAUSER);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError(validarUsername(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validarPassword(value));
  };

  const handleSubmit = async () => {
    if (!email || !username || usernameError || passwordError) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("email", email);
      formData.append("username", username);
      if (imageFile) {
        formData.append("image_url", imageFile);
      }
      if (changePassword) {
        formData.append("password", password);
      }

      dispatch(updateUser(user.id, formData));
      setShowSuccessNotification(true);
      guardarNombreUsuario(username);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Error al actualizar usuario. Por favor, intenta nuevamente.");
      setShowSuccessNotification(false);
    }
  };

  useEffect(() => {
    const email = obtenerCorreoUsuario();
    const name = obtenerNombreUsuario();

    if (email) {
      const tempUser = {
        state: obtenerEstatusUsuario(),
        id: obtenerIdUsuario(),
        email: email,
        username: name,
      };
      dispatch(Data_Usuario(tempUser.id));
      dispatch(login_user_localstorag(tempUser))
        .then(() => {
          dispatch(Data_Usuario(tempUser.id));
          if (tempUser.id) {
            return dispatch(Listado_Orders_Usuario(tempUser.id));
          } else {
            console.error("ID de usuario no válido:", tempUser.id);
            return Promise.reject("ID de usuario no válido");
          }
        })
        .catch((error) => {
          console.error(
            "Error en la solicitud de login o listado de órdenes:",
            error
          );
        });
    } else {
      console.log("No se encontró el correo del usuario");
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log("Usuario desde Redux:", user);
      setEmail(user.email || "");
      setUsername(user.username || "");
    }
  }, [user]);

  const handleAccountSettingsClick = () => {
    setShowAccountSettings(true);
    setShowNotifications(false);
    setShowOrders(false);
  };

  const handleOrdersClick = () => {
    setShowAccountSettings(false);
    setShowNotifications(false);
    setShowOrders(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && /\.(jpg|png)$/.test(file.name)) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Por favor, selecciona una imagen en formato JPG o PNG.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-start p-4 max-w-7xl mx-auto bg-white shadow-md rounded-lg my-10">
        <div className="flex justify-center items-center">
          <div className="w-64 p-4 border-r border-gray-300 flex flex-col items-center">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800 mb-2">
                Bienvenido {username}
              </p>
            </div>
            <div className="text-center mb-4">
              <label
                htmlFor="profile-image"
                className="relative cursor-pointer"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Perfil"
                    className="w-24 h-24 rounded-full object-cover mb-2"
                  />
                ) : user && user.image_url ? (
                  <img
                    src={user.image_url}
                    alt="Perfil"
                    className="w-24 h-24 rounded-full object-cover mb-2"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                    No hay imagen
                  </div>
                )}
                <input
                  type="file"
                  name="image_url"
                  id="profile-image"
                  onChange={handleImageChange}
                  accept=".jpg,.png"
                  className="hidden"
                />
              </label>
            </div>
            <nav className="w-full">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    onClick={handleAccountSettingsClick}
                    className="block text-gray-600 hover:bg-gray-100 py-2 px-4 rounded"
                  >
                    Ajustes de cuenta
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={handleOrdersClick}
                    className="block text-gray-600 hover:bg-gray-100 py-2 px-4 rounded"
                  >
                    Últimas órdenes
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex-1 p-4">
          {showAccountSettings && (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Información de tu cuenta
              </h2>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      onBlur={() => setUsernameError(validarUsername(username))}
                      className={`w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${
                        usernameError ? "border-red-500" : ""
                      }`}
                    />
                    {usernameError && (
                      <div className="text-red-500 text-xs mt-1">
                        {usernameError}
                      </div>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Cambiar Contraseña
                      <input
                        type="checkbox"
                        checked={changePassword}
                        onChange={() => setChangePassword(!changePassword)}
                        className="ml-2"
                      />
                    </label>
                    {changePassword && (
                      <div className="">
                        <input
                          type="password"
                          value={password}
                          onChange={handlePasswordChange}
                          onBlur={() =>
                            setPasswordError(validarPassword(password))
                          }
                          className={`w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 ${
                            passwordError ? "border-red-500" : ""
                          }`}
                        />
                        {passwordError && (
                          <div className="text-red-500 text-xs mt-1">
                            {passwordError}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Guardar Cambios
                </button>
                {showSuccessNotification && (
                  <Notification
                    message="Cambios guardados exitosamente."
                    onClose={() => setShowSuccessNotification(false)}
                  />
                )}
              </div>
            </>
          )}
          {showOrders && <OrderUsers />}
        </div>
      </div>
      {showNotifications && <NotificationCenter />}
    </div>
  );
}

export default Account;
