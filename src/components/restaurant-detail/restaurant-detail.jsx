import React, { useState } from 'react';
import StarRating from './StarRating'; // Ajusta la ruta según tu estructura de carpetas

const RestaurantDetails = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    // Aquí puedes enviar la calificación al servidor o realizar otras acciones necesarias
  };

  return (
    <div className="restaurant-details">
      {/* Otras secciones del restaurante */}
      <StarRating rating={rating} onStarClick={handleStarClick} />
    </div>
  );
};

export default RestaurantDetails;