import {
  getAllMenuitems,
  getAllMenus,
  getMenuItemsByName,
} from "../../Redux/actions";
// import { getAllRestaurants, getAllCategories, } from "../../redux/actions"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardsMenuItem from "../../Components/cards/cardsMenuItems/cardsMenuItems";
import NavbarMenu from "../../Components/navbarMenu/navbarMenu";
import "./menu.css";
import CardsRestaurant from "../../Components/cards/cardsRestaurant/cardsRestaurant";
import CardsMenus from "../../Components/cards/cardsMenus/cardsMenus";
import Navbar from "../../Components/navbar/navbar";

function Menu() {
  const dispatch = useDispatch();

  // const allRestaurant = useSelector((state)=> state.allRestaurant)
  const allMenus = useSelector((state) => state.allMenus);
  const allMenuitems = useSelector((state) => state.allMenuItems);
  const [selectMenuItem, setSelectMenuItem] = useState(null);
  // const allCategories = useSelector((state)=> state.allCategories)

  const [searchString, setSearchString] = useState("")
  const [sortBy, setSortBy] = useState(null);
  const [priceRange, setPriceRange] = useState("");



  useEffect(() => {
    // dispatch(getAllRestaurants())
    dispatch(getAllMenus());
    dispatch(getAllMenuitems());
    // dispatch(getAllCategories())
  }, [dispatch]);


  const applyPriceRangeFilter = (menuItems, range) => {
    const [min, max] = range.split("-").map(Number);
    return menuItems.filter((menu) => menu.price >= min && menu.price <= max);
  };

  console.log("este son los menu",allMenus)
  function handleChange (e) {
    setSearchString(e.target.value)

  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getMenuItemsByName(searchString));
  }

  // useEffect(()=>{
  //   let filterMenuItem = allMenuitems.slice();

  //   if(searchString.trim() !== ""){
  //     filterMenuItem = filterMenuItem.filter((menuItem) => {
  //       menuItem.name.toLowerCase().includes(searchString.toLowerCase())
  //     })

  //   }
  //   setSelectMenuItem(filterMenuItem)
  // }, [allMenuitems, searchString])
  


 const handleSelectMenu = (menuItem) => {

  setSelectMenuItem((prevId) => (prevId === menuItem ? null : menuItem))
 } 
 
 let filteredMenuItems = selectMenuItem
 ? allMenuitems.filter((menu) => menu.menu_id === selectMenuItem)
 : allMenuitems;

 const handleSort = (sortBy) => {
  setSortBy(sortBy);

}

if (sortBy === "menorPrecio") {
  filteredMenuItems = filteredMenuItems.sort((a, b) => a.price - b.price);
} else if (sortBy === "mayorPrecio") {
  filteredMenuItems = filteredMenuItems.sort((a, b) => b.price - a.price);
}

const handlePriceRange = (range) => {
  setPriceRange(range);
 };

 if (priceRange) {
  filteredMenuItems = applyPriceRangeFilter(filteredMenuItems, priceRange);
}

console.log("1-30",filteredMenuItems)

if (searchString.trim() !== "") {
  filteredMenuItems = filteredMenuItems.filter((menuItem) =>
    menuItem.name.toLowerCase().includes(searchString.toLowerCase())
  );
}

  return (
    <div className="menuContainer">
      <Navbar />
      <div className="menuSupContainer">
        <div className="cardRestContainer">
          <CardsRestaurant />
        </div>
        <div className="cardMenusContainer">
          <CardsMenus AllMenus={allMenus} handleSelectMenu={handleSelectMenu} />
        </div>
      </div>
      <div className="navCardContainer">

      <NavbarMenu handleChange={handleChange} handleSubmit={handleSubmit} handleSort={handleSort} handlePriceRange={handlePriceRange}/>
      <CardsMenuItem AllMenuitems = {filteredMenuItems} selectMenuItem={selectMenuItem}/>
      

      </div>
    </div>
  );
}

export default Menu;
