import { getCommentsCompany } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import "./commentsCompany.css"


function CommentsCompany() {
    const dispatch = useDispatch();
    const allComents = useSelector((state) => state.commentsCompany);
    console.log("comentarios", allComents);

    useEffect(() => {
        dispatch(getCommentsCompany());
    }, [dispatch]);

    function truncate(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    return (
        <div className="commentsCompany">

            <h1>Comentarios & Reviews</h1>

            <div className="tableContainer">
                <table className="styled-table2">
                    <thead>
                        <tr>

                            <th className="table-header">Comentario No.</th>

                            <th className="table-header">Usuario</th>
                            <th className="table-header-comment"> Comentario</th>
                            <th className="table-header">Calificación</th>
                            <th className="table-header">Fecha de creación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allComents.map((comment) => (
                            <tr key={comment.id}>
                                <td>{comment.id}</td>
                                <td>{comment.user_name}</td>
                                <td title={comment.comment}>{truncate(comment.comment, 60)}</td>
                                <td>{comment.rating}/5</td>
                                <td>{comment.created_at.substr(0, 19)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CommentsCompany