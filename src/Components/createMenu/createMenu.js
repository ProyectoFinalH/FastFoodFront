import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {CreateMenu} from "../../Redux/actions"

function CreateMenuForm() {
    const dispatch = useDispatch();
  const [menuName, setMenuName] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateMenu({ name: menuName }));
    // Aquí puedes enviar el nombre del menú a la ruta http://localhost:5000/menus/create
    console.log("Nombre del menú:", menuName);
    // Lógica para enviar los datos al servidor (por ejemplo, usando fetch o axios)
  };

  return (
    <div>
      <h1>Create Menu</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="menuName">Menu Name:</label>
        <input
        type="text"
        name="name"
        value={menuName}
        onChange={(e) => setMenuName(e.target.value)}
        placeholder="Enter menu name"
      />
        <button type="submit">Create Menu</button>
      </form>
    </div>
  );
}

export default CreateMenuForm;