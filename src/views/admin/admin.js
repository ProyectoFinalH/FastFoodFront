import Sidebar from "./sidebar/sidebar";
// import logo from "../../images/logo.png"
import "./admin.css";

import { getAllMenuitemsAdmin,getAllMenusAdmin,getAllRestaurantsAdmin, getAllUsersAdmin, getOrdersAdmin } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Admin() {
  const allRestaurantsAdmin = useSelector((state) => state.allRestaurantsAdmin);
  const allMenuItemsAdmin = useSelector((state)=> state.getAllMenuitemsAdmin)
  const allMenusAdmin = useSelector((state)=> state.allMenusAdmin)
  const allUsersAdmin = useSelector((state) => state.allUsersAdmin);
  const allOrdersAdmin = useSelector((state) => state.allOrdersAdmin)

  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestaurantsAdmin());
    dispatch(getAllMenuitemsAdmin());
    dispatch(getAllMenusAdmin());
    dispatch(getAllUsersAdmin())
    dispatch(getOrdersAdmin())
  }, [dispatch]);

  

  return (
    <div className="adminContainer">
      
        <Sidebar allUsersAdmin={allUsersAdmin} allRestaurantsAdmin={allRestaurantsAdmin} allMenuItemsAdmin={allMenuItemsAdmin} allMenusAdmin={allMenusAdmin} allOrdersAdmin={allOrdersAdmin}/>
      
    </div>
  );
}

export default Admin;

