
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "./cardRestaurant.css";

function CardRestaurant({ id, name, description, image_url, rating }) {
  return (
    <div className="cardResContainer">
      <div>
        <img src={image_url} alt={name} />
      </div>
      <div className="textContainer">
        <h2 className="restaurantName">{name}</h2>
        <div>
          <div className="ratingContainer">
            <h3>
              <FontAwesomeIcon icon={faStar}/>
            </h3>
            <p>
              {parseInt(rating)}
            </p>
          </div>
        </div>
      </div>
      <p className="restaurantType">{description}.</p>
    </div>
  );
}

export default CardRestaurant;
