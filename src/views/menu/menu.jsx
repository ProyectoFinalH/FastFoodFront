
import CardsMenu from "../../Components/cards/cardsMenu/cardsMenu"
import NavbarMenu from "../../Components/navbarMenu/navbarMenu"
import "./menu.css"

function Menu() {
  return (
    <div className="menuContainer">
      <NavbarMenu/>
      <CardsMenu/>
    </div>
  )
}

export default Menu