import { useState } from "react";
import logo from "../../../images/logo.png";
import "./sidebarAdmin.css";

import RestaurantsAdmin from "../restaurantsAdmin/restaurantsAdmin";
import MenusAdmin from "../menusAdmin/menusAdmin";
import UsersAdmin from "../usersAdmin/usersAdmin";

import OrdersAdmin from "../ordenesAdmin/ordenesAdmin";

function Sidebar() {
  const [selectedOption, setSelectedOption] = useState(1);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="sidebarContainerAdmin">
      <div className="OptionContainerAdmin">
        <ul>
          <div className="cardRestConainerSidebarAdmin">
            <img src={logo} alt="imglogResAdmin" />
            <h2>FastFood</h2>
          </div>
          <li
            className={selectedOption === 1 ? "selected" : ""}
            tabIndex="0"
            onClick={() => handleOptionClick(1)}
          >
            Restaurantes
          </li>
          <li
            className={selectedOption === 2 ? "selected" : ""}
            tabIndex="0"
            onClick={() => handleOptionClick(2)}
          >
            Menues
          </li>
          <li
            className={selectedOption === 4 ? "selected" : ""}
            tabIndex="0"
            onClick={() => handleOptionClick(4)}
          >
            Usuarios
          </li>
          <li
            className={selectedOption === 7 ? "selected" : ""}
            tabIndex="0"
            onClick={() => handleOptionClick(7)}
          >
            Ordenes
          </li>
          <li
            className={selectedOption === 5 ? "selected" : ""}
            tabIndex="0"
            onClick={() => handleOptionClick(5)}
          >
            Calificaciones
          </li>
        </ul>
      </div>

      <div className="OptionContentAdmin">
        {selectedOption === 1 && <RestaurantsAdmin />}
        {selectedOption === 2 && <MenusAdmin />}
        {selectedOption === 4 && <UsersAdmin />}
        {selectedOption === 7 && <OrdersAdmin />}
      </div>
    </div>
  );
}

export default Sidebar;
