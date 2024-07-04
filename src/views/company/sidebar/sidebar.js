import { useState } from "react";

import DetailCompany from "../detailCompany/detailCompany";
import ProductsCompany from "../productsCompany/productsCompany";
import OrderCompany from "../orderCompany/orderCompany";
import "./sidebarCompany.css";
import LoginPrincipal from "../../../Components/Login/Login_Principal/Login_Principal";
import MenuesCompany from "../menuesCompany/menuesCompany";
import CategoriesCompany from "../categoriesCompany/categoriesCompany";
import CommentsCompany from "../comments/commentsCompany";
import logo from "../../../images/logo.png"


function Sidebar({ restaurant }) {
  const [selectedOption, setSelectedOption] = useState(2);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="sidebarContainer">
      <div className="OptionContainer">
      
        <div className="cardRestConainerSidebarAdmin">
          <img src={logo} alt="logo" className="logo" />
        </div>
        
  
          <div className="cardRestConainerSidebar">
            <img src={restaurant?.image_url} alt="imglogRes" />

            <div className="cardRestConainerSidebarh2">
              <h2 title={restaurant?.name}>{restaurant?.name.slice(0,13)}</h2>
            </div>
          </div>
        <ul>

          <li 
          className={selectedOption === 1 ? "selected" : ""}
          tabiIndex="0" onClick={() => handleOptionClick(1)}>
            Productos
          </li>
          <li 
          className={selectedOption === 4 ? "selected" : ""}
          tabiIndex="0" onClick={() => handleOptionClick(4)}>
            Menús
          </li>
          <li 
          className={selectedOption === 6 ? "selected" : ""} 
          tabiIndex="0" onClick={() => handleOptionClick(6)}>
            Categorías
          </li>
          <li 
          className={selectedOption === 2 ? "selected" : ""}
          tabiIndex="0" onClick={() => handleOptionClick(2)}>
            Editar Perfíl
          </li>

          <li 
          className={selectedOption === 3 ? "selected" : ""}
          tabiIndex="0" onClick={() => handleOptionClick(3)}>
            Órdenes Realizadas
          </li>
          <li 
          className={selectedOption === 7 ? "selected" : ""}
          tabiIndex="0" onClick={() => handleOptionClick(7)}>
            Caificaciones
          </li>
          <li 
          className={selectedOption === 5 ? "selected" : ""}
          tabiIndex="0" onClick={() => handleOptionClick(5)}>
            Cerrar Sesión
          </li>
        </ul>
      </div>
      <div className="conent2">
      {selectedOption === 2 && <DetailCompany />}
        {selectedOption === 1 && <ProductsCompany />}
        {selectedOption === 4 && <MenuesCompany />}
        
        {selectedOption === 3 && <OrderCompany />}
        {selectedOption === 5 && <LoginPrincipal />}
        {selectedOption === 6 && <CategoriesCompany />}
        {selectedOption === 7 && <CommentsCompany />}
      </div>
    </div>
  );
}

export default Sidebar;
