import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = ({ rating, onChange }) => {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (star) => {
    if (onChange) {
      onChange(star);
    }
  };

  return (
    <div className="flex space-x-1 text-xl my-5 w-36">
      {stars.map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          className={
            star <= rating
              ? "text-yellow-500 cursor-pointer"
              : "text-gray-400 cursor-pointer"
          }
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
