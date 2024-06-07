import {
  getAllMenuitems,
  getAllMenus,
} from "../../../Redux/actions";
import "./productsCompany.css"
import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsMenuItems from "../../../Components/cards/cardsMenuItems/cardsMenuItems";
import { Link } from 'react-router-dom';

function ProductsCompany() {
  const dispatch = useDispatch();
  const allMenus = useSelector((state) => state.allMenus);
  const allMenuitems = useSelector((state) => state.allMenuItems);
  const [selectMenuItem, setSelectMenuItem] = useState(null);

  useEffect(() => {
    dispatch(getAllMenus());
    dispatch(getAllMenuitems());
  }, [dispatch]);
  
  let filteredMenuItems = [...allMenuitems];

  console.log("este son los menu", allMenus);
  
  if (selectMenuItem) {
    filteredMenuItems = filteredMenuItems.filter(
      (menu) => menu.menu_id === selectMenuItem
    );
  }

  return (
    <div className="mainContainer">ProductsCompany
      <Link to="/menu/create">
      <button>Crear Menu</button>
      </Link>
      <div className="cardMenusContainer2">
      <CardsMenuItems AllMenuitems={filteredMenuItems} selectMenuItem={selectMenuItem} />
        </div>


    </div>
  )
}

export default ProductsCompany