import imgRest from "../../../images/imageRestaurant.png"
import "./cardRestaurant.css"


function CardRestaurant() {
  return (
    <div className="cardResContainer">
      <div>
        <img src={imgRest} alt="a3"/>
        </div>
        <div className="textContainer">
        <h2>EL CORRAL</h2>
        <p>Comida Rapida</p>
        <div className="cardValoration">
        <h2 >⭐5</h2>
        </div>
        </div>
    </div>
  )
}

export default CardRestaurant