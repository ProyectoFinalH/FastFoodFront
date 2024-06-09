/* eslint-disable react/prop-types */
import { useState } from "react";
import "./navbarMenu.css";

import lupa from "../../images/lupas.png"



function NavbarMenu({ searchString, setSearchString, handleSubmit, handleSort, handlePriceRange,clearFilter }) {



  const [isOpen1, setIsOpen1] = useState(true);
  // const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen3, setIsOpen3] = useState(true);

  const Options1 = (sortBy) => {
    setIsOpen1(!isOpen1);
    handleSort(sortBy);
  };

  // const Options2 = () => {
  //   setIsOpen2(!isOpen2);
  // };

  const Options3 = () => {
    setIsOpen3(!isOpen3);
  };

  const handleLiClick = (e, sortBy, range) => {
    e.stopPropagation();
    handleSort(sortBy);
    handlePriceRange(range);
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <div className="navbarMenuContainer">
      <form onChange={handleChange}>
        <div className="searchContainer">
          <input placeholder="Buscar producto..." type="search" value={searchString}
            onChange={handleChange}/>
          <button type="submit" onClick={handleSubmit}>
            <img src={lupa} alt="a1" />
          </button>
        </div>
      </form>
      <div className="navbarMenuSelect">
      <button onClick={clearFilter}>Deshacer Filtros</button>
        <div onClick={Options1}>
          <span>Ordenar por: ⮟</span>

          {isOpen1 && (
            <ul>


              <li onClick={(e) => handleLiClick(e, "menorPrecio")}>Menor precio</li>
              <li onClick={(e) => handleLiClick(e, "mayorPrecio")}>Mayor precio</li>





            </ul>
          )}
        </div>
        <div onClick={Options3}>
          <span>Rango de precio ⮟</span>
          {isOpen3 && (
            <ul>
              <li onClick={(e) => handleLiClick(e, "1-30", "1-30")}>1-30</li>
              <li onClick={(e) => handleLiClick(e, "31-60", "31-60")}>31-60</li>
              <li onClick={(e) => handleLiClick(e, "61-100", "61-100")}>
                61-100
              </li>
              <li onClick={(e) => handleLiClick(e, "100-1000", "100-1000")}>
                100-1000
              </li>
            </ul>
          )}
        </div>
        {/* <div onClick={Options2}>
          <span>Categorías ⮟</span>
          {isOpen2 && (
            <ul>
              <li onClick={handleLiClick}>Carne</li>
              <li onClick={handleLiClick}>Pizza</li>
              <li onClick={handleLiClick}>Pollo</li>
              <li onClick={handleLiClick}>Vegana</li>
            </ul>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default NavbarMenu;
