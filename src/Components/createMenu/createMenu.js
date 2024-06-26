import "./createMenu.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateMenu, getAllMenusCompany} from "../../Redux/actions";

function CreateMenuForm() {
    const dispatch = useDispatch();
    const [menuName, setMenuName] = useState({ itemMenu: "", menuname: "" });
    const [menuSuccessMessage, setMenuSuccessMessage] = useState("");
    const [menuErrorMessage, setMenuErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (menuName.menuname.trim() === "") {
            setMenuErrorMessage("Debe ingresar un nombre válido para el menú.");
        } else {
            try {
              await dispatch(CreateMenu({ name: menuName.menuname}));
              setMenuSuccessMessage('Menú creado con éxito');
              setMenuErrorMessage('');
              dispatch(getAllMenusCompany())
            } catch (error) {
              setMenuErrorMessage('El nombre del menú ya está en uso.');
              console.log('Error al crear el menú:', error.message);
            }
          }
    };

    return (
        <div className="createmenu">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Formulario del Menú</h1>
                <label htmlFor="menuName">Nombre del menú:</label>
                <input
                    type="text"
                    name="name"
                    value={menuName.menuname}
                    onChange={(event) => setMenuName({ ...menuName, menuname: event.target.value })}
                    maxLength={24}
                />
                <button type="submit">Crear Menú</button>
                {menuSuccessMessage && <p className="success-message">{menuSuccessMessage}</p>}
                {menuErrorMessage && <p className="error-message">{menuErrorMessage}</p>}
            </form>            
            <div className="footpage"></div>
        </div>
    );
}

export default CreateMenuForm;