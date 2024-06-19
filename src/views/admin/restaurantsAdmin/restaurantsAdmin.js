
import "./restaurantsAdmin.css";

import activar from "../../../images/activar.png";
import desactivar from "../../../images/desactivar.png";
import NavbarAdmin from "../navbarAdmin/navbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { PutRestaurants, getAllRestaurantsAdmin } from "../../../Redux/actions";
import { useEffect} from "react";

// import { useLocalStorage } from "../../../Components/localStorage/useLocalStorage";


function RestaurantsAdmin() {
  

  // const [search, setSearch] = useState({})
  const allRestaurantsAdmin = useSelector((state) => state.allRestaurantsAdmin);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllRestaurantsAdmin())
  },[dispatch])

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   dispatch(getMenuItemsByName(searchString));
  // }


  const toggleActivation = async (restaurantId, active) => {
    try {
      if (!restaurantId) {
        console.error("El id del restaurante es incorrecto");
        return;
      }
      await dispatch(PutRestaurants(restaurantId, active));
    } catch (error) {
      console.error("Error al cambiar el estado del restaurante:", error);
    }
  };

  return (
    <div className="restaurantAdminContainer">
     <NavbarAdmin/>
      {allRestaurantsAdmin?.map((restaurant) => (
        <div
          key={restaurant.id}
          className={`cardRestaurant ${restaurant?.active ? "" : "inactive"}`}
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
          <div>
            <button
            className="buttonactdesMenus"
              onClick={() =>
                toggleActivation(restaurant?.id, !restaurant?.active)
              }
            >
              {restaurant?.active ? (
                <img src={activar} alt="activar" />
              ) : (
                <img src={desactivar} alt="desactivar" />
              )}
            </button>
            </div>
        </div>
      ))}
      
    </div>
  );
}

export default RestaurantsAdmin;
