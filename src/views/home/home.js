import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar/navbar";
import { getAllRestaurants, login_user_localstorag } from "../../Redux/actions";
import CardsRestaurant from "../../Components/cards/cardsRestaurant/cardsRestaurant";
import Slider from "../../Components/slider";
import Image1 from "../../images/Image1.jpg";
import Image2 from "../../images/image2.jpg";
import Image3 from "../../images/image4.jpg";
import Footer from "../../Components/Footer/Footer";

import {
  obtenerEstatusUsuario,
  obtenerCorreoUsuario,
  obtenerNombreUsuario,
  obtenerIdUsuario,
} from "../../Components/Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
import Loading from "../../Components/loading/Loading";

const mockImages = [Image1, Image2, Image3];

function Home() {
  const allRestaurants = useSelector((state) => state.allRestaurants) || [];
  const user = useSelector((state) => state.USER);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedRestaurantId = null;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="homeContainer">
      {loading && <Loading />}
      <Navbar />
      <div className="sliderContainer">
        <Slider images={mockImages} />
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mt-8 ml-8">
        Restaurantes
      </h2>
      <div className="flex flex-wrap justify-center mt-8">
        <Link to={`/menu/${selectedRestaurantId}`}>
          <CardsRestaurant allRestaurants={allRestaurants} />
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
