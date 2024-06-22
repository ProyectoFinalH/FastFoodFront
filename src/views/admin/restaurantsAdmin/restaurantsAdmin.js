import "./restaurantsAdmin.css";

import activar from "../../../images/activar.png";
import desactivar from "../../../images/desactivar.png";
import NavbarAdmin from "../navbarAdmin/navbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { PutRestaurants, getAllRestaurantsAdmin } from "../../../Redux/actions";
import { useEffect, useState } from "react";

// import { useLocalStorage } from "../../../Components/localStorage/useLocalStorage";

function RestaurantsAdmin() {
  const [search, setSearch] = useState("");
  const allRestaurantsAdmin = useSelector((state) => state.allRestaurantsAdmin);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [selectOrderNameRest, setSelectOrderNameRest] = useState("");
  const [selectOrderEmailRest, setSelectOrderEmailRest] = useState("");
  const [noResults, setNoResults] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestaurantsAdmin());
  }, [dispatch]);

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

  useEffect(() => {
    let filteredRestaurants = [...allRestaurantsAdmin];


    if (search.trim() !== "") {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
          restaurant.email.toLowerCase().includes(search.toLowerCase())
      );
    }


    if (selectOrderNameRest !== "") {
      filteredRestaurants.sort((a, b) =>
        selectOrderNameRest === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }

 
    setFilterRestaurants(filteredRestaurants);
  }, [allRestaurantsAdmin, search, selectOrderNameRest]);

  useEffect(() => {
    let filteredRestaurants = [...allRestaurantsAdmin];

   
    if (search.trim() !== "") {
      filteredRestaurants = filteredRestaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
          restaurant.email.toLowerCase().includes(search.toLowerCase())
      );
    }

   
    if (selectOrderEmailRest !== "") {
      filteredRestaurants.sort((a, b) =>
        selectOrderEmailRest === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email)
      );
    }

    setFilterRestaurants(filteredRestaurants);
    setNoResults(filteredRestaurants.length=== 0)
  }, [allRestaurantsAdmin, search, selectOrderEmailRest]);


  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOrderEmailChange = (e) => {
    setSelectOrderEmailRest(e.target.value);
  };

  const handleOrderNameChange = (e) => {
    setSelectOrderNameRest(e.target.value);
  };

  return (
    <div className="restaurantAdminContainer">
      <NavbarAdmin />
      <div className="restaurantH2">
        <h2>Restaurantes</h2>
      </div>
      <div className="SearchRestAdmin">
        <div className="inputSearchResAdmin">
          <input
            type="search"
            placeholder="Nombre o Email..."
            value={search}
            onChange={handleSearchChange}
          />
          <div className="buttonSearchAdmin">
            <button>🔍︎</button>
          </div>
        </div>
        <div className="selectsAdmin">
          <div className="SelectsContainerAdmin">
          <label>Por Nombre:</label>
            <select
              className="selectAdmin"
              value={selectOrderNameRest}
              onChange={handleOrderNameChange}
            >
              <option className="optionAdmin" value="">
              Selecionar orden...
              </option>
              <option className="optionAdmin" value="asc">
                Acendente
              </option>
              <option className="optionAdmin" value="des">
                Descendente
              </option>
            </select>
          </div>

          <div className="SelectsContainerAdmin">
            <label>Por Email:</label>
            <select
              className="selectAdmin"
              value={selectOrderEmailRest}
              onChange={handleOrderEmailChange}
            >
              <option className="optionAdmin" value="">
              Selecionar orden...
              </option>
              <option className="optionAdmin" value="dec">
                Descendente
              </option>
              <option className="optionAdmin" value="asc">
                Acendente
              </option>
            
            </select>
          </div>
        </div>
      </div>
      {noResults ? (
        <div className="noResultsMessage">
          <p>No se encontraron resultados.</p>
        </div>
      ) : (
      filterRestaurants?.map((restaurant) => (
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
      )))}
    </div>
  );
}

export default RestaurantsAdmin;
