import "./cardMenu.css";
import { Link } from "react-router-dom";

function CardMenu(id) {
  const { menuid, name, description, price, image } = id;

  return (
    <div className="cardMenuContainer">
      <Link to={`/menu/${menuid}`}>
        <img src={image} />
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{price}</p>
      </Link>
    </div>
  );
}

export default CardMenu;
