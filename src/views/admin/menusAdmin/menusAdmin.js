import React, { useEffect, useState } from "react";
import "./menusAdmin.css";
import activar from "../../../images/activar.png";
import desactivar from "../../../images/desactivar.png";
import NavbarAdmin from "../navbarAdmin/navbarAdmin";
import { PutItemMenu, PutMenus, getAllMenuitemsAdmin, getAllMenusAdmin, getAllRestaurantsAdmin } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

function MenusAdmin() {
  const [selectedMenuIds, setSelectedMenuIds] = useState({});

  const allRestaurantsAdmin = useSelector((state) => state.allRestaurantsAdmin);

  const allMenusAdmin = useSelector((state) => state.allMenusAdmin);
  const allMenuItemsAdmin = useSelector((state) => state.getAllMenuitemsAdmin);
  const dispatch = useDispatch();
  const [selectedMenuName, setSelectedMenuName] = useState("");

  useEffect(()=>{
    dispatch(getAllMenuitemsAdmin())
    dispatch(getAllMenusAdmin())
    dispatch(getAllRestaurantsAdmin())
  },[dispatch])



  const toggleActivationMenus = async (menuId, active) => {
    try {
      if (!menuId) {
        console.error("El id del restaurante es incorrecto");
        return;
      }
      await dispatch(PutMenus(menuId, active));
      const menuItemsToUpdate = allMenuItemsAdmin.filter(item => item.menu_id === menuId && item.active !== active);
      menuItemsToUpdate.forEach(item => {
        dispatch(PutItemMenu(item.id, active));
      });
    } catch (error) {
      console.error("Error al cambiar el estado del restaurante:", error);
    }
  };

  const toggleActivationItemMenu = async (itemmenuId, active) => {
    try {
      if (!itemmenuId) {
        console.error("El id del restaurante es incorrecto");
        return;
      }
      await dispatch(PutItemMenu(itemmenuId, active));
      
    } catch (error) {
      console.error("Error al cambiar el estado del restaurante:", error);
    }
  };

 
  const handleMenuSelect = (restaurantId, menuId, nameMenu) => {
    setSelectedMenuIds((prevState) => ({
      ...prevState,
      [restaurantId]: menuId,
    }));
    setSelectedMenuName(nameMenu)
  };

  console.log("selected",selectedMenuIds);

console.log(allMenuItemsAdmin);
  return (
    <div className="menusAdminContainerPrincipal">
       <NavbarAdmin/>
      {allRestaurantsAdmin?.map((restaurant) => (
        <div key={restaurant?.id} className="menusAdminContainerSegundo">
          <div className="perfilRestMenusAdmin">
           

            <img src={restaurant.image_url} alt="resLogo"/>
            <h2>{restaurant?.name}</h2>
          
          </div>
          <div className="MenusAdminContainer">
            <div className="MenuList">
              <h2>Menú</h2>
              {allMenusAdmin
                .filter((menu) => menu?.restaurant_id === restaurant?.id)
                .map((menu) => (
                  <div
                    key={menu.id}
                    onClick={() => handleMenuSelect(restaurant?.id, menu?.id, menu?.name)}
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
                    </div>
                      <button
                        className="buttonactdesMenus"
                        onClick={() =>
                          toggleActivationMenus(menu?.id, !menu?.active)
                        }
                      >
                        {menu.active ? (
                          <img src={activar} alt="activar" />
                        ) : (
                          <img src={desactivar} alt="desactivar" />
                        )}
                      </button>
                  </div>
                ))}
            </div>
            <div className="MenuItemsContainer">
             <div className="MenuItemList">
              <h2>{selectedMenuName}</h2>
             </div>
            {selectedMenuIds[restaurant?.id] &&  // Verifica si hay un menu seleccionado para este rest
                allMenuItemsAdmin
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
                            toggleActivationItemMenu(
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
