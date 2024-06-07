import { useState } from 'react';
import InfoCompany from '../infoCompany/infoCompany';
import ProductsCompany from '../productsCompany/productsCompany';
import OrderCompany from '../orderCompany/orderCompany';
import "./sidebar.css"

import LoginPrincipal from '../../../Components/Login/Login_Principal/Login_Principal';

function Sidebar() {
  const [selectedOption, setSelectedOption] = useState(1);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="sidebarContainer">
      <div className='OptionContainer'>
      <ul>
        <li onClick={() => handleOptionClick(1)}>Editar Perfil</li>
        <li onClick={() => handleOptionClick(2)}>Menues</li>
        <li onClick={() => handleOptionClick(3)}>Ordenes Realizadas</li>
        <li onClick={() => handleOptionClick(4)}>Caificaciones</li>
        <li onClick={() => handleOptionClick(5)}>Cerrar Sesion</li>
      </ul>

      </div>
      <div className="content">
        {selectedOption === 1 && <InfoCompany />}
        {selectedOption === 2 && <ProductsCompany />}
        {selectedOption === 3 && <OrderCompany />}
        {selectedOption === 5 && <LoginPrincipal />}
      </div>
    </div>
  );
}

export default Sidebar;