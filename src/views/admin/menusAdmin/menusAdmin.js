import React, { useEffect, useState } from 'react'
import "./menusAdmin.css"

function MenusAdmin({allMenus, allMenuItems}) {
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [menuItemsState, setMenuItemsState] = useState({});

  useEffect(() => {
    // Inicializar el estado de los elementos como activados al principio
    const initialState = {};
    allMenuItems.forEach(menuItem => {
      initialState[menuItem.id] = true;
    });
    setMenuItemsState(initialState);
  }, [allMenuItems]);

  const handleMenuClick = (menuId) => {
    setSelectedMenuId(menuId);
  };

  const handleItemMenuClick = (itemId) => {
    setMenuItemsState(prevState => {
      // Obtener el estado actual del ítem de menú
      const currentItemState = prevState[itemId] || false;
      // Actualizar el estado del ítem de menú a su opuesto
      return { ...prevState, [itemId]: !currentItemState };
    });
  };
  


  return (
    <div className="MenusAdminContainer">
      
      <div className="MenuList">
      <h2>Menu</h2>
        {allMenus.map((menu) => (
          <div 
          key={menu.id}
          className={`MenuItem ${selectedMenuId === menu.id ? 'active' : ''}`}
          onClick={() => handleMenuClick(menu.id)}
          >
           <ul>
            <li>
          {menu.name}
        
            </li>
          </ul> 
          </div>
        ))}
      </div>
      <div className="MenuItemsContainer">
        {selectedMenuId && (
          allMenuItems
            .filter((menuItem) => menuItem.menu_id === selectedMenuId)
            .map((menuItem) => (
              <div key={menuItem.id} className="MenuItemmenu">
                <div className='imageItem'><img src={menuItem.image_url} alt='imgItem'/></div>
                <div className='nameItem' >{menuItem.name}</div>
                <div className='priceItem'>${menuItem.price}</div>
                <div>
                <button className='ButtonEnDis'
                  onClick={() => handleItemMenuClick(menuItem.id)}
                  disabled={menuItemsState[menuItem.id] === false} // Deshabilitar si el estado es falso
                >
                  {menuItemsState[menuItem.id] ? '✖︎' : '✔︎'}
                </button>

                </div>
              </div>
            ))
        )}
      </div>
    </div>
);
    }

export default MenusAdmin