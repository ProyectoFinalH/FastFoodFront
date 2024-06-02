import React from 'react';

const StarRating = ({ rating, onStarClick }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''}`}
          onClick={() => onStarClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;