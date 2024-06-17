
import {
  getAllMenuitemsAdmin,
  getAllMenusAdmin,
} from "../../../Redux/actions";
import "./productsCompany.css"
import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsMenuItems from "../../../Components/cards/cardsMenuItems/cardsMenuItems";
import { Link } from 'react-router-dom';

function ProductsCompany() {
  const dispatch = useDispatch();
  const allMenuitems = useSelector((state) => state.getAllMenuitemsAdmin);
  const [selectMenuItem] = useState(null);

  useEffect(() => {
    dispatch(getAllMenusAdmin());
    dispatch(getAllMenuitemsAdmin());
  }, [dispatch]);

  let filteredMenuItems = [...allMenuitems];


  if (selectMenuItem) {
    filteredMenuItems = filteredMenuItems.filter(
      (menu) => menu.menu_id === selectMenuItem
    );
  }

  return (
    <div className="mainContainer">
      <div className="linktocreate">
        <Link to="/menu/create">
          <button>Crear Menu Item</button>
        </Link>
      </div>
      <div className="cardMenusContainer2">
        <CardsMenuItems AllMenuitems={filteredMenuItems} selectMenuItem={selectMenuItem} hideCartButtons={true} showEyeIcon={true} />
      </div>

    </div>
  )
}

export default ProductsCompany