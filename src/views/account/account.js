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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false); // Estado para controlar la visualización de la notificación

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

  const handleSubmit = () => {
    if (!firstName || !lastName || !gender || !birthDate) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const updatedUserData = {
      firstName,
      lastName,
      gender,
      birthDate,
      profileImage,
      username,
      password,
    };

    dispatch(updateUser(updatedUserData));
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    setShowSuccessNotification(true);

    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 2000);
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
            <h2>{user?.firstName}</h2>
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
              <input type="email" value={user?.email} disabled />
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
