import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./detail.css";
import axios from "axios";
import Navbar from "../../Components/navbar/navbar";
import carrito from '../../images/carrito.png'
import Carrito from "../../Components/Carrito/Carrito";

function Detail() {
  const [viewCard, setViewCard] = useState(false);
  const params = useParams();
  const [menuItem, setMenuItem] = useState({});
  const [cant, setCant] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menu item details
    axios(`http://localhost:5000/menuitems/${params?.id}`)
      .then(({ data }) => {
        if (data?.id) {
          setMenuItem(data);
          // Initialize cant from localStorage
          const storedData = localStorage.getItem(`card-${data.id}`);
          const parsedData = storedData ? JSON.parse(storedData) : null;
          if (parsedData) {
            setCant(parsedData.cont);
          }
        }
      })
      .catch(() => {
        console.log("Error al ingresar al menuItem ");
      });
    return () => setMenuItem({});
  }, [params?.id]);



  useEffect(() => {
    // Update localStorage whenever cant changes
    if (menuItem.id) {
      const storedData = localStorage.getItem(`card-${menuItem.id}`);
      const parsedData = storedData ? JSON.parse(storedData) : { ...menuItem, cont: cant };
      parsedData.cont = cant;
      localStorage.setItem(`card-${menuItem.id}`, JSON.stringify(parsedData));
    }
  }, [cant, menuItem]);




  
  const incrementCant = () => {
    setCant(cant + 1);
  };

  const decrementCant = () => {
    if (cant > 1) setCant(cant - 1);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleMenuCarrito =()=>{
    setViewCard(!viewCard)
    navigate('/menu')
    
  }


  return (
    <div className="detailContainer">
      <Navbar />
      {
        viewCard && <Carrito onClose={handleMenuCarrito} />
      }
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








          <div className="botones-flex">
            <div className="buttonDecInc-Menu">
              <label className="aumentardisminuir" onClick={decrementCant}>
                -
              </label>
              <input
                className="inputcard"
                type="text"
                value={cant}
                disabled
              />
              <label className="aumentardisminuir" onClick={incrementCant/*handleSumar*/}>
                +
              </label>
              </div>
              <img
                src={carrito}
                title="Ve Al Carrito"
                alt="Carrito"
                className="aumentardisminuir"
                onClick={handleMenuCarrito/*handleMenuCarrito*/}
              />
            </div>
         {/* <div className="buttonDecInc">
            <button onClick={decrementCant}>-</button>
            <span> {cant} </span>
            <button onClick={incrementCant}>+</button>
          </div>*/}
        </div>
        
        <div className="buttonContainer">
          <button onClick={handleGoBack}>Volver al menú</button>
        </div>

        
      </div>
    </div>
  );
}

export default Detail;
