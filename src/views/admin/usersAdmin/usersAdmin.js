
import { useEffect, useState } from "react";
import "./usersAdmin.css";
import axios from "axios";
import activar from "../../../images/activar.png";
import desactivar from "../../../images/desactivar.png";

function UsersAdmin({allUsersAdmin}) {
  const [users, setUsers] = useState([]);
  
  
  useEffect(() => {
    setUsers(allUsersAdmin);
  }, [allUsersAdmin]);


  const toggleActivation = async (usersId, active) => {
    try {
      if (active) {
        await axios.put(
          `http://localhost:5000/users/restore/${usersId}`
        );
      } else {
        await axios.put(
          `http://localhost:5000/users/delete/${usersId}`
        );
      }

      const updatedUsers = users.map((user) =>
        user.id === usersId ? { ...user, active } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error al cambiar el estado del user:", error);
    }
  };
  
const filteredUsers = users.filter((user)=> user.role_id === 1)

  return (
    <div className="restaurantAdminContainer">
    {filteredUsers?.map((user) => (
      <div
        key={user.id}
        className={`cardRest ${user?.active ? "" : "inactive"}`}
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
          <div className="buttonactdes">
          <button 
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