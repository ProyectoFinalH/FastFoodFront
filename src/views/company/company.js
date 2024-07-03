import Sidebar from "./sidebar/sidebar"

import "./company.css"


import { getAllRestaurants, Create_Lista_Order_Company} from "../../Redux/actions"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../Components/loading/Loading";



function Company() {
  const Restaurant = useSelector((state)=> state.Detail_Empresa)
  const [loading, setLoading] = useState(true);
  console.log("Datos de todos los restaurantes:", Restaurant);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllRestaurants());
    dispatch(Create_Lista_Order_Company());
  }, [dispatch]);
  
  // const restaurant = Restaurant;

// useEffect(()=>{
//   dispatch(getAllRestaurants())
//   dispatch(Create_Lista_Order_Company())
// },[dispatch])

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2000);

  return () => clearTimeout(timer);
}, []);

  return (
    <div className="companyContainer">
      {loading && <Loading />}

<div>
  <Sidebar restaurant={Restaurant}/>

</div>
    </div>
  )
}

export default Company