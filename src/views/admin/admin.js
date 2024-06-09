import Sidebar from "./sidebar/sidebar";
// import logo from "../../images/logo.png"
import "./admin.css";

import { getAllMenuitems, getAllMenus, getAllRestaurants } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Admin() {
  const allRestaurants = useSelector((state) => state.allRestaurants);
  const allMenuItems = useSelector((state)=> state.allMenuItems)
  const allMenus = useSelector((state)=> state.allMenus)
  // const allUsers = useSelector((state) => state.allRestaurants);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
    dispatch(getAllMenuitems());
    dispatch(getAllMenus());
  }, [dispatch]);

  return (
    <div className="companyContainer">
      <div>
        <Sidebar allRestaurants={allRestaurants} allMenuItems={allMenuItems} allMenus={allMenus}/>
      </div>
    </div>
  );
}

export default Admin;
