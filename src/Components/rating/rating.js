import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetComment } from "../../Redux/actions";

import "./rating.css";

function Rating({onClose}) {
  const comments = useSelector((state) => state.allComents);
  const dispach = useDispatch();
  const restaurant_id = 1;

  useEffect(() => {
    dispach(GetComment(restaurant_id));
  }, [dispach, restaurant_id]);

  console.log(comments);

  const handleCloseModal = (e) => {
    // Verificar si el clic ocurrió dentro del modal-content
    if (e.target.classList.contains("ratingsContainer")) {
      onClose();
    }
  };

  return (
    <div className="ratingsContainer" onClick={handleCloseModal}>
      <div className="ratingModal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Comentarios del Restaurante</h2>
          <ul>
            {comments?.map((comment) => (
              <li key={comment?.id}>
                <strong>{comment?.user_name}</strong>: {comment?.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Rating;
