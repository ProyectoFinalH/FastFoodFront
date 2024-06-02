import imgRest from "../../../images/imageRestaurant.png"
import "./cardRestaurant.css"


function CardRestaurant() {
  return (
    <div className="cardResContainer">
      <div>
        <img src={imgRest}/>
        </div>
        <div className="textContainer">

        <h1>EL CORRAL</h1>
        <p>Comida Rapida</p>
        <div className="cardValoration">
        <h2 >⭐5</h2>
        </div>
        </div>
    </div>
  )
}

export default CardRestaurant