import React, { useEffect } from "react";
import "./menusAdmin.css";
import NavbarAdmin from "../navbarAdmin/navbarAdmin";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllMenuitemsAdmin,
  getAllMenusAdmin,
  getAllRestaurantsAdmin,
} from "../../../Redux/actions";
import MenusRestAdmin from "./ComponenteRestMenuAdmin";

function MenusAdmin() {
  const allRestaurantsAdmin = useSelector((state) => state.allRestaurantsAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMenuitemsAdmin());
    dispatch(getAllMenusAdmin());
    dispatch(getAllRestaurantsAdmin());
  }, [dispatch]);



  return (
    <div className="">
      <NavbarAdmin />
      {allRestaurantsAdmin.map((restaurant) => (
        <MenusRestAdmin key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default MenusAdmin;