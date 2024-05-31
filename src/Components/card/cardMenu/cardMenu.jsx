import "./cardMenu.css"
import { Link } from "react-router-dom"

function CardMenu(id) {
  return (
    <div className="cardMenuContainer">
      <Link to={`${id}`}>
        <img/>
        <h2>NombreComida</h2>
        <p>DetalleComida</p>
        <p>Precio</p>
        </Link>
    </div>
  )
}

export default CardMenu