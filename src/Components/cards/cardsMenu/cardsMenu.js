/* eslint-disable react/prop-types */

import CardMenu from "../../card/cardMenu/cardMenu";
import "./cardsMenu.css";

function CardsMenu({ AllMenuitems }) {
  
  return (
    <div className="cardsContainer">

      {AllMenuitems && AllMenuitems.map((menu) => (
        <CardMenu 
        key={menu?.id}
        menuid={menu?.menu_id}
        category={menu?.category_id}
        name={menu?.name}
        description={menu?.description}
        price={menu?.price}
        image={menu?.image_url} 
        />
      ))}
    </div>
  );
}

export default CardsMenu;
