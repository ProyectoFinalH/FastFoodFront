import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import "./account.css";
import Notification from "../../Components/Notification/Notification";
import { updateUser } from "../../Redux/actions";

function Account() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { username, email, password } = userData;
    if (!user || !user.id || !username || !email || !password) {
      alert(
        "Por favor, completa todos los campos y asegúrate de que estás logueado correctamente."
      );
      return;
    }

    try {
      dispatch(updateUser(user.id, userData));
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      alert(
        "Error al actualizar datos: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="account-container">
        <div className="account-sidebar">
          <div className="profile-header">
            <h2>
              {user?.firstName && user.firstName.length > 15
                ? user.firstName.substring(0, 15) + "..."
                : user?.firstName}
            </h2>
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
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-group-container">
            <div className="input-group1">
              <label>Nombre de usuario</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-group-container">
            <div className="input-group1">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
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
