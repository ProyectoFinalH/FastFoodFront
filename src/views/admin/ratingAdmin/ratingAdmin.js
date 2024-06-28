import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from '../../../Components/rating/starRating/starRating';
import { GetCommentAdmin } from '../../../Redux/actions';
import "./ratingAdmin.css"

function RatingAdmin() {
  const restaurants = useSelector((state) => state.allRestaurantsAdmin) || [];
  const comments = useSelector((state) => state.allCommentsAdmin) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCommentAdmin());
  }, [dispatch]);

  console.log("comments", comments);

  function truncate(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}


  return (
    <div>
      {restaurants?.map((restaurant) => (
        <div className='RatingRestContainer' key={restaurant?.key}>
            <div className='RatingRestContainerTitle'>

          <h2>{restaurant?.name}</h2>
            </div>
          {comments.filter((comment) => comment?.restaurant_name === restaurant?.name).length === 0 ? (
            <div className="noCommentsMessage">
              <p>No hay reseñas hechas.</p>
            </div>
          ) : (
            <ul>
              {comments
                .filter((comment) => comment?.restaurant_name === restaurant?.name)
                .map((comment) => (
                  <li key={comment?.id}>
                    <div className="commentUserContainer">
                      <div className="commentUser">
                        <div className="commentUserName">
                          <div className="commentImage">
                            <img src={comment?.user_image_url} alt="imageUser" />
                          </div>
                          <h2>{comment?.user_name}</h2>
                          <StarRating rating={comment?.rating} />
                        </div>
                        <div className="commentUserDate">
                          <p>{comment?.created_at.slice(0, 10)}</p>
                        </div>
                      </div>
                      <div className="commentUserComment">
                        <p title={comment.comment}>{truncate(comment.comment, 60)}</p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default RatingAdmin;