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
            {/* <form className="form" onSubmit={handleSubmit}>
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
            </form> */}
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

            {/* <div className="menuitemcontainer">
                <h1>Create Item Menu</h1>
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
                    onChange={handleImageChange}
                    id="imageUrl"
                />
                <button onClick={handleMenuItem}>Create Item</button>
                {itemSuccessMessage && <p className="success-message">{itemSuccessMessage}</p>}
                {itemErrorMessage && <p className="error-message">{itemErrorMessage}</p>}
            </div> */}
            <div className="footpage"></div>
        </div>
    );
}

export default CreateCategories;