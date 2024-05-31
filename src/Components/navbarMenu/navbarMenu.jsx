
import { useState } from 'react';
import "./navbarMenu.css";

function NavbarMenu() {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const Options1 = () => {
    setIsOpen1(!isOpen1);
  };

  const Options2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <div className="navbarMenuContainer">
      <form>
        <div className="searchContainer">
          <input placeholder="Buscar comida" type="search" />
          <button type="submit">BUSCAR</button>
        </div>
      </form>
      <div className="navbarMenuSelect">
        <div className='ulContainer' onClick={Options1}>
          <span>Ordenar ⮟</span>
          {isOpen1 && (
            <ul>
              <li>Precio más bajo</li>
              <li>Precio más alto</li>
            </ul>
          )}
        </div>
        <div className='ulContainer2' onClick={Options2}>
          <span >Categorías ⮟</span>
          {isOpen2 && (
            <ul>
              <li>Carne</li>
              <li>Pizza</li>
              <li>Pollo</li>
              <li>Vegana</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarMenu;