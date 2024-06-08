/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import "./detailCompany.css";

function DetailCompany({ restaurant }) {
  const [name, setName] = useState(restaurant?.name || "");
  const [description, setDescription] = useState(restaurant?.description || "");
  const [email, setEmail] = useState(restaurant?.email || "");
  const [phone, setPhone] = useState(restaurant?.phone || "");
  const [address, setAddress] = useState(restaurant?.address || "");
  const [password, setPassword] = useState(restaurant?.password || "");
  const [restaurantChange, setRestaurantChange] = useState(restaurant)

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName); // Actualiza el estado 'name'
    setRestaurantChange(prevRestaurant => ({
      ...prevRestaurant,
      name: newName // Actualiza el nombre en el objeto 'restaurant'
    }));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    console.log("setdescriptione", e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log("setemail", e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    console.log("setphone", e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    console.log("setadress", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("setpasword", e.target.value);
  };

  const handleSubmit = async () => {
    const updatedRestaurant = {
      id: restaurantChange.id,
      name,
      description,
      email,
      phone,
      address,
      password,
    };

    console.log("updatedRestaurant",updatedRestaurant);

    try {
      const response = await axios.put(`http://localhost:5000/restaurants/${restaurantChange.id}`, updatedRestaurant);
        console.log("response", response)
      if (response.status === 200) {
        console.log("Actualización exitosa");
      } else {
        console.error("Error al actualizar el restaurante: ", response.status);
      }
    } catch (error) {
      console.error("Error al actualizar el restaurante", error);
    }
  };
  console.log("handleSubmit",handleSubmit);
  

  return (
    <div>
      <div className="infoCompanyContainer">
        <div className="labelContainer">
          <h3>Nombre:</h3>
          <input type="text" value={restaurantChange} onChange={handleNameChange} />
        </div>
        <div className="labelContainer">
          <h3>Descripción:</h3>
          <input type="text" value={description} onChange={handleDescriptionChange} />
        </div>
        <div className="labelContainer">
          <h3>Email:</h3>
          <input type="text" value={email} onChange={handleEmailChange} />
        </div>
        <div className="labelContainer">
          <h3>Teléfono:</h3>
          <input type="text" value={phone} onChange={handlePhoneChange} />
        </div>
        <div className="labelContainer">
          <h3>Dirección:</h3>
          <input type="text" value={address} onChange={handleAddressChange} />
        </div>
        <div className="labelContainer">
          <h3>Contraseña:</h3>
          <input type="text" value={password} onChange={handlePasswordChange} />
        </div>
        <button onClick={handleSubmit}>Actualizar</button>
      </div>
    </div>
  );
}

export default DetailCompany;