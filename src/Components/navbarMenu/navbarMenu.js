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
  const Options1 = () => {
    setIsOpen1(!isOpen1);
  };

  const Options2 = () => {
    setIsOpen2(!isOpen2);
  };

  const Options3 = () => {
    setIsOpen3(!isOpen3);
  };

  const handleLiClick = (e, options) => {
    e.stopPropagation();
    if (options.sortBy) {
      handleSort(options.sortBy);
    }
    if (options.range) {
      handlePriceRange(options.range);
    }
    if (options.category) {
      handleCategoryFilter(options.category);
    }
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
        <div className="customSection">
          <button onClick={clearFilter}>Deshacer Filtros</button>
        </div>
      <div className="navbarMenuSelect">
        <div className="customSection">
          <div onClick={Options1}>
            <span>Ordenar por ⮟</span>
            <select onChange={(e) => handleLiClick(e, { sortBy: e.target.value })}>
            <option value="menorPrecio">Menor precio</option>
            <option value="mayorPrecio">Mayor precio</option>
          </select>
          </div>
        </div>
        <div className="customSection">
          <div onClick={Options3}>
          <span >Rango de precio ⮟</span>
          <select onChange={(e) => handleLiClick(e, { range: e.target.value })}>
            <option value="1-10">1 - 10</option>
            <option value="11-20">11 - 20</option>
            <option value="21-30">21 - 30</option>
            <option value="31-40">31 - 40</option>
          </select>
          </div>
        </div>
        <div className="customSection">
          <div onClick={Options2}>
            <div className="spancategoires">Categorías</div>
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
