import "./createMenu.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CreateMenu, getAllMenus, getAllCategories } from "../../Redux/actions";

function CreateMenuForm() {
    const dispatch = useDispatch();
    const [menuName, setMenuName] = useState({ itemMenu: "", menuname: "" });
    const [menuSuccessMessage, setMenuSuccessMessage] = useState("");
    const [menuErrorMessage, setMenuErrorMessage] = useState("");




    const handleSubmit = (event) => {
        event.preventDefault();
        if (menuName.menuname.trim() === "") {
            setMenuErrorMessage("Debe ingresar un nombre válido para el menú.");
        } else {
            dispatch(CreateMenu({ name: menuName.menuname, restaurant_id: 2 }));
            setMenuSuccessMessage("Menú creado con éxito");
        }
    };
    

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllMenus());
    }, [dispatch]);
    


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