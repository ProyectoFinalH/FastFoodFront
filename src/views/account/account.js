import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import "./account.css";
import Notification from "../../Components/Notification/Notification";
import axios from 'axios';

function Account() {
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      const parsedUserData = JSON.parse(userDataFromLocalStorage);
      setFirstName(parsedUserData.firstName || "");
      setLastName(parsedUserData.lastName || "");
      setGender(parsedUserData.gender || "");
      setBirthDate(parsedUserData.birthDate || "");
      setProfileImage(parsedUserData.profileImage || "");
      setUsername(parsedUserData.username || "");
      setPassword(parsedUserData.password || "");
      setEmail(parsedUserData.email || ""); 
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!user || !user.id || !username || !email || !password) {
      alert("Por favor, completa todos los campos y asegúrate de que estás logueado correctamente.");
      return;
    }
    
    const updatedUserData = {
      username,
      email,
      password,
    };
    
    try {
      const response = await axios.put(`http://localhost:5000/users/${user.id}`, updatedUserData);
      console.log(response.data);
      setShowSuccessNotification(true);
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      alert("Error al actualizar datos: " + error.response.data.error);
    }
  };

  const getShortenedName = (name, maxLength) => {
    return name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
  };
  
  return (
    <div>
      <Navbar />
      <div className="account-container">
        <div className="account-sidebar">
          <div className="profile-header">
            <div
              className="profile-image-container"
              onClick={() =>
                document.getElementById("profileImageInput").click()
              }
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <div className="profile-placeholder">Imagen de perfil</div>
              )}
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
            <h2>{user?.firstName && getShortenedName(user.firstName, 15)}</h2>
            
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
              <label>Nombre(s)</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-group1">
              <label>Apellido(s)</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group-container">
            <div className="input-group1">
              <label>Correo Electrónico</label>
              <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="input-group1">
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
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
          <div className="input-group-gender">
            <label>Género</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  value="Hombre"
                  checked={gender === "Hombre"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Hombre
              </label>
              <label>
                <input
                  type="radio"
                  value="Mujer"
                  checked={gender === "Mujer"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Mujer
              </label>
            </div>
          </div>
          <div className="button-group">
            <button onClick={handleSubmit} className="update-button">
              Actualizar datos
            </button>
            {showSuccessNotification && <Notification message="Datos actualizados correctamente" />}
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
