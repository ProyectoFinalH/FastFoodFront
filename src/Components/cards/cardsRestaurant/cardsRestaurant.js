import React from "react";
import CardRestaurant from "../../card/cardRestaurant/cardRestaurant";
import { setSelctRestaurantapp } from "../../Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
import "./cardsRestaurant.css";

import {Sellcionar_Restaurante} from "../../../Redux/actions"
import { useDispatch } from "react-redux";

function CardsRestaurant({ allRestaurants }) {
  const dispatch = useDispatch()
  const handleEleccionRestaurant = (id)=>{
      //alert("Restaurante seleccionado es "+ Number( id-1))
      setSelctRestaurantapp(id)
      dispatch(Sellcionar_Restaurante(id))
  }
  return (
    <div className="CardsRestContainer">
     
      {allRestaurants &&
        allRestaurants.map((restaurant) => (
          <div onClick={()=>{handleEleccionRestaurant(restaurant.id)}}>
          <div key={restaurant?.id}>
            <CardRestaurant
              id={restaurant?.id}
              name={restaurant?.name}
              description={restaurant?.description}
              image_url={restaurant?.image_url}
              rating={restaurant?.rating}
            />
          </div>
          </div>
        ))}
    </div>
  );
}

export default CardsRestaurant;
