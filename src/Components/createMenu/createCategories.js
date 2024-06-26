import "./createMenu.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllMenus, CreateCategory, getAllCategories } from "../../Redux/actions";

function CreateCategories() {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState("");
    const [categorySuccessMessage, setCategorySuccessMessage] = useState("");
    const [categoryErrorMessage, setCategoryErrorMessage] = useState("");

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllMenus());
    }, [dispatch]);

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

    return (
        <div className="createmenu">
            <form className="form" onSubmit={handleCategorySubmit}>
                <h1>Formulario de Categoría</h1>
                <label htmlFor="categoryName">Nombre de la categoría:</label>
                <input
                    type="text"
                    id="categoryName"
                    name="name"
                    value={categoryName}
                    onChange={(event) => setCategoryName(event.target.value)}
                />
                <button type="submit">Crear Categoría</button>
                {categorySuccessMessage && <p className="success-message">{categorySuccessMessage}</p>}
                {categoryErrorMessage && <p className="error-message">{categoryErrorMessage}</p>}
            </form>
            <div className="footpage"></div>
        </div>
    );
}

export default CreateCategories;