import { PutComents, getCommentsCompany } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import activar from "../../../images/activar.png";
import desactivar from "../../../images/desactivar.png";

import "./commentsCompany.css"
import StarRating from "../../../Components/rating/starRating/starRating";


function CommentsCompany() {
    const dispatch = useDispatch();
    const allComents = useSelector((state) => state.commentsCompany);
    console.log("comentarios", allComents);

    useEffect(() => {
        dispatch(getCommentsCompany());
    }, [dispatch]);

    
  const toggleActivation = async (id, isActive) => {
    try {
      if (!id) {
        console.error("El id del comentario es incorrecto");
        return;
      }
      await dispatch(PutComents(id, isActive));
      dispatch(getCommentsCompany());
    } catch (error) {
      console.error("Error al cambiar el estado del comentario:", error);
    }
  };
    function truncate(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    if (!allComents) {
        return <div>Cargando comentarios...</div>; // Manejo de carga inicial si es necesario
      }

    return (
        <div className="commentsCompany">
<div className="restaurantH2">
        <h2>Comentarios</h2>
      </div>
        <div className="RatingContainer">

        <ul>
            {allComents
            .map((comment) => (
              <li key={comment?.id}>
                <div className={`RatingRestContainerCompany ${comment?.active ? "" : "inactive"}`}>
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
                    <p title={comment?.comment}>{truncate(comment?.comment, 60)}</p>
                  </div>
                <div className="buttonComentariosCompany">
            <button
              className="buttonactdesMenus"
              onClick={() =>
                toggleActivation(comment?.id , !comment.active)
              }
            >
              {comment?.active ? (
                <img src={activar} alt="activar" />
              ) : (
                <img src={desactivar} alt="desactivar" />
              )}
            </button>
          </div>
                </div>
              </li>
              
            ))}
        </ul>
        </div>
    </div>
    );
}

export default CommentsCompany