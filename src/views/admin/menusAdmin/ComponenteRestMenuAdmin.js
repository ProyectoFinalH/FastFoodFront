import React, { useEffect, useState } from "react";
import "./menusAdmin.css";
import activar from "../../../images/activar.png";
import desactivar from "../../../images/desactivar.png";
import {
  PutItemMenu,
  PutMenus,
  getAllMenuitemsAdmin,
  getAllMenusAdmin,
} from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

function MenusRestAdmin({ restaurant }) {
  const [selectedMenuIds, setSelectedMenuIds] = useState({});
  const allMenusAdmin = useSelector((state) => state.allMenusAdmin);
  const allMenuItemsAdmin = useSelector((state) => state.getAllMenuitemsAdmin);
  const dispatch = useDispatch();
  const [selectedMenuName, setSelectedMenuName] = useState("");
  const [searchItemMenu, setSearchItemMenu] = useState("");
  const [filterItemMenu, setFilterItemMenu] = useState([]);
  const [selectOrderNameItemMenu, setSelectOrderNameItemMenu] = useState("");
  const [filterMenu, setFilterMenu] = useState([]);
  const [searchMenu, setSearchMenu] = useState("");
  const [selectOrderPriceItemMenu, setSelectOrderPriceItemMenu] = useState("");
  const [noResults, setNoResults] = useState(false)

  useEffect(() => {

    dispatch(getAllMenuitemsAdmin());
    dispatch(getAllMenusAdmin());
  }, [dispatch, restaurant])


  const toggleActivationMenus = async (menuId, active) => {
    try {
      if (!menuId) {
        console.error("El id del menú es incorrecto");
        return;
      }
      await dispatch(PutMenus(menuId, active));
      const menuItemsToUpdate = allMenuItemsAdmin.filter(
        (item) => item.menu_id === menuId && item.active !== active
      );
   
      menuItemsToUpdate.forEach((item) => {
        dispatch(PutItemMenu(item.id, active));
      });
    } catch (error) {
      console.error("Error al cambiar el estado del menú:", error);
    }
  };


  const toggleActivationItemMenu = async (itemmenuId, active) => {
    try {
      if (!itemmenuId) {
        console.error("El id del ítem del menú es incorrecto");
        return;
      }
      await dispatch(PutItemMenu(itemmenuId, active));
    } catch (error) {
      console.error("Error al cambiar el estado del ítem del menú:", error);
    }
  };


  const handleMenuSelect = (restaurantId, menuId, nameMenu) => {
    setSelectedMenuIds((prevState) => ({
      ...prevState,
      [restaurantId]: menuId,
    }));
    setSelectedMenuName((prevState) => ({
      ...prevState,
      [restaurantId]: nameMenu,
    }));
  };

  useEffect(() => {
    let filteredMenu = [...allMenusAdmin];
    if (searchMenu.trim() !== "") {
      filteredMenu = filteredMenu.filter((menu) =>
        menu.name.toLowerCase().includes(searchMenu.toLowerCase())
      );
    }
    setFilterMenu(filteredMenu);
    setNoResults(filteredMenu.length===0)
  }, [allMenusAdmin, searchMenu]);


  useEffect(() => {
    let filteredItemMenu = [...allMenuItemsAdmin];
    if (searchItemMenu.trim() !== "") {
      filteredItemMenu = filteredItemMenu.filter((ItemMenu) =>
        ItemMenu.name.toLowerCase().includes(searchItemMenu.toLowerCase())
      );
    }
    if (selectOrderNameItemMenu !== "") {
      filteredItemMenu.sort((a, b) =>
        selectOrderNameItemMenu === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }
    if (selectOrderPriceItemMenu === "menor") {
      filteredItemMenu = filteredItemMenu?.sort((a, b) => a.price - b.price);
    } else if (selectOrderPriceItemMenu === "mayor") {
      filteredItemMenu = filteredItemMenu?.sort((a, b) => b.price - a.price);
    }
    setFilterItemMenu(filteredItemMenu);
    setNoResults(filteredItemMenu.length===0)
  }, [
    allMenuItemsAdmin,
    searchItemMenu,
    selectOrderNameItemMenu,
    selectOrderPriceItemMenu,
  ]);

 
  const handleSearchMenuChange = (e) => {
    setSearchMenu(e.target.value);
  };


  const handleSearchItemMenuChange = (e) => {
    setSearchItemMenu(e.target.value);
  };


  const handleOrderNameItemChange = (e) => {
    setSelectOrderNameItemMenu(e.target.value);
  };


  const handleOrderPriceItemMenuChange = (e) => {
    setSelectOrderPriceItemMenu(e.target.value);
  };

  return (
    <div className="menusAdminContainerPrincipal">
     
      <div key={restaurant.id} className="menusAdminContainerSegundo">
        <div className="perfilRestMenusAdmin">
          <img src={restaurant.image_url} alt="resLogo" />
          <h2>{restaurant.name}</h2>
        </div>
        <div className="MenusAdminContainer">
        
          <div className="MenuList">
            <div>
              <h2>Menú</h2>
            </div>
            <div>
              <div className="SearchMenuAdmin">
                <div className="inputSearchMenuAdmin">
                  <input
                    type="search"
                    placeholder="Menu..."
                    value={searchMenu}
                    onChange={handleSearchMenuChange}
                  />
                  <div className="buttonSearchMenuAdmin">
                    <button>🔍︎</button>
                  </div>
                </div>
              </div>
            </div>
            
            {noResults ? (
        <div className="noResultsMessage">
          <p>No se encontraron resultados.</p>
        </div>
      ) : (
         
            filterMenu
              .filter((menu) => menu.restaurant_id === restaurant.id)
              .map((menu) => (
                <div
                  key={menu.id}
                  onClick={() =>
                    handleMenuSelect(restaurant.id, menu.id, menu.name)
                  }
                  className={`MenusAdmin ${menu.active ? "" : "inactive"} ${
                    selectedMenuIds[restaurant.id] === menu.id
                      ? "selectedMenu"
                      : ""
                  }`}
                >
                  <div className="menuSelectAdmin">
                    <ul>
                      <div className="menuLi">
                        <li>{menu.name}</li>
                      </div>
                    </ul>
                  </div>
                  <button
                    className="buttonactdesMenus"
                    onClick={() => toggleActivationMenus(menu.id, !menu.active)}
                  >
                    {menu.active ? (
                      <img src={activar} alt="activar" />
                    ) : (
                      <img src={desactivar} alt="desactivar" />
                    )}
                  </button>
                </div>
              )))}
          </div>

         
          <div className="MenuItemsContainer">
            {selectedMenuIds[restaurant.id] && (
              <div className="MenuItemList">
                <div className="h2MenuSelected">
                  <h2>{selectedMenuName[restaurant.id]}</h2>
                </div>
                <div className="SearchRestAdmin">
                  <div className="inputSearchResAdmin">
                    <input
                      type="search"
                      placeholder="Producto..."
                      value={searchItemMenu}
                      onChange={handleSearchItemMenuChange}
                    />
                    <div className="buttonSearchAdmin">
                      <button>🔍︎</button>
                    </div>
                  </div>
                  <div className="selectsAdmin">
                   
                    <div className="SelectsContainerAdmin">
                      <label>Por Nombre:</label>
                      <select
                        className="selectAdmin"
                        value={selectOrderNameItemMenu}
                        onChange={handleOrderNameItemChange}
                      >
                        <option className="optionAdmin" value="">
                          Selecionar orden...
                        </option>
                        <option className="optionAdmin" value="asc">
                          Ascendente
                        </option>
                        <option className="optionAdmin" value="des">
                          Descendente
                        </option>
                      </select>
                    </div>
                   
                    <div className="SelectsContainerAdmin">
                      <label>Por Precio:</label>
                      <select
                        className="selectAdmin"
                        value={selectOrderPriceItemMenu}
                        onChange={handleOrderPriceItemMenuChange}
                      >
                        <option className="optionAdmin" value="">
                          Selecionar orden...
                        </option>
                        <option className="optionAdmin" value="mayor">
                          Mayor
                        </option>
                        <option className="optionAdmin" value="menor">
                          Menor
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="menuItemContainer">
                {noResults ? (
        <div className="noResultsMessage">
          <p>No se encontraron resultados.</p>
        </div>
      ) : (
             
                filterItemMenu
                  .filter((menuItem) => menuItem.menu_id === selectedMenuIds[restaurant.id])
                  .map((menuItem) => (
                    <div
                      key={menuItem.id}
                      className={`MenuItemmenu ${menuItem.active ? "" : "inactive"}`}
                    >
                      <div className="imageItem">
                        <img src={menuItem.image_url} alt="imgItem" />
                      </div>
                      <div className="infoCardItemMenu">
                      <div className="nameItem">
                        <div>
                          <h2>{menuItem.name}</h2>
                        </div>
                        <div>
                          <p title={menuItem.description}>
                            {menuItem.description?.substring(0, 25)}...
                          </p>
                        </div>
                      <div className="priceItem">${menuItem.price}</div>
                      </div>

                   
                      <button
                        className="buttonactdesMenus"
                        onClick={() =>
                          toggleActivationItemMenu(menuItem.id, !menuItem.active)
                        }
                      >
                        {menuItem.active ? (
                          <img src={activar} alt="activar" />
                        ) : (
                          <img src={desactivar} alt="desactivar" />
                        )}
                      </button>
                      </div>
                    </div>
                  )))}
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenusRestAdmin;