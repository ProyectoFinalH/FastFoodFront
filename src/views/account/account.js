import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import "./account.css";
import { updateUser } from "../../Redux/actions";
import Notification from "../../Components/Notification/Notification";

function Account() {
  const user = useSelector((state) => state.USER.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!email || !username || !password || !user) {
      alert(
        "Por favor, completa todos los campos y asegúrate de estar logueado."
      );
      return;
    }

    const userData = {
      id: user.id,
      email,
      username,
      password,
    };

    try {
      await dispatch(updateUser(user.id, userData));
      setShowSuccessNotification(true);
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Error al actualizar usuario. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="account-container">
        <div>
          {user ? (
            <p>
              Bienvenido, {user.username} ({user.email})
            </p>
          ) : (
            <p>
              No has iniciado sesión. Por favor, inicia sesión para acceder a
              esta página.
            </p>
          )}
        </div>
        <div className="account-sidebar">
          <div className="profile-header">
            <img src={user ? user.avatar : ""} alt="Avatar" />
            <p>Mi perfil</p>
          </div>
          <nav className="menu">
            <ul>
              <li>
                <Link to="#">Ajustes de cuenta</Link>
              </li>
              <li>
                <Link to="#">Pagos</Link>
              </li>
              <li>
                <Link to="#">Centro de notificaciones</Link>
              </li>
              <li>
                <Link to="#">Últimas órdenes</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="account-info">
          <h2>Información de tu cuenta</h2>
          <div className="input-group-container">
            <div className="input-group1">
              <label>Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group-container">
            <div className="input-group1">
              <label>Nombre de usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group1">
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
        </div>
      </div>
    </div>
  );
}

export default Account;
