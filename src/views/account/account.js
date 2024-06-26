// src/Pages/Account/Account.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import "./account.css";
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
import { validarUsername, validarPassword } from "./Components/validacionAccount";

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

  const handleNotificationsClick = () => {
    setShowAccountSettings(false);
    setShowNotifications(true);
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
      <div className="account-container">
        <div className="account-sidebar">
          <div className="profile-header">
            <p className="welcome-message">Bienvenido {username}</p>
            <label htmlFor="profile-image" className="profile-image-container">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Perfil"
                  className="profile-image"
                />
              ) : user && user.image_url ? (
                <img
                  src={user.image_url}
                  alt="Perfil"
                  className="profile-image"
                />
              ) : (
                <div className="no-image">No hay imagen</div>
              )}
              <input
                type="file"
                name="image_url"
                id="profile-image"
                onChange={handleImageChange}
                accept=".jpg,.png"
                style={{ display: "none" }}
              />
            </label>
            <label htmlFor="profile-image" className="change-image-label">
              Cambiar Imagen
            </label>
          </div>
          <nav className="menu">
            <ul>
              <li>
                <Link to="#" onClick={handleAccountSettingsClick}>
                  Ajustes de cuenta
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleNotificationsClick}>
                  Centro de notificaciones
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleOrdersClick}>
                  Últimas órdenes
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="account-info">
          {showAccountSettings && (
            <>
              <h2>Información de tu cuenta</h2>
              <div className="input-group-container">
                <div className="input-group1">
                  <label>Correo Electrónico</label>
                  <input type="email" value={email} readOnly />
                </div>
              </div>
              <div className="input-group-container">
                <div className="input-group1">
                  <label>Nombre de usuario</label>
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    onBlur={() => setUsernameError(validarUsername(username))}
                  />
                  {usernameError && (
                    <div className="error">{usernameError}</div>
                  )}
                </div>
                <div className="input-group1">
                  <label className="checkbox-label">
                    <span>Cambiar Contraseña</span>
                    <input
                      type="checkbox"
                      checked={changePassword}
                      onChange={() => setChangePassword(!changePassword)}
                    />
                  </label>
                  {changePassword && (
                    <>
                      <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={() =>
                          setPasswordError(validarPassword(password))
                        }
                      />
                      {passwordError && (
                        <div className="error">{passwordError}</div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="button-group">
                <button onClick={handleSubmit} className="update-button">
                  Actualizar datos
                </button>
                {showSuccessNotification && (
                  <Notification message="Datos actualizados correctamente" />
                )}
                <Link to="/" className="home-button">
                  Volver al inicio
                </Link>
              </div>
            </>
          )}
          {showNotifications && <NotificationCenter />}
          {showOrders && <OrderUsers />}
        </div>
      </div>
    </div>
  );
}

export default Account;
