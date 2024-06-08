import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import "./account.css";
import { updateUser } from "../../Redux/actions";

function Account() {
  const user = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setGender(user.gender || "");
      setBirthDate(user.birthDate || "");
      setProfileImage(user.profileImage || "");
    }
  }, [user]);

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
    if (!firstName || !lastName || !gender || !birthDate) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      gender,
      birthDate,
      profileImage,
    };

    dispatch(updateUser(updatedUser));

    try {
      const response = await fetch("/notify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      if (response.ok) {
        alert(
          "Datos actualizados correctamente. Se ha enviado un correo electrónico de notificación."
        );
      } else {
        throw new Error(
          "Error al enviar el correo electrónico de notificación"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Datos actualizados correctamente, pero hubo un error al enviar el correo electrónico de notificación."
      );
    }
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
