import { useState, useEffect } from "react";
import axios from "axios";
import "./detailCompany.css";

function DetailCompany({ restaurant }) {

    console.log ("este es el res detail",restaurant)
  const [name, setName] = useState(restaurant?.name || "");
  const [description, setDescription] = useState(restaurant?.description || "");
  const [email, setEmail] = useState(restaurant?.email || "");
  const [phone, setPhone] = useState(restaurant?.phone || "");
  const [address, setAddress] = useState(restaurant?.address || "");
  const [password, setPassword] = useState(restaurant?.password || "");
  const [Image, setImage] = useState(restaurant?.image_url || "");
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    setName(restaurant?.name || "");
    setDescription(restaurant?.description || "");
    setEmail(restaurant?.email || "");
    setPhone(restaurant?.phone || "");
    setAddress(restaurant?.address || "");
    setImage(restaurant?.image_url || "");
    setPassword("");
    setShowPassword(false);
  }, [restaurant]);

  const updateField = async (field, value) => {
    try {
      const updatedRestaurant = {
        ...restaurant,
        [field]: value,
      };


      const response = await axios.put(`http://localhost:5000/restaurants/${restaurant.id}`, updatedRestaurant);
      if (response.status === 200) {
        console.log("Actualización exitosa");
        setName(updatedRestaurant.name);
        setDescription(updatedRestaurant.description);
        setEmail(updatedRestaurant.email);
        setPhone(updatedRestaurant.phone);
        setAddress(updatedRestaurant.address);
        setImage(updatedRestaurant.image_url);
        
        setPassword("");
        setShowPassword(false);
      } else {
        console.error("Error al actualizar el restaurante: ", response.status);
      }
    } catch (error) {
      console.error("Error al actualizar el restaurante", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setName(restaurant?.name || "");
    setDescription(restaurant?.description || "");
    setEmail(restaurant?.email || "");
    setPhone(restaurant?.phone || "");
    setAddress(restaurant?.address || "");
    setImage(restaurant?.image_url || "");
    setPassword("");
    setShowPassword(false);
  }, [restaurant]);

  return (
    <div>
      <div className="infoCompanyContainer">
        <div className="labelContainer">
          <h3>Nombre:</h3>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={() => updateField("name", name)}>Actualizar nombre</button>
        </div>
        <div className="labelContainer">
          <h3>Descripcion:</h3>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={() => updateField("description", description)}>Actualizar descripcion</button>
        </div>
        <div className="labelContainer">
          <h3>Email:</h3>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => updateField("email", email)}>Actualizar email</button>
        </div>
        <div className="labelContainer">
          <h3>Telefono:</h3>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button onClick={() => updateField("phone", phone)}>Actualizar telefono</button>
        </div>
        <div className="labelContainer">
          <h3>Direccion:</h3>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <button onClick={() => updateField("address", address)}>Actualizar direccion</button>
        </div>
        <div className="labelContainer">
          <h3>Contraseña:</h3>
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}>
          </input>
          <button onClick={togglePasswordVisibility}>
            {showPassword ? "👁️" : "👁️"}
          </button>
          <button onClick={() => updateField("password", password)}>Actualizar Contraseña</button>
        </div>
        <div className="labelContainerimg">
          <h3>Imagen de Perfil:</h3>
          <img src={Image} alt="Imagen de Perfil" />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleImageChange}>Subir Imagen</button>
        </div>
      </div>
    </div>
  );
}

export default DetailCompany;