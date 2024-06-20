import "./createMenu.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateMenu, CreateMenuItems, getAllMenus, CreateCategory, getAllCategories } from "../../Redux/actions";

function CreateMenuForm() {
    const dispatch = useDispatch();
    const [menuName, setMenuName] = useState({ itemMenu: "", menuname: "" });
    const [menuItemName, setMenuItemName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const allMenuss = useSelector((store) => store.allMenus || []);
    const [menuSuccessMessage, setMenuSuccessMessage] = useState("");
    const [itemSuccessMessage, setItemSuccessMessage] = useState("");
    const [menuErrorMessage, setMenuErrorMessage] = useState("");
    const [itemErrorMessage, setItemErrorMessage] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categorySuccessMessage, setCategorySuccessMessage] = useState("");
    const [categoryErrorMessage, setCategoryErrorMessage] = useState("");
    const allCategories = useSelector((store) => store.allCategories || []);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");




    const handleSubmit = (event) => {
        event.preventDefault();
        if (menuName.menuname.trim() === "") {
            setMenuErrorMessage("Debe ingresar un nombre válido para el menú.");
        } else {
            dispatch(CreateMenu({ name: menuName.menuname, restaurant_id: 2 }));
            setMenuSuccessMessage("Menú creado con éxito");
        }
    };

    const handleMenuItem = (event) => {
        event.preventDefault();
        if (
            menuItemName.trim() === "" ||
            description.trim() === "" ||
            price.trim() === ""
        ) {
            setItemErrorMessage("Todos los campos deben ser llenados");
        } else {
            const formData = new FormData();
            formData.append('menu_id', menuName.itemMenu);
            formData.append('category_id', selectedCategoryId);
            formData.append('name', menuItemName);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('image_url', imageFile);
            formData.append('restaurant_id', 2);

            // Para verificar que el FormData contiene los datos correctos
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            dispatch(CreateMenuItems(formData));
            setItemSuccessMessage("Ítem del menú creado con éxito");
        }
    };

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllMenus());
    }, [dispatch]);
    

    const handleMenuChange = (event) => {
        setMenuName({ ...menuName, itemMenu: event.target.value });
    };


    return (
        <div className="createmenu">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Create Menu</h1>
                <label htmlFor="menuName">Nombre del menú:</label>
                <input
                    type="text"
                    name="name"
                    value={menuName.menuname}
                    onChange={(event) => setMenuName({ ...menuName, menuname: event.target.value })}
                    maxLength={24}
                />
                <button type="submit">Create Menu</button>
                {menuSuccessMessage && <p className="success-message">{menuSuccessMessage}</p>}
                {menuErrorMessage && <p className="error-message">{menuErrorMessage}</p>}
            </form>            
            <div className="footpage"></div>
        </div>
    );
}

export default CreateMenuForm;