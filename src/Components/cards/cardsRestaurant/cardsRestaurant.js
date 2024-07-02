import React from "react";
import CardRestaurant from "../../card/cardRestaurant/cardRestaurant";
import { setSelctRestaurantapp } from "../../Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
import { Sellcionar_Restaurante } from "../../../Redux/actions";
import { useDispatch } from "react-redux";

function CardsRestaurant({ allRestaurants }) {
  const dispatch = useDispatch();
  const handleEleccionRestaurant = (id) => {
    setSelctRestaurantapp(id);
    dispatch(Sellcionar_Restaurante(id));
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {allRestaurants &&
        allRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => handleEleccionRestaurant(restaurant.id)}
            className="cursor-pointer"
          >
            <CardRestaurant
              id={restaurant.id}
              name={restaurant.name}
              description={restaurant.description}
              image_url={restaurant.image_url}
              rating={restaurant.rating}
            />
          </div>
        ))}
    </div>
  );
}

export default CardsRestaurant;
