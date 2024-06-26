
import {
  getAllMenuitemsCompany,
  getAllMenusCompany,
} from "../../../Redux/actions";
import "./productsCompany.css"
import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsMenuItems from "../../../Components/cards/cardsMenuItems/cardsMenuItems";
import ReactModal from 'react-modal';
import CreateMenuItem from "../../../Components/createMenu/createMenuItem";

function ProductsCompany() {
  const dispatch = useDispatch();
  const allMenuitems = useSelector((state) => state.menuItemsCompany);
  const [selectMenuItem] = useState(null);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);

  useEffect(() => {
    dispatch(getAllMenusCompany());
    dispatch(getAllMenuitemsCompany());
  }, [dispatch]);

  let filteredMenuItems = [...allMenuitems];


  if (selectMenuItem) {
    filteredMenuItems = filteredMenuItems?.filter(
      (menu) => menu?.menu_id === selectMenuItem
    );
  }

  return (
    <div className="mainContainer">
      <div className="linktocreate">
        <ReactModal
          isOpen={showCreateCategoryModal}
          onRequestClose={() => setShowCreateCategoryModal(false)}
          className="custom-modal2"
        >
          <CreateMenuItem />
          <button className="custom-modal-button" onClick={() => setShowCreateCategoryModal(false)}>X</button>
        </ReactModal>
        <button onClick={() => setShowCreateCategoryModal(true)}>Crear Producto</button>
      </div>
      <div className="cardMenusContainer2">
        <CardsMenuItems AllMenuitems={filteredMenuItems} selectMenuItem={selectMenuItem} hideCartButtons={true} showEyeIcon={true} />
      </div>

    </div>
  )
}

export default ProductsCompany