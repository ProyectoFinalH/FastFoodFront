import imgRest from "../../../images/imageRestaurant.png"
import "./cardRestaurant.css"


function CardRestaurant() {
  return (
    <div className="cardResContainer">
      <div>
        <img src={imgRest}/>
        </div>
        <div>
        <h1>EL CORRAL</h1>
        <h3>Comida Rapida</h3>
        <h4>⭐5</h4>
        </div>
    </div>
  )
}

export default CardRestaurant