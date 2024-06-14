import Sidebar from "./sidebar/sidebar";
// import logo from "../../images/logo.png"
import "./admin.css";

import { getAllMenuitemsAdmin,getAllMenusAdmin,getAllRestaurantsAdmin, getAllUsersAdmin } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Admin() {
  const allRestaurantsAdmin = useSelector((state) => state.allRestaurantsAdmin);
  const allMenuItemsAdmin = useSelector((state)=> state.getAllMenuitemsAdmin)
  const allMenusAdmin = useSelector((state)=> state.allMenusAdmin)
  const allUsersAdmin = useSelector((state) => state.allUsersAdmin);

  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestaurantsAdmin());
    dispatch(getAllMenuitemsAdmin());
    dispatch(getAllMenusAdmin());
    dispatch(getAllUsersAdmin())
  }, [dispatch]);

  return (
    <div className="companyContainer">
      <div>
        <Sidebar allUsersAdmin={allUsersAdmin} allRestaurantsAdmin={allRestaurantsAdmin} allMenuItemsAdmin={allMenuItemsAdmin} allMenusAdmin={allMenusAdmin}/>
      </div>
    </div>
  );
}

export default Admin;

