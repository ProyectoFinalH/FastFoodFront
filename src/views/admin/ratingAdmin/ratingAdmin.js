import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "../../../Components/rating/starRating/starRating";
import { GetCommentAdmin } from "../../../Redux/actions";

function RatingAdmin() {
  const restaurants = useSelector((state) => state.allRestaurantsAdmin) || [];
  const comments = useSelector((state) => state.allCommentsAdmin) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCommentAdmin());
  }, [dispatch]);

  console.log("comments", comments);

  function truncate(text, maxLength) {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  return (
    <div className="OrdersAdminContainerPrincipal">
      <div className="restaurantH2">
        <h2>Calificaciones</h2>
      </div>
      {restaurants?.map((restaurant) => (
        <div className="RatingRestContainer" key={restaurant?.key}>
          <div className="perfilRestMenusAdmin">
            <img src={restaurant.image_url} alt="resLogo" />
            <h2>{restaurant.name}</h2>
          </div>
          {comments.filter(
            (comment) => comment?.restaurant_name === restaurant?.name
          ).length === 0 ? (
            <div className="noCommentsMessage">
              <p>No hay calificaciones hechas.</p>
            </div>
          ) : (
            <ul>
              {comments
                .filter(
                  (comment) => comment?.restaurant_name === restaurant?.name
                )
                .map((comment) => (
                  <li key={comment?.id}>
                    <div className="commentUserContainer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20">
                            <img
                              src={comment?.user_image_url}
                              alt="imageUser"
                              className="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h2 className="text-lg font-semibold text-gray-800">
                                {comment?.user_name}
                              </h2>
                              <p className="text-gray-600 text-sm">
                                {comment?.created_at.slice(0, 10)}
                              </p>
                            </div>
                            <p className="text-gray-700 mt-2">
                              {truncate(comment?.comment, 60)}
                            </p>
                            <div className="flex items-center mt-2">
                              <StarRating rating={comment?.rating} />
                            </div>
                          </div>
                        </div>
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
