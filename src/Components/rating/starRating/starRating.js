import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './starRating.css';

const StarRating = ({ rating, onChange }) => {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (star) => {
    if (onChange) {
      onChange(star);
    }
  };


  return (
    <div className="star-rating">
      {stars.map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          className={star <= rating ? 'star filled' : 'star'}
          
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;