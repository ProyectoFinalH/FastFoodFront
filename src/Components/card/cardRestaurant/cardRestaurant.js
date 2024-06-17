import React from "react";
import "./cardRestaurant.css";

function CardRestaurant({ id, name, description, image_url }) {
  return (
    <div className="cardResContainer">
      <div>
        <img src={image_url} alt={name} />
      </div>
      <div className="textContainer">
        <h2 className="restaurantName">{name}</h2>
        <div className="cardValoration">
          <h2>⭐5</h2>
        </div>
      </div>
      <p className="restaurantType">{description}.</p>
    </div>
  );
}

export default CardRestaurant;
