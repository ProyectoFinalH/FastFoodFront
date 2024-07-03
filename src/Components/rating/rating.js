import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetComment } from "../../Redux/actions";
import StarRating from "./starRating/starRating";

function Rating({ onClose, restaurantId }) {
  const comments = useSelector((state) => state.allComments) || [];
  const dispach = useDispatch();

  console.log("id en raiting", restaurantId);

  useEffect(() => {
    dispach(GetComment(restaurantId));
  }, [dispach, restaurantId]);

  console.log("commentsss", comments);

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("ratingsContainer")) {
      onClose();
    }
  };

  function truncate(text, maxLength) {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  const activeComments = comments.filter((comment) => comment.active);

  return (
    <div
      className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleCloseModal}
    >
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md w-[120vh] animate-modal ">
        <div className="relative overflow-x-hidden h-[70vh] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
          <button
            className="absolute top-2 right-4 text-gray-600 hover:text-primary"
            onClick={onClose}
          >
            <span className="text-2xl">&times;</span>
          </button>
          <h2 className="text-xl font-bold absolute top-2 left-4">
            Comentarios y Opiniones
          </h2>
          <div className="p-4 mt-12">
            {activeComments.length === 0 ? (
              <div className="py-4">
                <p className="text-gray-600">No hay reseñas activas.</p>
              </div>
            ) : (
              <ul className="list-none p-0">
                {activeComments.map((comment) => (
                  <li
                    key={comment.id}
                    className="border-b border-gray-200 my-5"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20">
                          <img
                            src={comment.user_image_url}
                            alt="imageUser"
                            className="object-cover w-full h-full rounded-full"
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h2 className="text-lg font-semibold text-gray-800">
                              {comment.user_name}
                            </h2>
                            <p className="text-gray-600 text-sm">
                              {comment.created_at.slice(0, 10)}
                            </p>
                          </div>
                          <p className="text-gray-700 mt-2">
                            {truncate(comment.comment, 60)}
                          </p>
                          <div className="flex items-center mt-2">
                            <StarRating rating={comment.rating} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
