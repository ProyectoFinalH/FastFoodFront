import "./createMenu.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllMenus, CreateCategory, getAllCategories } from "../../Redux/actions";

function CreateCategories() {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState("");
    const [categorySuccessMessage, setCategorySuccessMessage] = useState("");
    const [categoryErrorMessage, setCategoryErrorMessage] = useState("");




    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (menuName.menuname.trim() === "") {
    //         setMenuErrorMessage("Debe ingresar un nombre válido para el menú.");
    //     } else {
    //         dispatch(CreateMenu({ name: menuName.menuname, restaurant_id: 2 }));
    //         setMenuSuccessMessage("Menú creado con éxito");
    //     }
    // };

    // const handleMenuItem = (event) => {
    //     event.preventDefault();
        // if (
        //     menuItemName.trim() === "" ||
        //     description.trim() === "" ||
        //     price.trim() === ""
        // ) {
        //     setItemErrorMessage("Todos los campos deben ser llenados");
        // } else {
        //     const formData = new FormData();
        //     formData.append('menu_id', menuName.itemMenu);
        //     formData.append('category_id', selectedCategoryId);
        //     formData.append('name', menuItemName);
        //     formData.append('description', description);
        //     formData.append('price', price);
        //     formData.append('image_url', imageFile);
        //     formData.append('restaurant_id', 2);

        //     // Para verificar que el FormData contiene los datos correctos
        //     for (let [key, value] of formData.entries()) {
        //         console.log(`${key}: ${value}`);
        //     }
        //     dispatch(CreateMenuItems(formData));
    //         setItemSuccessMessage("Ítem del menú creado con éxito");
    //     }
    // };

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllMenus());
    }, [dispatch]);
    

    // const handleMenuChange = (event) => {
    //     setMenuName({ ...menuName, itemMenu: event.target.value });
    // };

    // const handleImageChange = (event) => {
    //     setImageFile(event.target.files[0]);
    // };

    const handleCategorySubmit = (event) => {
        event.preventDefault();
        if (categoryName.trim() === "") {
            setCategoryErrorMessage("Debe ingresar un nombre válido.");
        } else {
            dispatch(CreateCategory({ name: categoryName, restaurant_id: 2 }))
                .then(() => {
                    setCategorySuccessMessage("Categoría creada con éxito.");
                    setCategoryErrorMessage("");
                })
                .catch((error) => {
                    if (error.response && error.response.data === "Duplicate category") {
                        setCategoryErrorMessage("Categoría duplicada.");
                    } else {
                        setCategoryErrorMessage("Error al crear, categoría dupicada.");
                    }
                    setCategorySuccessMessage("");
                });
        }
    };
    // const handleCategoryChange = (event) => {
    //     setSelectedCategoryId(event.target.value);
    // };

    return (
        <div className="createmenu">
            <form className="form" onSubmit={handleCategorySubmit}>
                <h1>Create Category</h1>
                <label htmlFor="categoryName">Nombre de la categoría:</label>
                <input
                    type="text"
                    id="categoryName"
                    name="name"
                    value={categoryName}
                    onChange={(event) => setCategoryName(event.target.value)}
                />
                <button type="submit">Create Category</button>
                {categorySuccessMessage && <p className="success-message">{categorySuccessMessage}</p>}
                {categoryErrorMessage && <p className="error-message">{categoryErrorMessage}</p>}
            </form>
            <div className="footpage"></div>
        </div>
    );
}

export default CreateCategories;