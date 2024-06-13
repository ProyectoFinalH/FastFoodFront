import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import "./account.css";
import { updateUser } from "../../Redux/actions";
import Notification from "../../Components/Notification/Notification";

function Account() {
  const user = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");

      const storedAvatarURL = localStorage.getItem("avatarURL");
      if (storedAvatarURL) {
        setAvatar(storedAvatarURL);
      }
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);

    localStorage.setItem("avatarURL", imageURL);
    setAvatar(imageURL);
  };

  const handleSubmit = async () => {
    if (!email || !username || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    try {
      if (avatar) {
        const formData = new FormData();
        formData.append("file", avatar);
        formData.append("upload_preset", "tu_upload_preset_aqui");
  
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dfhkqwfio/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        
        const imageUrl = data.secure_url;
        
        const userData = {
          id: user.id,
          email,
          username,
          password,
          avatar: imageUrl,
        };
        
        dispatch(updateUser(user.id, userData));
        
      } else {
        const userData = {
          id: user.id,
          email,
          username,
          password,
        };
  
        dispatch(updateUser(user.id, userData));
      }
  
      setShowSuccessNotification(true);
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      alert("Error al cargar la imagen. Por favor, intenta nuevamente.");
      setShowSuccessNotification(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="account-container">
        <div className="account-sidebar">
          <div className="profile-header">
            <label htmlFor="avatarInput">
              {avatar ? (
                <img src={avatar} alt="Avatar" />
              ) : (
                <img src={user.avatar} alt="Avatar" />
              )}
            </label>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
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
