/* eslint-disable react/prop-types */

import "./cardMenuItems.css";
// import { Link } from "react-router-dom";


function CardMenuItems({ id, name, description, price, image, handleSelectMenuItem  }) {

const handleClick = () => {
  handleSelectMenuItem(id);
};

return (
  <div className="cardMenuContainer" onClick={handleClick}>
      <img alt="imagemenuitems" src={image} className="cardImage" />
      <div className="cardContent">
        <h2 className="cardTitle">{name}</h2>
        <p className="cardDescription">{description}</p>
        <h2 className="cardPrice">${price}</h2>
      </div>
    </div>
  );
}


export default CardMenuItems;
