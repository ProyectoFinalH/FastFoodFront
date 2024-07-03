/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import CardMenus from "../../card/cardMenus/cardMenus";

function CardsMenus({ AllMenus, handleSelectMenu }) {
  const selectedRestaurant = useSelector((state) => state.SELCTRESTAURANT);

  return (
    <div className="flex w-full flex-wrap justify-start">
      {AllMenus &&
        AllMenus.map((menu) =>
          selectedRestaurant === menu.restaurant_id ? (
            <CardMenus
              key={menu.id}
              id={menu.id}
              name={menu.name}
              restaurant_id={menu.restaurant_id}
              handleSelectMenu={handleSelectMenu}
            />
          ) : null
        )}
    </div>
  );
}

export default CardsMenus;
