import {
  getAllMenuitems,
  getAllMenus,
  getMenuItemsByName,
  getAllCategories,
} from "../../Redux/actions";
// import { getAllRestaurants, getAllCategories, } from "../../redux/actions"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CardsMenuItem from "../../Components/cards/cardsMenuItems/cardsMenuItems";
import NavbarMenu from "../../Components/navbarMenu/navbarMenu";
import "./menu.css";
// import CardsRestaurant from "../../Components/cards/cardsRestaurant/cardsRestaurant";
import CardsMenus from "../../Components/cards/cardsMenus/cardsMenus";
import Navbar from "../../Components/navbar/navbar";
import Detail from "../detail/detail";

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const allRestaurant = useSelector((state)=> state.allRestaurant)
  const allMenus = useSelector((state) => state.allMenus);
  const allMenuitems = useSelector((state) => state.allMenuItems);
  const allCategories = useSelector((state) => state.allCategories);
  const [selectMenuItem, setSelectMenuItem] = useState(null);
  // const allCategories = useSelector((state)=> state.allCategories)

  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [priceRange, setPriceRange] = useState("");

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
 
  const handleCategoryFilter = (category) => {
    setSelectedCategory(Number(category));
  };

  useEffect(() => {
    // dispatch(getAllRestaurants())
    dispatch(getAllMenus());
    dispatch(getAllMenuitems());
    dispatch(getAllCategories())
  }, [dispatch]);

  //FILTRO POR RANGO
  const applyPriceRangeFilter = (menuItems, range) => {
    const [min, max] = range.split("-").map(Number);
    return menuItems.filter((menu) => menu.price >= min && menu.price <= max);
  };

  //HANDLERS PARA EL SEARCH
  function handleChange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getMenuItemsByName(searchString));
  }

  // FUNCION PARA DESHACER FILTROS
  const clearFilters = () => {
    setSearchString("");
    setSortBy(null);
    setPriceRange("");
    setSelectMenuItem(null);
    setSelectedCategory("");
  };

  //Copia del Estado allMenuItems
  let filteredMenuItems = [...allMenuitems];
  // FILTRADO DE ITEMMENU EN BASE AL MENU
  const handleSelectMenu = (menuItem) => {
    setSelectMenuItem((prevId) => (prevId === menuItem ? null : menuItem));
  };

  if (selectMenuItem) {
    filteredMenuItems = filteredMenuItems.filter(
      (menu) => menu.menu_id === selectMenuItem
    );
  }

  if (selectedCategory) {
    filteredMenuItems = filteredMenuItems.filter(
      (menuItem) => menuItem.category_id === selectedCategory
    );
  }
  console.log(selectedCategory)

  // ORDENAMIENTO DE ITEMSMENU
  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };
  if (sortBy === "menorPrecio") {
    filteredMenuItems = filteredMenuItems.sort((a, b) => a.price - b.price);
  } else if (sortBy === "mayorPrecio") {
    filteredMenuItems = filteredMenuItems.sort((a, b) => b.price - a.price);
  }

  // ORDENAMIENTO DE ITEMSMENU EN BASE AL RANGO
  const handlePriceRange = (range) => {
    setPriceRange(range);
  };

  if (priceRange) {
    filteredMenuItems = applyPriceRangeFilter(filteredMenuItems, priceRange);
  }


  //SEARCH POR NOMBRE
  if (searchString.trim() !== "") {
    filteredMenuItems = filteredMenuItems.filter((menuItem) =>
      menuItem.name.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  //Boton volver Atras
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="menuContainer">
      <Navbar />
      <div className="buttonBack">
        <button onClick={handleGoBack}>⬅ Volver</button>
      </div>
      <h2>Nombre del Restaurant</h2>
   
      <div className="navCardContainer">
        <div className="navBarContainer">
          <NavbarMenu
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleSort={handleSort}
            handlePriceRange={handlePriceRange}
            clearFilter={clearFilters}
            handleCategoryFilter={handleCategoryFilter}
            allCategories={allCategories}
          />
        </div>
        <div className="cardsMenusContainer">
        <div className="cardsViewMenusSelectContainer" >
        <CardsMenus AllMenus={allMenus} handleSelectMenu={handleSelectMenu} />
      </div>
        <div className="CardViewMenuContainer">
          {allMenus.map((menu) => (
            <div key={menu.id} className="CardsListMenuContainer">
              {/* <h2>{menu.name}</h2> */}
              <CardsMenuItem
                AllMenuitems={filteredMenuItems.filter(
                  (menuItem) => menuItem.menu_id === menu.id
                )}
                handleSelectMenuItem={(id) => setSelectedMenuItemId(id)}
              />
            </div>
          ))}
        </div>
        </div>
      </div>
      {selectedMenuItemId && (
        <Detail
          isOpen
          handleCloseModal={() => setSelectedMenuItemId(null)}
          menuItemId={selectedMenuItemId}
        />
      )}

    </div>
  );
}

export default Menu;
