/* eslint-disable react/prop-types */

import CardMenuItems from "../../card/cardMenuItems/cardMenuItems";
import "./cardsMenuItems.css";

function CardsMenuItems({
  AllMenuitems,
  handleSelectMenuItem,
  hideCartButtons,
  showEyeIcon,
}) {
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
            handleSelectMenuItem={handleSelectMenuItem}
            hideCartButtons={hideCartButtons}
            showEyeIcon={showEyeIcon}
          />
        ))}
    </div>
  );
}

export default CardsMenuItems;
