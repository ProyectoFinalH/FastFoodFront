import { useState } from 'react';
import InfoCompany from '../infoCompany/infoCompany';
import ProductsCompany from '../productsCompany/productsCompany';
import OrderCompany from '../orderCompany/orderCompany';
import "./sidebarCompany.css"
import LoginPrincipal from '../../../Components/Login/Login_Principal/Login_Principal';
import MenuesCompany from '../menuesCompany/menuesCompany';

function Sidebar({restaurant}) {

  const [selectedOption, setSelectedOption] = useState(1);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };





  return (
    <div className="sidebarContainer">
      
      <div className='OptionContainer'>
      <ul>
      <div className="cardRestConainerSidebar">
        
        <img src={restaurant?.image_url} alt="imglogRes"/>
        
        <div className="cardRestConainerSidebarh2">
        <h2>{restaurant?.name}</h2>
          </div>  
      </div>
        <li tabindex="0" onClick={() => handleOptionClick(1)}>Menu Items</li>
        <li tabindex="0" onClick={() => handleOptionClick(4)}>Menues</li>
        <li tabindex="0" onClick={() => handleOptionClick(6)}>Categories</li>
        <li tabindex="0" onClick={() => handleOptionClick(2)}>Editar Perfil</li>

        <li tabindex="0" onClick={() => handleOptionClick(3)}>Ordenes Realizadas</li>
        <li tabindex="0" onClick={() => handleOptionClick(4)}>Caificaciones</li>
        <li tabindex="0" onClick={() => handleOptionClick(5)}>Cerrar Sesion</li>
      </ul>

      </div>
      <div className="conent2">

        {selectedOption === 1 && <ProductsCompany />}
        {selectedOption === 4 && <MenuesCompany />}
        {selectedOption === 2 && <InfoCompany restaurant={restaurant}/>}
        {selectedOption === 3 && <OrderCompany />}
        {selectedOption === 5 && <LoginPrincipal />}
      </div>
    </div>
  );
}

export default Sidebar;