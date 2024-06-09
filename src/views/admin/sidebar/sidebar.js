import { useState } from 'react';
import logo from '../../../images/logo.png'

import LoginPrincipal from '../../../Components/Login/Login_Principal/Login_Principal';
import RestaurantsAdmin from '../restaurantsAdmin/restaurantsAdmin';
import MenusAdmin from '../menusAdmin/menusAdmin';
import UsersAdmin from '../usersAdmin/usersAdmin';
import MenuItemsAdmin from '../menuItemsAdmin/menuItemsAdmin';

function Sidebar({allRestaurants, allMenuItems, allMenus}) {
  const [selectedOption, setSelectedOption] = useState(1);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };




  return (
    <div className="sidebarContainer">
      
      <div className='OptionContainer'>
      <ul>
      <div className="cardRestConainerSidebar">
        
        <img src={logo} alt="imglogRes"/>
        
        <div className="cardRestConainerSidebarh2">
        <h2>ADMINISTRADOR</h2>
          </div>  
      </div>
        <li onClick={() => handleOptionClick(1)}>Restaurantes</li>
        <li onClick={() => handleOptionClick(2)}>Menues</li>
        <li onClick={() => handleOptionClick(3)}>Poductos</li>
        <li onClick={() => handleOptionClick(4)}>Usuarios</li>
        <li onClick={() => handleOptionClick(5)}>Caificaciones</li>
        <li onClick={() => handleOptionClick(6)}>Cerrar Sesion</li>
      </ul>

      </div>
       <div className="content">
        {selectedOption === 1 && <RestaurantsAdmin allRestaurants={allRestaurants}/>}
        {selectedOption === 2 && <MenusAdmin allMenus={allMenus} />}
        {selectedOption === 3 && <MenuItemsAdmin allMenuItems={allMenuItems} />}
        {selectedOption === 4 && <UsersAdmin />}
        {selectedOption === 6 && <LoginPrincipal />}
      </div> 
    </div>
  );
}

export default Sidebar;