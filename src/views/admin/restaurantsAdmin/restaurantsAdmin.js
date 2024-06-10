import { useEffect, useState } from "react";
import "./restaurantsAdmin.css";

function RestaurantsAdmin({ allRestaurants }) {

  const [RestaurantState, setRestaurantState] = useState({});

  useEffect(() => {
    // Inicializar el estado de los elementos como activados al principio
    const initialState = {};
    console.log(allRestaurants);
    allRestaurants.forEach(restaurant => {
      initialState[restaurant.id] = true;
    });
    setRestaurantState(initialState);

  }, [allRestaurants]);


  const handleItemMenuClick = (restaurant) => {
    setRestaurantState(prevState => ({
      ...prevState,
      [restaurant]: !prevState[restaurant] // Cambiar el estado a su opuesto
    }));
  };
  

  return (
    <div className="restaurantAdminContainer">
      {allRestaurants &&
        allRestaurants.map((restaurant) => (
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
          <button className='ButtonEnDis'
                  onClick={() => handleItemMenuClick(restaurant.id)}
                  disabled={!restaurant.active}  // Deshabilitar si el estado es falso
                >
                  {RestaurantState[restaurant.id] ? '✖︎' : '✔︎'}
                </button>
          </div>
        ))}
    </div>
  );
}

export default RestaurantsAdmin;
