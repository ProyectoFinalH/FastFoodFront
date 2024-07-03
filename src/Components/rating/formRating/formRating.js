import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PostComment } from "../../../Redux/actions";

import StarRating from "../starRating/starRating";

function FormRating({ userId, restaurantId, orderId, onClose, Listado }) {
  const dispatch = useDispatch();

  const [commentInput, setCommentInput] = useState({
    user_id: userId,
    restaurant_id: restaurantId,
    order_id: orderId,
    comment: "",
    rating: "",
  });

  console.log("rest", restaurantId);
  console.log("rest", restaurantId);

  const handleChange = (e) => {
    setCommentInput({
      ...commentInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (rating) => {
    setCommentInput({
      ...commentInput,
      rating: rating.toString(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.comment || commentInput.rating === "") {
      console.error("Algunos campos están sin definir");
      return;
    }
    dispatch(PostComment(commentInput));

    setCommentInput({
      user_id: userId,
      restaurant_id: restaurantId,
      order_id: orderId,
      comment: "",
      rating: "",
    });
    onClose();
  };

  const handleCloseModal = (e) => {
    // Verificar si el clic ocurrió dentro del modal-content
    if (e.target.classList.contains("form-rating-modal")) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleCloseModal}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-2xl hover:text-red-500 focus:outline-none"
        >
          &times;
        </button>
        <button
          onClick={handleCloseModal}
        >
        </button>
        <h2 className="text-xl font-semibold mb-4">Calificar Orden</h2>
        <div className="mb-4">
          {Listado.filter((order) => order.id === orderId).map((order) => (
            <div key={order.id} className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="font-semibold">Orden Número: {order.id}</p>
              <p>Restaurante: {order.restaurant_name}</p>
              <p>Total: ${order.total_price}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block font-semibold mb-2">
              Haz tu comentario:
            </label>
            <input
              name="comment"
              value={commentInput.comment}
              onChange={handleChange}
              placeholder="Escribe tu comentario"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">
              Selecciona tu calificación:
            </label>
            <StarRating
              rating={parseInt(commentInput.rating)}
              onChange={handleRatingChange}
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-green-400"
          >
            Enviar comentario
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormRating;
