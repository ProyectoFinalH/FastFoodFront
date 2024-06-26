import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetComment } from "../../Redux/actions";

import "./rating.css";
import StarRating from "./starRating/starRating";

function Rating({onClose, restaurantId}) {
  const comments = useSelector((state) => state.allComments) || [];;
  const dispach = useDispatch();

  console.log("id en raiting", restaurantId);

  useEffect(() => {
    dispach(GetComment(restaurantId));
  }, [dispach, restaurantId]);

  console.log("commentsss",comments);

  const handleCloseModal = (e) => {
    // Verificar si el clic ocurrió dentro del modal-content
    if (e.target.classList.contains("ratingsContainer")) {
      onClose();
    }
  };

  return (
    <div className="ratingsContainer" onClick={handleCloseModal}>
      <div className="ratingModal">
        <div className="modalRating">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Comentarios y Opiniones</h2>
          <div className="CommentsContainer">

          <ul>
            {Array.isArray(comments) &&
            
            comments?.map((comment) => (
              
              <li key={comment?.id}>
                <div className="commentUserContainer">

                <div className="commentUser" >
                  <div className="commentUserName">
                <div className="commentImage">
                <img src={comment?.user_image_url} alt="imageUser"/>
                </div>

                <h2>{comment?.user_name}</h2>
                
                <StarRating rating={comment?.rating} />
                  </div>
                  <div className="commentUserDate">
                    <p>{comment.created_at.slice(0,10)}</p>
                  </div>
                </div>
                  <div className="commentUserComment">

                <p>{comment?.comment}</p>
                  </div>

              
              </div>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
