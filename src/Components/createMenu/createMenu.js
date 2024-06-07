import "./createMenu.css"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {CreateMenu, CreateMenuItems, getAllMenus} from "../../Redux/actions"
import NavBar from "../navbar/navbar"
import { Link } from 'react-router-dom';

function CreateMenuForm() {
    const dispatch = useDispatch();
  const [menuName, setMenuName] = useState({itemMenu:"",menuname:""});
  const [menuItemName, setMenuItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const allMenuss = useSelector((store) => store.allMenus || []);
  const [menuSuccessMessage, setMenuSuccessMessage] = useState("");
  const [itemSuccessMessage, setItemSuccessMessage] = useState("");
  const [menuErrorMessage, setMenuErrorMessage] = useState("");
  const [itemErrorMessage, setItemErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (menuName.menuname.trim() === "") {      
      setMenuErrorMessage("Debe ingresar un nombre válido para el menú.");
    } else {
      dispatch(CreateMenu({ name: menuName.menuname }));
      setMenuSuccessMessage("Menú creado con éxito");
    }
    
    
    console.log("Nombre del menú:", menuName.menuname);    
};

const handleMenuItem = () =>{
  if (
    menuItemName.trim() === "" ||
    description.trim() === "" ||
    price.trim() === "" 
    // imageUrl.trim() === ""
  ) {
    setItemErrorMessage("Todos los campos deben ser llenados");
  } else {
    const data = {
      menu_id: menuName.itemMenu,
      category_id: null,
      name: menuItemName,
      description,
      price,
      image_url: imageUrl,
    };
        dispatch(CreateMenuItems(data));
        setItemSuccessMessage("Ítem del menú creado con éxito");
      }
    };
    useEffect(() => {        
      dispatch(getAllMenus());    
  }, [dispatch]);

    const handleMenuChange = (event) => {
        setMenuName({itemMenu: event.target.value});
      };
  
  return (
      <div className="createmenu">
        <NavBar />
        <div className="buttonBack">
          <Link to="/company">
        <button>⬅ Volver</button>
          </Link>
      </div>
      <form className="form" onSubmit={handleSubmit}>
      <h1>Create Menu</h1>
        <label htmlFor="menuName">Nombre del menu:</label>
        <input
          type="text"
          name="name"
          value={menuName.menuname}
          onChange={(event) => setMenuName({menuname: event.target.value})}
          maxLength={24}
          />
        <button type="submit">Create Menu</button>
          {menuSuccessMessage && <p className="success-message">{menuSuccessMessage}</p>}
          {menuErrorMessage && <p className="error-message">{menuErrorMessage}</p>}
          </form>
        

        <div className="menuitemcontainer">
      <h1>Create Item Menu</h1>
        <label htmlFor="menuItemName">Nombre del menu:</label> 
        <select
          onChange={handleMenuChange}
          
          >
          <option value="">Seleccionar Menú</option>
          {allMenuss.map((element) => (
              <option key={element.id} value={element.id}> 
              {element.name}
            </option>
          ))}
        </select>
        <label htmlFor="menuItemName">MenuItem Name:</label> 
        <input
          type="text"
          id="menuItemName"
          name="menuItemName"
          value={menuItemName}
          onChange={(event) => setMenuItemName(event.target.value)}
          />
      <label htmlFor="description">Description:</label>
        <input
        className="description"
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          />
        <label htmlFor="imageUrl">Image URL:</label>

        <input
          type="file"
          name="image_url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          id="imageUrl"
          />

          <button onClick={handleMenuItem}>Create Item</button>
          {itemSuccessMessage && <p className="success-message">{itemSuccessMessage}</p>}
          {itemErrorMessage && <p className="error-message">{itemErrorMessage}</p>}
        </div>
          <div className="footpage"></div>        
    </div>
  );
}

export default CreateMenuForm;