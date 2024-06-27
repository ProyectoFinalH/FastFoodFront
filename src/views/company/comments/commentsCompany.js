import { getCommentsCompany } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import activar from "../../../images/activar.png";
// import desactivar from "../../../images/desactivar.png";

import "./commentsCompany.css"
import StarRating from "../../../Components/rating/starRating/starRating";


function CommentsCompany() {
    const dispatch = useDispatch();
    const allComents = useSelector((state) => state.commentsCompany);
    console.log("comentarios", allComents);

    useEffect(() => {
        dispatch(getCommentsCompany());
    }, [dispatch]);

    // const toggleActivation = async (id) => {
    //     try {
    //       if (!id) {
    //         console.error("El id del restaurante es incorrecto");
    //         return;
    //       }
    //       await dispatch(PutComents(id));
    //     } catch (error) {
    //       console.error("Error al cambiar el estado del comentario:", error);
    //     }
    //   };

    function truncate(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    return (
        <div className="commentsCompany">

        <h1>Comentarios & Reviews</h1>
        <div className="">

        <ul>
            {allComents
            .map((comment) => (
              <li key={comment?.id}>
                <div className="RatingRestContainerCompany">
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
                <div>
            {/* <button
              className="buttonactdesMenus"
              onClick={() =>
                toggleActivation(comment?.id)
              }
            >
              {comment?.active ? (
                <img src={activar} alt="activar" />
              ) : (
                <img src={desactivar} alt="desactivar" />
              )}
            </button> */}
          </div>
              </li>
              
            ))}
        </ul>
        </div>
    </div>
    );
}

export default CommentsCompany