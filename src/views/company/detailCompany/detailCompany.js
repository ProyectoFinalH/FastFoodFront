import { useState, useEffect } from "react";
import "./detailCompany.css";
import { useSelector, useDispatch } from "react-redux";
import { Data_Empresa, Update_Empresa } from "../../../Redux/actions";

function DetailCompany() {
  const restaurant = useSelector((state) => state.Detail_Empresa)
  console.log("este es el res detail", restaurant)
  const [name, setName] = useState(restaurant?.name || "");
  const [description, setDescription] = useState(restaurant?.description || "");
  const [email, setEmail] = useState(restaurant?.email || "");
  const [phone, setPhone] = useState(restaurant?.phone || "");
  const [address, setAddress] = useState(restaurant?.address || "");
  const [password, setPassword] = useState(restaurant?.password || "");
  const [imageFile, setImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  console.log("detalle del restaurante", restaurant)


  useEffect(() => {
    dispatch(Data_Empresa(restaurant.id))
  },[dispatch]);

  useEffect(() => {
    console.log("Actualización exitosa");
    setName(restaurant.name);
    setDescription(restaurant.description);
    setEmail(restaurant.email);
    setPhone(restaurant.phone);
    setAddress(restaurant.address);
    setImageFile(restaurant.image_url);
    setPassword("");
    setShowPassword(false);
    console.log("update useeffect", restaurant)
  }, [restaurant])

  const updateField = async () => {
    try {
      const formData = new FormData();
      formData.append("id", restaurant.id);
      formData.append("email", email);
      formData.append("description", description);
      formData.append("phone", phone);
      formData.append("addres", address);
      formData.append("name", name);
      formData.append("image_url", imageFile);
      dispatch(Update_Empresa(formData));
      setConfirmationMessage("¡Información actualizada correctamente!");
      console.log("id del restaurante", restaurant.id)
      setIsEditMode(false);
    } catch (error) {
      console.error("Error al actualizar el restaurante", error);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
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
    setImageFile(restaurant?.image_url || "");
    setPassword("");
    setShowPassword(false);
  }, [restaurant]);

  return (
    <div>
      <div className="confirmationMessage">{confirmationMessage}</div>
      <div className="infoCompanyContainer">
        <div className="labelContainer">
          <h3>Nombre:</h3>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditMode}/>
        </div>
        <div className="labelContainer">
          <h3>Descripcion:</h3>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} disabled={!isEditMode} />
        </div>
        <div className="labelContainer">
          <h3>Email:</h3>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditMode} />
        </div>
        <div className="labelContainer">
          <h3>Telefono:</h3>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditMode} />
        </div>
        <div className="labelContainer">
          <h3>Direccion:</h3>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} disabled={!isEditMode}/>
        </div>
        <div className="labelContainer">
          <h3>Contraseña:</h3>
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} disabled={!isEditMode} >
          </input>
          <button onClick={togglePasswordVisibility} disabled={!isEditMode}>
            {showPassword ? "👁️" : "👁️"}
          </button>
        </div>
        <div className="labelContainerimg">
          <h3>Imagen de Perfil:</h3>
          <img src={imageFile} alt="Imagen de Perfil" />
          <label htmlFor="imageUrl" className="customFileButton" >
            Subir Imagen
          </label>
          <input
            type="file"
            name="image_url"
            onChange={handleImageChange}
            id="imageUrl"
            style={{ display: "none" }}
            disabled={!isEditMode}
          />
        </div>
      </div>
      <div className="RGDbutton">
      <button onClick={() => setIsEditMode(true)}>Editar</button>
      {isEditMode ? (
    <>
      <button onClick={updateField}>Guardar</button>
    </>
  ) : null}
      </div>
    </div>
  );
}

export default DetailCompany;