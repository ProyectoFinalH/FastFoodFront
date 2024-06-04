import {useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import "./detail.css";
import axios from "axios";
import Navbar from "../../Components/navbar/navbar";

function Detail() {
  const params = useParams();
  const [menuItem, setmenuItem] = useState({});
  const [cant, setCant] = useState(1);

const navigate = useNavigate()

  useEffect(() => {
    axios(`http://localhost:5000/menuitems/${params?.id}`)
      .then(({ data }) => {
        if (data?.id) {
          setmenuItem(data);
        }
      })
      .catch(() => {
        console.log("Error al ingresar al menuItem ");
      });
    return () => setmenuItem({});
  }, [params?.id]);

  const incrementCant = () => {
    setCant(cant + 1);
  };

  const decermentCant = () => {
    if (cant > 1) setCant(cant - 1);
  };

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="detailContainer">
      <Navbar/>
      <div className="detailCardContainer">
        <div className="imageDetail">
          <img src={menuItem?.image_url} alt={menuItem.name} />
        </div>
        <div className="cardDetail">
          <div className="titleDetail">
            <h2>{menuItem?.name}</h2>
            <h2>${menuItem?.price}</h2>
          </div>
          <p>{menuItem?.description}</p>
        </div>
        <div className="cantContainer">
          <h2>Unidades</h2>
          <div className="buttonDecInc">
            <button onClick={decermentCant}>-</button>
            <span> {cant} </span>
            <button onClick={incrementCant}>+</button>
          </div>
        </div>
        <div className="buttonContainer">
          <button>Agregar al carrito</button>
        </div>
        <div className="buttonContainer">
            <button onClick={handleGoBack}>Volver al menu</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
