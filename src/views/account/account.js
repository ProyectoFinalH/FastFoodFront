import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import "./account.css";
import { updateUser, Listado_Orders_Usuario, login_user_localstorag } from "../../Redux/actions";


import Notification from "../../Components/Notification/Notification";

import OrderUsers from "../Orders_User/Order_User";




import {
  obtenerEstatusUsuario,
  obtenerCorreoUsuario,
  obtenerNombreUsuario,
  obtenerIdUsuario,

  
} from "../../Components/Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";



function Account() {
  const user = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [orders, setOrders] = useState(false)

  const defaultAvatarUrl =
    "https://png.pngtree.com/png-vector/20190805/ourlarge/pngtree-account-avatar-user-abstract-circle-background-flat-color-icon-png-image_1650938.jpg";

  

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);

    setAvatar(imageURL);
  };

  const handleSubmit = async () => {
    if (!email || !username || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      let imageUrl = avatar;
      if (avatar && typeof avatar !== "string") {
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
        imageUrl = data.secure_url;
      }

      const userData = {
        id: user.id,
        email,
        username,
        password,
        image_url: imageUrl,
      };

      dispatch(updateUser(user.id, userData));
      setShowSuccessNotification(true);
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      alert("Error al cargar la imagen. Por favor, intenta nuevamente.");
      setShowSuccessNotification(false);
    }
  };


  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");
      setAvatar(user.image_url || defaultAvatarUrl);
     
    }
  }, [user]);

//!DEsarrollado para las ordes 
const handleOrders = async (data) => {

  if(data==="order"){
  
    setOrders(!orders)
  }
}

useEffect(() => {
  const email = obtenerCorreoUsuario();
  if (email) {
    const tem_Users = {
      state: obtenerEstatusUsuario(),
      id: obtenerIdUsuario(),
      email: email,
      name: obtenerNombreUsuario(),
    };

    // Verifica los valores de tem_Users antes de enviar las solicitudes
    console.log('tem_Users:', tem_Users);

    dispatch(login_user_localstorag(tem_Users))
      .then(() => {
        if (tem_Users.id) {
          return dispatch(Listado_Orders_Usuario(tem_Users.id));
        } else {
          console.error('ID de usuario no válido:', tem_Users.id);
          return Promise.reject('ID de usuario no válido');
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud de login o listado de órdenes:', error);
      });
  } else {
    console.log('No se encontró el correo del usuario');
  }
}, [dispatch]);






//! hasta aqui 






  return (
    <div>
      <Navbar />
      <div className="account-container">
        <div className="account-sidebar">
          <div className="profile-header">
            <label htmlFor="avatarInput">
              <img src={avatar} alt="Avatar" />
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
              <Link to="#"> <div onClick={()=>{handleOrders("order")}}>Últimas órdenes</div></Link>
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
      {
        orders
        ?<OrderUsers/>
        :null
      }
      
    </div>
  );
}

export default Account;
