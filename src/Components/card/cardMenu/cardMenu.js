import "./cardMenu.css";
import { Link } from "react-router-dom";

function CardMenu(id) {
  const { menuid, name, description, price, image } = id;

  return (
    <div className="cardMenuContainer">
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 9d718f527bdd3378ef15a8d13efe39ddccc0f51e


<Link to={`/menu/${menuid}`}>
        <img alt="" src={image}/>
<<<<<<< HEAD
=======
      <Link to={`/menu/${menuid}`}>
        <img src={image} />
>>>>>>> 949b771ca44da142f521eed8a9c4fa7731bda5f8
=======

>>>>>>> 9d718f527bdd3378ef15a8d13efe39ddccc0f51e
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{price}</p>
      </Link>
    </div>
  );
}

export default CardMenu;
