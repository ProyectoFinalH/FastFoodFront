import { useEffect, useState } from "react";
import "./restaurantsAdmin.css";
// import axios from "axios";

function RestaurantsAdmin({ allRestaurants }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    setRestaurants(allRestaurants);
  }, [allRestaurants]);

  // const toggleActivation = async (restaurantId, active) => {
  //   try {
  //     // Realizar la solicitud axios para cambiar el estado de activación en el backend
  //     if (active) {
  //       await axios.put(`http://localhost:5000/restaurants/restore/${restaurantId}`);
  //     } else {
  //       await axios.put(`http://localhost:5000/restaurants/delete/${restaurantId}`);
  //     }
      
  //     // Actualizar el estado local para reflejar el cambio en la activación del restaurante
  //     setRestaurants()

  //   } catch (error) {
  //     console.error("Error al cambiar el estado del restaurante:", error);
  //   }
  // };

  return (
    <div className="restaurantAdminContainer">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className={`cardRest ${restaurant.active ? '' : 'inactive'}`}>
          <div className="resImage">
            <img src={restaurant.image_url} alt="imgRes" />
          </div>
          <div className="infoContainer">
            <div className="resName"><h3>Nombre: </h3><p>{restaurant.name}</p></div>
            <div className="resName"><h3>Email: </h3><p>{restaurant.email}</p></div>
            <div className="resName"><h3>Direccion: </h3><p>{restaurant.address}</p></div>
            <div className="resName"><h3>Telefono: </h3><p>{restaurant.phone}</p></div>
            <div className="resName"><h3>Descripcion: </h3><p>{restaurant.description}</p></div>
            <div>
              <button /*onClick={() => toggleActivation(restaurant.id, !restaurant.active) }*/>
                {restaurant.active ? "Desactivar" : "Activar"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RestaurantsAdmin;