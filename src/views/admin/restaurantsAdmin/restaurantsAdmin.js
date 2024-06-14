import { useEffect, useState } from "react";
import "./restaurantsAdmin.css";
import axios from "axios";
import activar from "../../../images/activar.png";
import desactivar from "../../../images/desactivar.png";

function RestaurantsAdmin({ allRestaurantsAdmin }) {
  const [restaurants, setRestaurants] = useState([]);

  
  useEffect(() => {
    setRestaurants(allRestaurantsAdmin);
  }, [allRestaurantsAdmin]);
  
  console.log(restaurants)
  const toggleActivation = async (restaurantId, active) => {
    try {
      if (active) {
        await axios.put(
          `http://localhost:5000/restaurants/restore/${restaurantId}`
        );
      } else {
        await axios.put(
          `http://localhost:5000/restaurants/delete/${restaurantId}`
        );
      }

      const updatedRestaurants = restaurants.map((restaurant) =>
        restaurant.id === restaurantId ? { ...restaurant, active } : restaurant
      );
      setRestaurants(updatedRestaurants);
    } catch (error) {
      console.error("Error al cambiar el estado del restaurante:", error);
    }
  };

  return (
    <div className="restaurantAdminContainer">
      {restaurants?.map((restaurant) => (
        <div
          key={restaurant.id}
          className={`cardRest ${restaurant?.active ? "" : "inactive"}`}
        >
          <div className="resImage">
            <img src={restaurant?.image_url} alt="imgRes" />
          </div>
          <div className="infoContainer">
            <div className="resName">
              <h3>Nombre: </h3>
              <p>{restaurant?.name}</p>
            </div>
            <div className="resName">
              <h3>Email: </h3>
              <p>{restaurant?.email}</p>
            </div>
            <div className="resName">
              <h3>Direccion: </h3>
              <p>{restaurant?.address}</p>
            </div>
            <div className="resName">
              <h3>Telefono: </h3>
              <p>{restaurant?.phone}</p>
            </div>
            <div className="resName">
              <h3>Descripcion: </h3>
              <p>{restaurant?.description}</p>
            </div>
          </div>
            <div className="buttonactdes">
            <button 
  onClick={() => toggleActivation(restaurant?.id, !restaurant?.active) }
>
  {restaurant?.active ? 
    <img 
      src={activar} 
      alt="activar"
    /> :
    <img 
      src={desactivar} 
      alt="desactivar"
    />
  }
</button>
            </div>
        </div>
      ))}
    </div>
  );
}

export default RestaurantsAdmin;
