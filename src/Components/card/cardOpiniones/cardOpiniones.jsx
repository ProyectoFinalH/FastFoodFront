import imgOpiniones from "../../../images/imageOpiniones.jpg"
import "./cardOpiniones.css"


function CardOpiniones() {
  return (
    <div className="cardPagosContainer">
    <div>
      <img src={imgOpiniones}/>
      </div>
      <div>
      <h2>Opiniones</h2>
      <p>Contanos como fue tu experiencia</p>
      </div>
  </div>
  )
}

export default CardOpiniones