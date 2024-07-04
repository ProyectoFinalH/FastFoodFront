import { useState } from "react";
import logo from "../../../images/logo.png";
import "./sidebarAdmin.css";

import RestaurantsAdmin from "../restaurantsAdmin/restaurantsAdmin";
import MenusAdmin from "../menusAdmin/menusAdmin";
import UsersAdmin from "../usersAdmin/usersAdmin";

import OrdersAdmin from "../ordenesAdmin/ordenesAdmin";
import RatingAdmin from "../ratingAdmin/ratingAdmin";
import { logoutAdmin } from "../../../Redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [selectedOption, setSelectedOption] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Cerrar el sidebar después de seleccionar una opción en dispositivos móviles
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  // };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAdmin())//token a null
    window.localStorage.removeItem('loggedFastFoodAdmin');//localstorage de token a null
    navigate('/loginAdmin');
  }


  return (
    <div className={`sidebarContainerAdmin ${sidebarOpen ? "open" : ""}`}>
      <button className="toggleSidebarButton" onClick={toggleSidebar}>
          ☰
        </button>
      <div className="OptionContainerAdmin">
          <div className="cardRestConainerSidebarAdmin">
            <img src={logo} alt="imglogResAdmin" />
            
          </div>
        <ul>
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
            Menús
          </li>
          <li
            className={selectedOption === 3 ? "selected" : ""}
            tabIndex="0"
            onClick={() => handleOptionClick(3)}
          >
            Usuarios
          </li>
          <li
            className={selectedOption === 7 ? "selected" : ""}
            tabIndex="0"
            onClick={() => handleOptionClick(4)}
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
          <li
            className={selectedOption === 6 ? "selected" : ""}
            tabIndex="0"
            onClick={() => handleLogout()} 
          >
            Cerrar Sesion
          </li>
        </ul>
      </div>

      <div className="OptionContentAdmin">
        {selectedOption === 1 && <RestaurantsAdmin />}
        {selectedOption === 2 && <MenusAdmin />}
        {selectedOption === 3 && <UsersAdmin />}
        {selectedOption === 4 && <OrdersAdmin />}
        {selectedOption === 5 && <RatingAdmin />}
      </div>
    </div>
  );
}

export default Sidebar;
