import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import { getAllRestaurants, login_user_localstorag } from "../../Redux/actions";
import CardsRestaurant from "../../Components/cards/cardsRestaurant/cardsRestaurant";
// import CardOpiniones from "../../Components/card/cardOpiniones/cardOpiniones";
// import CardPagos from "../../Components/card/cardPagos/cardPagos";
import Slider from "../../Components/slider";
import Image1 from "../../images/Image1.jpg";
import Image2 from "../../images/image2.jpg";
import Image3 from "../../images/image3.jpg";
import "./home.css";
import Footer from "../../Components/Footer/Footer";

import {
  obtenerEstatusUsuario,
  obtenerCorreoUsuario,
  obtenerNombreUsuario,
  obtenerIdUsuario,
} from "../../Components/Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
import Maintenance from "../maintenance/maintenance";

const mockImages = [Image1, Image2, Image3];

function Home() {
  const allRestaurants = useSelector((state) => state.allRestaurants);
  const user = useSelector((state) => state.USER);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedRestaurantId = null //allRestaurants[0]?.id;

  useEffect(() => {
    dispatch(getAllRestaurants());

    if (!user) {
      navigate("/");
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    const email = obtenerCorreoUsuario();

    if (email) {
      const tem_Users = {
        state: obtenerEstatusUsuario(),
        id: obtenerIdUsuario(),
        email: email,
        name: obtenerNombreUsuario(),
      };
      dispatch(login_user_localstorag(tem_Users));
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  if (!allRestaurants || allRestaurants.length === 0) {
    return <Maintenance />;
  }

  return (
    <div className="homeContainer">
      <Navbar />
      <div className="sliderContainer">
        <Slider images={mockImages} />
      </div>
      <div className="Restaurantes">
        <h2>Restaurantes</h2>
      </div>
      <div className="cardContainer">
        <div className="cardRestContainer">
        <Link to={`/menu/${selectedRestaurantId}`}>
      
            <CardsRestaurant allRestaurants={allRestaurants} />
          </Link>
        </div>
      </div>
      {/* <div className="otherContent">
        <div>
          <h2 className="conoceMasTitle">Conocé más!</h2>
          <div className="cardOtherItems1">
            <Link to="/reviews">
              <CardOpiniones />
            </Link>
            <Link to="/pagos">
              <CardPagos />
            </Link>
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
}

export default Home;
