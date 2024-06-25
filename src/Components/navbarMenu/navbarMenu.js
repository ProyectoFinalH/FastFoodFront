/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "./navbarMenu.css";
import { getSelctRestaurantapp } from "../Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
function NavbarMenu({
  searchString,
  setSearchString,
  handleSubmit,
  handleSort,
  handlePriceRange,
  clearFilter,
  handleCategoryFilter,
  allCategories,
  sortBy,
  applyPriceRangeFilter,
  priceRange,
}) {
  const handleCategoryClick = (category) => {
    handleCategoryFilter(category);
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    handleSort(selectedSort);
  };

  const handlePriceRangeChange = (e) => {
    const range = e.target.value;
    handlePriceRange(range);
    applyPriceRangeFilter(range);
  };

  // const Options2 = () => {
  //   setIsOpen2(!isOpen2);
  // };

  // const handleLiClick = (e, options) => {
  //   e.stopPropagation();
  //   if (options.sortBy) {
  //     handleSort(options.sortBy);
  //   }
  //   if (options.range) {
  //     handlePriceRange(options.range);
  //   }
  //   if (options.category) {
  //     handleCategoryFilter(options.category);
  //   }
  // };

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {});

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
          <div className="menuSelectNavbarMenu">
            <div>
              <label>Por precio:</label>
              <select className="" value={sortBy} onChange={handleSortChange}>
                <option className="optionAdmin" value="">
                  Ordenar por...
                </option>
                <option className="optionAdmin" value="menorPrecio">
                  Menor precio
                </option>
                <option className="optionAdmin" value="mayorPrecio">
                  Mayor precio
                </option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label>Por Rango:</label>
          <select
            className="menuSelectNavbarMenu"
            value={priceRange}
            onChange={handlePriceRangeChange}
          >
            <option value="">Seleccionar rango...</option>
            <option value="1-5">1 - 5</option>
            <option value="6-15">6 - 15</option>
            <option value="16-30">16 - 30</option>
            <option value="31-50">31 - 50</option>
          </select>
        </div>

        <div className="customSection">
          <div>
            <div className="spancategoires">Categorías</div>
          </div>
          <select
            className="menuSelectNavbarMenu"
            id="category-select"
            onChange={(e) => handleCategoryClick(e.target.value)}
          >
            <option value="">Todas</option>
            {allCategories?.map((category) => (
              category.restaurant_id === getSelctRestaurantapp()
              ?<><option key={category?.id } value={category?.id}>
              {category?.name}
            </option></>
            :null
              
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default NavbarMenu;
