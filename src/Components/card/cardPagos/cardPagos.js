import imgpagos from "../../../images/imagePagos.jpg"
import "./cardPagos.css"

function CardPagos() {
  return (
    <div className="cardPagosContainer">
    <div>
      <img src={imgpagos} alt="a1"/>
      </div>
      <div className="textContainer">
      <h2>Metodos de pago</h2>
      <p>Descubre todas las Opciones</p>
      </div>
  </div>
  )
}

export default CardPagos