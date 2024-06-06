import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import "./account.css";
import { updateUser } from "../../Redux/actions";

function Account() {
  const user = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [birthDate, setBirthDate] = useState(user?.birthDate || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");

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
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      gender,
      birthDate,
      profileImage,
    };
    dispatch(updateUser(updatedUser));
    alert("Datos actualizados correctamente");
  };

  return (
    <div>
      <Navbar />
      <div className="account-container">
        <h2>Información de tu cuenta</h2>
        <div className="account-info">
          <div className="profile-image-container">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-placeholder">Imagen de perfil</div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="input-group">
            <label>Correo:</label>
            <input type="email" value={user?.email} disabled />
          </div>
          <div className="input-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Apellido:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Género:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Seleccione</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </div>
          <div className="input-group">
            <label>Fecha de nacimiento:</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit} className="update-button">
            Actualizar datos
          </button>
        </div>
        <Link to="/home" className="home-button">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default Account;
