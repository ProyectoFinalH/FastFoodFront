import Sidebar from "./sidebar/sidebar"
import logo from "../../images/logo.png"
import "./company.css"


import { getAllRestaurants } from "../../Redux/actions"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


function Company() {


const allRestaurants = useSelector((state)=> state.allRestaurants)

console.log("Datos de todos los restaurantes:", allRestaurants);

  const dispatch = useDispatch();



useEffect(()=>{
  dispatch(getAllRestaurants())
},[dispatch])

  


  const restaurant = allRestaurants && allRestaurants?.length > 0 ? allRestaurants[0] : null;
    
  console.log ("este es el res company",restaurant)


  return (
    <div className="companyContainer">
<div className="navbarCompany">
  <img src={logo} alt="logo"/>
</div>
<div>
  <Sidebar restaurant={restaurant}/>

</div>
    </div>
  )
}

export default Company