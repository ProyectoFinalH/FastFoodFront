/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { getSelctRestaurantapp } from "../Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
import { FaSearch } from "react-icons/fa";

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

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {});

  return (
    <div className="rounded-lg mb-5 h-auto">
      <form onChange={handleChange} className="flex items-center">
        <div className="flex items-center justify-between mb-2.5">
          <input
            placeholder="Buscar producto..."
            type="search"
            value={searchString}
            onChange={handleChange}
            className="w-40 p-2.5 border border-gray-300 rounded-l-lg text-base"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-red-500 text-white border-none p-2.5 rounded-r-lg cursor-pointer flex items-center justify-center h-full"
          >
            <FaSearch className="text-2xl" />
          </button>
        </div>
      </form>
      <div className="mb-5">
        <button
          onClick={clearFilter}
          className="bg-red-500 text-white border-none p-2 rounded-lg cursor-pointer w-full text-left text-lg mb-3.75"
        >
          Deshacer Filtros
        </button>
      </div>
      <div className="h-[27.5vh] min-h-[80px] flex flex-col overflow-auto">
        <div className="mb-2.5">
          <label>Por precio:</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="bg-red-500 text-white border-none p-2.5 rounded-lg cursor-pointer w-full text-left text-lg mb-3.75"
          >
            <option value="">Ordenar por...</option>
            <option value="menorPrecio">Menor precio</option>
            <option value="mayorPrecio">Mayor precio</option>
          </select>
        </div>
        <div className="mb-2.5">
          <label>Por Rango:</label>
          <select
            value={priceRange}
            onChange={handlePriceRangeChange}
            className="bg-red-500 text-white border-none p-2.5 rounded-lg cursor-pointer w-full text-left text-lg mb-3.75"
          >
            <option value="">Seleccionar rango...</option>
            <option value="1-5">1 - 5</option>
            <option value="6-15">6 - 15</option>
            <option value="16-30">16 - 30</option>
            <option value="31-50">31 - 50</option>
          </select>
        </div>
        <div className="mb-5">
          <div className="spancategoires">Categorías</div>
          <select
            id="category-select"
            onChange={(e) => handleCategoryClick(e.target.value)}
            className="bg-red-500 text-white border-none p-2.5 rounded-lg cursor-pointer w-full text-left text-lg mb-3.75"
          >
            <option value="">Todas</option>
            {allCategories?.map((category) =>
              category.restaurant_id === getSelctRestaurantapp() ? (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              ) : null
            )}
          </select>
        </div>
      </div>
    </div>
  );
}

export default NavbarMenu;
