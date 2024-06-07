
import { useEffect, useState } from "react";
import "./detail.css";
import axios from "axios";


function Detail({ isOpen, handleCloseModal, menuItemId }) {
  
  

  const [menuItem, setmenuItem] = useState({});
  const [cant, setCant] = useState(1);
  
  

  useEffect(() => {
    if (menuItemId) {
      axios(`http://localhost:5000/menuitems/${menuItemId}`)
        .then(({ data }) => {
          if (data?.id) {
            setmenuItem(data);
          }
        })
        .catch(() => {
          console.log("Error al ingresar al menuItem");
        });
    }
  }, [menuItemId]);

  const incrementCant = () => {
    setCant(cant + 1);
  };

  const decermentCant = () => {
    if (cant > 1) setCant(cant - 1);
  };


  if (!isOpen || !menuItem) return null;
  return (
    
    <div className="detailContainer">
      <div className="detailCardContainer">
        <div className="buttonClose">

      <button onClick={handleCloseModal}>X</button>
        </div>
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
            <button onClick={handleCloseModal}>Volver al menu</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
