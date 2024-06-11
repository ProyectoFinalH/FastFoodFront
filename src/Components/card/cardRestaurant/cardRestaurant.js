
import "./cardRestaurant.css";

function CardRestaurant({id, name, description, image_url}) {

  // const restaurant1 = allRestaurants.find(restaurant => restaurant?.id === 2);

  return (
    <div className="cardResContainer">
      <div>
        <img src={image_url} alt="a3" />
      </div>
      <div className="textContainer">
        <h2 className="restaurantName">{name}</h2>
        <p className="restaurantType">{description}.</p>
        <div className="cardValoration">
          <h2>⭐5</h2>
        </div>
      </div>
    </div>
  );
}

export default CardRestaurant;