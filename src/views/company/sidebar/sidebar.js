import { useState } from 'react';
import DetailCompany from "../detailCompany/detailCompany";
import ProductsCompany from '../productsCompany/productsCompany';
import OrderCompany from '../orderCompany/orderCompany';
import "./sidebarCompany.css"
import LoginPrincipal from '../../../Components/Login/Login_Principal/Login_Principal';
import MenuesCompany from '../menuesCompany/menuesCompany';
import CategoriesCompany from '../categoriesCompany/categoriesCompany';
import CommentsCompany from '../comments/commentsCompany';

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

        <li tabindex="0" onClick={() => handleOptionClick(1)}>Productos</li>
        <li tabindex="0" onClick={() => handleOptionClick(4)}>Menús</li>
        <li tabindex="0" onClick={() => handleOptionClick(6)}>Categorías</li>
        <li tabindex="0" onClick={() => handleOptionClick(2)}>Editar Perfíl</li>

        <li tabindex="0" onClick={() => handleOptionClick(3)}>Órdenes Realizadas</li>
        <li tabindex="0" onClick={() => handleOptionClick(7)}>Comentarios/Caificaciones</li>
        <li tabindex="0" onClick={() => handleOptionClick(5)}>Cerrar Sesión</li>

      </ul>

      </div>
      <div className="conent2">

        {selectedOption === 1 && <ProductsCompany />}
        {selectedOption === 4 && <MenuesCompany />}
        {selectedOption === 2 && <DetailCompany/>}
        {selectedOption === 3 && <OrderCompany />}
        {selectedOption === 5 && <LoginPrincipal />}
        {selectedOption === 6 && <CategoriesCompany />}
        {selectedOption === 7 && <CommentsCompany />}
      </div>
    </div>
  );
}

export default Sidebar;