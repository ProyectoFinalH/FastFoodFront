/* eslint-disable react/prop-types */
import CardMenus from "../../card/cardMenus/cardMenus";
import "./cardsMenus.css";

function CardsMenus({ AllMenus, handleSelectMenu }) {

  
  return (
    <div className="cardsMenusContainer">
    
      {AllMenus && AllMenus.map((menu) => (
        <CardMenus 
        key={menu?.id}
        id={menu?.id}
        name={menu?.name}
        restaurant_id={menu?.restaurant_id}
        handleSelectMenu={handleSelectMenu}
        />
      ))}
    </div>
  );
}

export default CardsMenus;