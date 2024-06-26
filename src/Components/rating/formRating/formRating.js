
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PostComment } from '../../../Redux/actions';
import "./formRating.css"
import StarRating from '../starRating/starRating';

function FormRating({ userId, restaurantId, orderId, onClose, Listado }) {
  const dispatch = useDispatch();

  const [commentInput, setCommentInput] = useState({
    user_id: userId,
    restaurant_id: restaurantId,
    order_id: orderId,
    comment: '',
    rating: '',
  });

  console.log("rest",restaurantId);
  console.log("rest",restaurantId);

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
    if (
      !commentInput.comment ||
      commentInput.rating === ''
    ) {
      console.error('Algunos campos están sin definir');
      return;
    }
    dispatch(PostComment(commentInput));

    setCommentInput({
      user_id: userId,
      restaurant_id: restaurantId,
      order_id: orderId,
      comment: '',
      rating: '',
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
    <div className="form-rating-modal" onClick={handleCloseModal}>
      <div className="form-rating-container">
        <button onClick={onClose}>x</button>
        <h2>Calificar Orden</h2>
        <div className="order-info">
        {Listado.filter((order) => order.id === orderId).map((order) => (
          <div key={order.id} className="order-card">
            <p>Orden Número: {order.id}</p>
            <p>Restaurante: {order.restaurant_name}</p>
            <p>Total: ${order.total_price}</p>
          </div>
        ))}
      </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Haz tu comentario:</label>
            <input
              name="comment"
              value={commentInput.comment}
              onChange={handleChange}
              placeholder="Escribe tu comentario"
              type="text"
            />
          </div>
          <div className="form-group">
            <label>Selecciona tu calificación:</label>
            <StarRating rating={parseInt(commentInput.rating)} onChange={handleRatingChange} />
          </div>
          <button type="submit">Enviar comentario</button>
        </form>
      </div>
    </div>
  );
}

export default FormRating;