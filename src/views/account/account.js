import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import "./account.css";
import {
  updateUser,
  Listado_Orders_Usuario,
  login_user_localstorag,
} from "../../Redux/actions";
import Notification from "../../Components/Notification/Notification";
import NotificationCenter from "./Components/NotificationCenter";
import OrderUsers from "../Orders_User/Order_User";
import {
  obtenerEstatusUsuario,
  obtenerCorreoUsuario,
  obtenerNombreUsuario,
  obtenerIdUsuario,
} from "../../Components/Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";

function Account() {
  const user = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [orders, setOrders] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const defaultAvatarUrl =
    "https://png.pngtree.com/png-vector/20190805/ourlarge/pngtree-account-avatar-user-abstract-circle-background-flat-color-icon-png-image_1650938.jpg";

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setAvatar(data.imageUrl);
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      alert("Error al cargar la imagen. Por favor, intenta nuevamente.");
    }
  };

  const handleSubmit = async () => {
    if (!email || !username) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const userData = {
        id: user.id,
        email,
        username,
        password: changePassword ? password : undefined,
        image_url: avatar || user.image_url,
      };

      dispatch(updateUser(user.id, userData));
      setShowSuccessNotification(true);
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
      const tem_Users = {
        state: obtenerEstatusUsuario(),
        id: obtenerIdUsuario(),
        email: email,
        name: name,
      };

      dispatch(login_user_localstorag(tem_Users))
        .then(() => {
          if (tem_Users.id) {
            return dispatch(Listado_Orders_Usuario(tem_Users.id));
          } else {
            console.error("ID de usuario no válido:", tem_Users.id);
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
      setAvatar(user.image_url || defaultAvatarUrl);
    }
  }, [user]);

  useEffect(() => {
    if (!username) {
      const localUsername = obtenerNombreUsuario();
      if (localUsername) {
        setUsername(localUsername);
      }
    }
  }, [username]);

  return (
    <div>
      <Navbar />
      <div className="account-container">
        <div className="account-sidebar">
          <div className="profile-header">
            <label htmlFor="avatarInput">
              <img src={avatar} alt="Avatar" />
            </label>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <p>Bienvenido {username}</p>
          </div>
          <nav className="menu">
            <ul>
              <li>
                <Link to="#" onClick={() => setShowNotifications(false)}>
                  Ajustes de cuenta
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => setShowNotifications(true)}>
                  Centro de notificaciones
                </Link>
              </li>
              <li>
                <Link to="#">
                  <div onClick={() => setOrders(!orders)}>Últimas órdenes</div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="account-info">
          {showNotifications ? (
            <NotificationCenter />
          ) : (
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
                  <label>Nombre de usuario </label>{" "}
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
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
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
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
        </div>
      </div>
      {orders ? <OrderUsers /> : null}
    </div>
  );
}

export default Account;
