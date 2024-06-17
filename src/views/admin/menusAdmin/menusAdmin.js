import React, { useEffect, useState } from "react";
import axios from "axios";
import "./menusAdmin.css";
import activar from "../../../images/activar.png";
import desactivar from "../../../images/desactivar.png";
import NavbarAdmin from "../navbarAdmin/navbarAdmin";

function MenusAdmin({ allMenusAdmin, allMenuItemsAdmin, allRestaurantsAdmin }) {
  const [menus, setMenus] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuIds, setSelectedMenuIds] = useState({});
 

  useEffect(() => {
    setMenus(allMenusAdmin);
    setMenuItems(allMenuItemsAdmin);
  }, [allMenusAdmin, allMenuItemsAdmin]);

  const toggleActivationMenu = async (menuId, active) => {
    try {
      await axios.put(
        `http://localhost:5000/menus/${active ? "restore" : "delete"}/${menuId}`
      );

      const updatedMenus = menus?.map((menu) =>
        menu?.id === menuId ? { ...menu, active } : menu
      );
      setMenus(updatedMenus);
    } catch (error) {
      console.error("Error al cambiar el estado del Menú:", error);
    }
  };

  const toggleActivationMenuItem = async (menuItemID, active) => {
    try {
      await axios.put(
        `http://localhost:5000/menuitems/${
          active ? "restore" : "delete"
        }/${menuItemID}`
      );

      const updatedMenuItems = menuItems?.map((menuItem) =>
        menuItem?.id === menuItemID ? { ...menuItem, active } : menuItem
      );
      setMenuItems(updatedMenuItems);
    } catch (error) {
      console.error("Error al cambiar el estado del ítem de menú:", error);
    }
  };

  const handleMenuSelect = (restaurantId, menuId) => {
    setSelectedMenuIds((prevState) => ({
      ...prevState,
      [restaurantId]: menuId, //
    }));
  };


  return (
    <div className="menusAdminContainerPrincipal">
       <NavbarAdmin/>
      {allRestaurantsAdmin?.map((restaurant) => (
        <div key={restaurant?.id} className="menusAdminContainerSegundo">
          <div className="resName">
            <h3>Nombre: </h3>
            <p>{restaurant?.name}</p>
          </div>
          <div className="MenusAdminContainer">
            <div className="MenuList">
              <h2>Menú</h2>
              {menus
                .filter((menu) => menu?.restaurant_id === restaurant?.id)
                .map((menu) => (
                  <div
                    key={menu.id}
                    onClick={() => handleMenuSelect(restaurant?.id, menu?.id)}
                    className={`MenusAdmin ${menu?.active ? '' : 'inactive'} ${
                      selectedMenuIds[restaurant.id] === menu.id ? 'selectedMenu' : ''

                    }`}
                  >
                    <div className="menuSelectAdmin">
                      <ul>
                        <div className="menuLi">
                          <li>{menu?.name}</li>
                        </div>
                      </ul>
                      <button
                        className="buttonactdesMenus"
                        onClick={() =>
                          toggleActivationMenu(menu?.id, !menu?.active)
                        }
                      >
                        {menu.active ? (
                          <img src={activar} alt="activar" />
                        ) : (
                          <img src={desactivar} alt="desactivar" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="MenuItemsContainer">
              {selectedMenuIds[restaurant?.id] && // Verifica si hay un menu seleccionado para este rest
                menuItems
                  .filter(
                    (menuItem) =>
                      menuItem?.menu_id === selectedMenuIds[restaurant?.id]
                  )
                  .map((menuItem) => (
                    <div
                      key={menuItem?.id}
                      className={`MenuItemmenu ${
                        menuItem?.active ? "" : "inactive"
                      }`}
                    >
                      <div className="imageItem">
                        <img src={menuItem?.image_url} alt="imgItem" />
                      </div>
                      <div className="nameItem">
                        <div>
                          <h2>{menuItem?.name}</h2>
                        </div>
                        <div>
                          <p title={menuItem?.description}>
                            {menuItem?.description?.substring(0, 25)}...
                          </p>
                        </div>
                      </div>
                      <div className="priceItem">${menuItem?.price}</div>
      
                        <button
                          className="buttonactdesMenus"
                          onClick={() =>
                            toggleActivationMenuItem(
                              menuItem?.id,
                              !menuItem?.active
                            )
                          }
                        >
                          {menuItem?.active ? (
                            <img src={activar} alt="activar" />
                          ) : (
                            <img src={desactivar} alt="desactivar" />
                          )}
                        </button>
                      </div>
                    
                  ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenusAdmin;
