import { useState } from 'react';
import InfoCompany from '../infoCompany/infoCompany';
import ProductsCompany from '../productsCompany/productsCompany';
import OrderCompany from '../orderCompany/orderCompany';
import "./sidebar.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRestaurants } from "../../../Redux/actions";

import LoginPrincipal from '../../../Components/Login/Login_Principal/Login_Principal';

function Sidebar() {
  const [selectedOption, setSelectedOption] = useState(1);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };


  const allRestaurants = useSelector((state) => state.allRestaurants)

  const dispatch = useDispatch();

  console.log("todos los res", allRestaurants);


  useEffect(()=>{
    dispatch(getAllRestaurants())
  },[dispatch])


  const restaurant = allRestaurants && allRestaurants.length > 0 ? allRestaurants[0] : null;

  return (
    <div className="sidebarContainer">
      
      <div className='OptionContainer'>
      <ul>
      <div className="cardRestConainerSidebar">
        <img src={restaurant?.image_url} alt="imglogRes"/>
        <h2>{restaurant?.name}</h2>
      </div>
        <li onClick={() => handleOptionClick(1)}>Editar Perfil</li>
        <li onClick={() => handleOptionClick(2)}>Menues</li>
        <li onClick={() => handleOptionClick(3)}>Ordenes Realizadas</li>
        <li onClick={() => handleOptionClick(4)}>Caificaciones</li>
        <li onClick={() => handleOptionClick(5)}>Cerrar Sesion</li>
      </ul>

      </div>
      <div className="content">
        {selectedOption === 1 && <InfoCompany allRestaurants={allRestaurants}/>}
        {selectedOption === 2 && <ProductsCompany />}
        {selectedOption === 3 && <OrderCompany />}
        {selectedOption === 5 && <LoginPrincipal />}
      </div>
    </div>
  );
}

export default Sidebar;