
import { useEffect} from "react";
import "./usersAdmin.css";
import activar from "../../../images/activar.png";
import desactivar from "../../../images/desactivar.png";
import NavbarAdmin from "../navbarAdmin/navbarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { PutUsers, getAllUsersAdmin } from "../../../Redux/actions";

function UsersAdmin() {


  const allUsersAdmin = useSelector((state) => state.allUsersAdmin);
  const dispatch = useDispatch();

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



  
const filteredUsers = allUsersAdmin.filter((user)=> user.role_id === 1)

  return (
    <div className="restaurantAdminContainer">
       <NavbarAdmin/>
    {filteredUsers?.map((user) => (
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
            <p>{user?.email}</p>
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
    ))}
  </div>
  )
}

export default UsersAdmin