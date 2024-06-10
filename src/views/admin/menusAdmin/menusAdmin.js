import React, { useEffect, useState } from "react";
import "./menusAdmin.css";

function MenusAdmin({ allMenus, allMenuItems, allRestaurants }) {
  const [selectedMenuId, setSelectedMenuId] = useState({});
  const [menuItemsState, setMenuItemsState] = useState({});

  const restaurant1 = allRestaurants.find(restaurant => restaurant.id === 2);

  useEffect(() => {
    // Inicializar el estado de los elementos como activados al principio
    const initialState = {};
    allMenuItems.forEach((menuItem) => {
      initialState[menuItem.id] = true;
    });
    setMenuItemsState(initialState);
  }, [allMenuItems]);

  const handleMenuClick = (restaurantId, menuId) => {
    setSelectedMenuId((prevSelectedMenus) => ({
      ...prevSelectedMenus,
      [restaurantId]: menuId,
    }));
  };

  const handleItemMenuClick = (itemId) => {
    setMenuItemsState((prevState) => {
      // Obtener el estado actual del ítem de menú
      const currentItemState = prevState[itemId] || false;
      // Actualizar el estado del ítem de menú a su opuesto
      return { ...prevState, [itemId]: !currentItemState };
    });
  };

  return (
    <div className="menusAdminContainerPrincipal">
      {/* {allRestaurants?.map((restaurant) => ( */}
        <div key={restaurant1?.id} className="menusAdminContainerSegundo">
          <div className="resName">
            <h3>Nombre: </h3>
            <p>{restaurant1?.name}</p>
          </div>
          <div className="MenusAdminContainer">
            <div className="MenuList">
              <h2>Menu</h2>
              {allMenus
                .filter((menu) => menu?.restaurant_id === restaurant1?.id)
                .map((menu) => (
                   <div
                  key={menu.id}
                   
                  className={`MenuItem ${
                   
                    selectedMenuId === menu?.id ? "active" : ""
                     
        
                    }`}
            
                    onClick={() => handleMenuClick(restaurant1?.id, menu?.id)}
      
                  >
                    <ul>
                      <li>{menu.name}</li>
                    </ul>
                  </div>
                ))}
            </div>
            <div className="MenuItemsContainer">
              {selectedMenuId[restaurant1?.id] &&
                allMenuItems
                  .filter(
                    (menuItem) =>
                      menuItem?.menu_id === selectedMenuId[restaurant1?.id]
                  )
                  .map((menuItem) => (
                    <div key={menuItem?.id} className="MenuItemmenu">
                      <div className="imageItem">
                        <img src={menuItem?.image_url} alt="imgItem" />
                      </div>
                      <div className="nameItem">
                        {" "}
                        <div>
                          <h2>{menuItem?.name}</h2>
                        </div>
                        <div>
                          <p title={menuItem?.description}>{menuItem?.description.substring(0, 25)}...</p>
                        </div>
                      </div>
                      <div className="priceItem">${menuItem?.price}</div>
                      <div>
                        <button
                          className="ButtonEnDis"
                          onClick={() => handleItemMenuClick(menuItem?.id)}
                          disabled={menuItemsState[menuItem?.id] === false} // Deshabilitar si el estado es falso
                        >
                          {menuItemsState[menuItem?.id] ? "✖︎" : "✔︎"}
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default MenusAdmin;
