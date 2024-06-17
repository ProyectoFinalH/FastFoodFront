/* eslint-disable react/prop-types */
import { useState } from "react";
import "./navbarMenu.css";

function NavbarMenu({
  searchString,
  setSearchString,
  handleSubmit,
  handleSort,
  handlePriceRange,
  clearFilter,
  handleCategoryFilter,
  allCategories,
}) {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen3, setIsOpen3] = useState(true);
  const handleCategoryClick = (category) => {
    handleCategoryFilter(category);
  };
  const Options1 = (sortBy) => {
    setIsOpen1(!isOpen1);
    handleSort(sortBy);
  };

  const Options2 = () => {
    setIsOpen2(!isOpen2);
  };

  const Options3 = () => {
    setIsOpen3(!isOpen3);
  };

  const handleLiClick = (e, sortBy, range, category) => {
    e.stopPropagation();
    handleSort(sortBy);
    handlePriceRange(range);
    handleCategoryFilter(category);
  };

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <div className="navbarMenuContainer">
      <form onChange={handleChange}>
        <div className="searchContainer">
          <input
            placeholder="Buscar producto..."
            type="search"
            value={searchString}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit} className="searchButton">
            <p>🔍︎</p>
          </button>
        </div>
      </form>
      <div className="navbarMenuSelect">
        <div className="customSection">
          <button onClick={clearFilter}>Deshacer Filtros</button>
        </div>
        <div className="customSection">
          <div onClick={Options1}>
            <span>Ordenar por ⮟</span>
            {isOpen1 && (
              <ul>
                <li onClick={(e) => handleLiClick(e, "menorPrecio")}>
                  Menor precio
                </li>
                <li onClick={(e) => handleLiClick(e, "mayorPrecio")}>
                  Mayor precio
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="customSection">
          <div onClick={Options3}>
            <span>Rango de precio ⮟</span>
            {isOpen3 && (
              <ul>
                <li onClick={(e) => handleLiClick(e, "1-5", "1-5")}>
                  1 - 5</li>
                <li onClick={(e) => handleLiClick(e, "5-15", "5-15")}>
                  5 - 15
                </li>
                <li onClick={(e) => handleLiClick(e, "15-30", "15-30")}>
                  15 - 30
                </li>
                <li onClick={(e) => handleLiClick(e, "30-50", "30-50")}>
                  30 - 50
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="customSection">
          <div onClick={Options2}>
            <span>Categorías</span>
          </div>
          <select
            id="category-select"
            onChange={(e) => handleCategoryClick(e.target.value)}
          >
            <option value="">Todas</option>
            {allCategories?.map((category) => (
              <option key={category?.id} value={category?.id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default NavbarMenu;
