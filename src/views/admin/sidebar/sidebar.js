import { useState } from 'react';
import logo from '../../../images/logo.png'

import LoginPrincipal from '../../../Components/Login/Login_Principal/Login_Principal';
import RestaurantsAdmin from '../restaurantsAdmin/restaurantsAdmin';
import MenusAdmin from '../menusAdmin/menusAdmin';
import UsersAdmin from '../usersAdmin/usersAdmin';
import OrdenesAdmin from '../ordenesAdmin/ordenesAdmin';


function Sidebar({allRestaurantsAdmin, allMenuItemsAdmin, allMenusAdmin}) {
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
        <h2>ADMIN</h2>
          </div>  
      </div>
        <li tabIndex="0" onClick={() => handleOptionClick(1)}>Restaurantes</li>
        <li tabIndex="0" onClick={() => handleOptionClick(2)}>Menues</li>
        <li tabIndex="0" onClick={() => handleOptionClick(4)}>Usuarios</li>
        <li tabIndex="0" onClick={() => handleOptionClick(7)}>Ordenes</li>
        <li tabIndex="0" onClick={() => handleOptionClick(5)}>Caificaciones</li>
        <li tabIndex="0" onClick={() => handleOptionClick(6)}>Cerrar Sesion</li>
      </ul>

      </div>
       <div className="content">
        {selectedOption === 1 && <RestaurantsAdmin allRestaurantsAdmin={allRestaurantsAdmin}/>}
        {selectedOption === 2 && <MenusAdmin allMenusAdmin={allMenusAdmin} allMenuItemsAdmin={allMenuItemsAdmin} allRestaurantsAdmin={allRestaurantsAdmin}/> }
        {selectedOption === 4 && <UsersAdmin />}
        {selectedOption === 7 && <OrdenesAdmin/>}
        {selectedOption === 6 && <LoginPrincipal />}
      </div> 
    </div>
  );
}

export default Sidebar;