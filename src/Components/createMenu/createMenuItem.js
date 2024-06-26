import "./createMenu.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateMenuItems,
  getAllMenusCompany,
  getAllCategoriesCompany,
  getAllMenuitemsCompany,
} from "../../Redux/actions";

function CreateMenuItem() {
  const dispatch = useDispatch();
  const [menuName, setMenuName] = useState({ itemMenu: "", menuname: "" });
  const [menuItemName, setMenuItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const allMenuss = useSelector((store) => store.menusCompany || []);
  const [itemSuccessMessage, setItemSuccessMessage] = useState("");
  const [itemErrorMessage, setItemErrorMessage] = useState("");
  const allCategories = useSelector((store) => store.categoriesCompany || []);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (menuItemName.trim() === '' || description.trim() === '' || price.trim() === '') {
      setItemErrorMessage('Todos los campos deben ser llenados');
    } else {
      try {
        // Verifica si el nombre del ítem ya existe antes de enviar la solicitud
        const isDuplicate = allMenuss.some((menu) => menu.name === menuItemName);
        console.log("ver si esta duplicado el nombre", isDuplicate)
        if (isDuplicate) {
          setItemErrorMessage('El nombre del ítem ya está en uso.');
        } else {
          const formData = new FormData();
          formData.append('menu_id', menuName.itemMenu);
          formData.append('category_id', selectedCategoryId);
          formData.append('name', menuItemName);
          formData.append('description', description);
          formData.append('price', price);
          formData.append('image_url', imageFile);
          // Lógica para enviar el formulario al servidor
          await dispatch(CreateMenuItems(formData));
          setItemSuccessMessage('Ítem del menú creado con éxito');
          setItemErrorMessage(''); // Limpia el mensaje de error
          dispatch(getAllMenuitemsCompany())
        }
      } catch (error) {
        console.log('Error al crear el ítem del menú:', error.message);
        setItemErrorMessage('El nombre del ítem ya está en uso.');
      }
    }
  };

  useEffect(() => {
    dispatch(getAllMenusCompany());
    dispatch(getAllCategoriesCompany());
  }, [dispatch]);

  const handleMenuChange = (event) => {
    setMenuName({ ...menuName, itemMenu: event.target.value });
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  return (
    <div className="createmenu">
      <div className="menuitemcontainer">
        <h1>Formulario del producto</h1>
        <label htmlFor="menuItemName">Nombre del menú:</label>
        <select onChange={handleMenuChange}>
          <option value="">Seleccionar Menú</option>
          {allMenuss.map((element) => (
            <option key={element.id} value={element.id}>
              {element.name}
            </option>
          ))}
        </select>
        <label htmlFor="category">Categoría:</label>
        <select
          id="category"
          value={selectedCategoryId}
          onChange={handleCategoryChange}
        >
          <option value="">Seleccionar Categoría</option>
          {allCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="menuItemName">Nombre del producto:</label>
        <input
          type="text"
          id="menuItemName"
          name="menuItemName"
          value={menuItemName}
          onChange={(event) => setMenuItemName(event.target.value)}
        />
        <label htmlFor="description">Descripción:</label>
        <input
          className="description"
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="imageUrl">Imagen (JPG/PNG):</label>
        <label htmlFor="imageUrl" className="customFileButton2" >Subir Imagen</label>
        <input
          type="file"
          name="image_url"
          onChange={handleImageChange}
          id="imageUrl"          
          style={{ display: "none" }}
        />
        <button onClick={handleSubmit}>Crear Producto</button>
        {itemSuccessMessage && (
          <p className="success-message">{itemSuccessMessage}</p>
        )}
        {itemErrorMessage && (
          <p className="error-message">{itemErrorMessage}</p>
        )}
      </div>
      <div className="footpage"></div>
    </div>
  );
}

export default CreateMenuItem;
