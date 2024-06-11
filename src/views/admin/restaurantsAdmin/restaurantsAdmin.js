import { useEffect, useState } from "react";
import axios from "axios";
import "./restaurantsAdmin.css";

function RestaurantsAdmin({ allRestaurants }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    setRestaurants(allRestaurants);
  }, [allRestaurants]);

  const handleToggleActive = async (restaurantId) => {
    try {
      const updatedRestaurants = restaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          return { ...restaurant, active: !restaurant.active };
        }
        return restaurant;
      });

      // Realizar la solicitud PUT con Axios para actualizar el estado
      await axios.put(`http://localhost:5000/restaurants/${restaurantId}`, {
        active: !restaurants.find(r => r.id === restaurantId).active,
      });

      setRestaurants(updatedRestaurants);
    } catch (error) {
      console.error("Error:", error);
      // Manejar el error de manera apropiada, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <div className="restaurantAdminContainer">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="cardRest">
          <div className="resImage">
            <img src={restaurant.image_url} alt="imgRes" />
          </div>
          <div className="infoContainer">
            <div className="resName"><h3>Nombre: </h3><p>{restaurant.name}</p></div>
            <div className="resName"><h3>Email: </h3><p>{restaurant.email}</p></div>
            <div className="resName"><h3>Direccion: </h3><p>{restaurant.address}</p></div>
            <div className="resName"><h3>Telefono: </h3><p>{restaurant.phone}</p></div>
            <div className="resName"><h3>Descripcion: </h3><p>{restaurant.description}</p></div>
          </div>
          <button
            className='ButtonEnDis'
            onClick={() => handleToggleActive(restaurant.id)}
            disabled={!restaurant.active}
          >
            {restaurant.active ? '✖︎' : '✔︎'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default RestaurantsAdmin;