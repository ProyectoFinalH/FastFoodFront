/* eslint-disable react/prop-types */

import CardMenuItems from "../../card/cardMenuItems/cardMenuItems";
import "./cardsMenuItems.css";

function CardsMenuItems({ AllMenuitems }) {
  return (
    <div className="cardsContainer">
      {AllMenuitems &&
        AllMenuitems.map((menu) => (
          <CardMenuItems
            key={menu?.id}
            id={menu?.id}
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

export default CardsMenuItems;
