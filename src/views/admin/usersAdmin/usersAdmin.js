
import { useEffect, useState} from "react";
import "./usersAdmin.css";
import activar from "../../../images/activar.png";
import desactivar from "../../../images/desactivar.png";
import NavbarAdmin from "../navbarAdmin/navbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { PutUsers, getAllUsersAdmin } from "../../../Redux/actions";
import deshacer from "../../../images/deshacer.png"


function UsersAdmin() {


  const allUsersAdmin = useSelector((state) => state.allUsersAdmin);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState([]);
  const [selectOrderNameUsers, setSelectOrderNameUsers] = useState("");
  
  const [noResults, setNoResults] = useState(false);
  useEffect(()=>{
    dispatch(getAllUsersAdmin())
  },[dispatch])


  const toggleActivation = async (userId, active) => {
    try {
      if (!userId) {
        console.error("El id del usuario es incorrecto");
        return;
      }
      await dispatch(PutUsers(userId, active));
    } catch (error) {
      console.error("Error al cambiar el estado del usuario:", error);
    }
  };

  
  useEffect(() => {
    let filteredUsers = [...allUsersAdmin];


    if (search.trim() !== "") {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }


    if (selectOrderNameUsers !== "") {
      filteredUsers.sort((a, b) =>
        selectOrderNameUsers === "asc"
          ? a.username.localeCompare(b.username)
          : b.username.localeCompare(a.username)
      );
    }

 
    setFilterUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0)
  }, [allUsersAdmin, search, selectOrderNameUsers]);



const handleSearchChange = (e) => {
  setSearch(e.target.value);
};


const handleOrderNameChange = (e) => {
  setSelectOrderNameUsers(e.target.value);
};

const handleClearFilter = (e) => {
  setSearch("")
  setSelectOrderNameUsers("")
}


const filteredUsers = filterUsers.filter((user)=> user.role_id === 1)
return (
  <div className="restaurantAdminContainer">
       <NavbarAdmin/>
       <div className="restaurantH2">
        <h2>Usuarios</h2>
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
              value={selectOrderNameUsers}
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
          <div>
            <button title="Deshacer filtros" className="buttonDesOrder"><img src={deshacer} alt="deshacer" onClick={handleClearFilter}/></button>
              </div>
        </div>
      </div>
      <div className="RestauranteContainerAdmin">
      {noResults ? (
        <div className="noResultsMessage">
          <p>No se encontraron resultados.</p>
        </div>
      ) : (
    filteredUsers?.map((user) => (
      <div
      key={user.id}
      className={`cardRestaurant ${user?.active ? "" : "inactive"}`}
      >
        <div className="resImage">
          <img src={user?.image_url} alt="imgRes" />
        </div>
        <div className="infoContainer">
          <div className="resName">
            <h3>Nombre: </h3>
            <p>{user?.username}</p>
          </div>
          <div className="resName">
            <h3>Email: </h3>
            <p title={user?.email}>{user?.email.substring(0, 20)}</p>
          </div>
          <div className="resName">
            <h3>Telefono: </h3>
            <p>{user?.telefono}</p>
          </div>
        </div>
          <div >
          <button 
          className="buttonactdesMenus"
onClick={() => toggleActivation(user?.id, !user?.active) }
>
{user?.active ? 
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
    )))}
    </div>
  </div>
  )
}

export default UsersAdmin