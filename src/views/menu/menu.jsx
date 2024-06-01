import { getAllMenuitems,getAllMenus } from "../../redux/actions"
// import { getAllRestaurants, getAllCategories, } from "../../redux/actions"
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'

import CardsMenu from "../../Components/cards/cardsMenu/cardsMenu"
import NavbarMenu from "../../Components/navbarMenu/navbarMenu"
import "./menu.css"



function Menu() {

  const dispatch = useDispatch();

  // const allRestaurant = useSelector((state)=> state.allRestaurant)
  // const allMenus = useSelector((state)=> state.allMenus)
  const allMenuitems = useSelector((state)=> state.allMenuItems)
  // const allCategories = useSelector((state)=> state.allCategories)

  useEffect(()=>{
    // dispatch(getAllRestaurants())
    dispatch(getAllMenus())
    dispatch(getAllMenuitems())
    // dispatch(getAllCategories())
  },[dispatch])

  console.log("este son los menu",allMenuitems)



  return (
    <div className="menuContainer">
      <NavbarMenu/>
      <CardsMenu AllMenuitems = {allMenuitems}/>
    </div>
  )
}

export default Menu