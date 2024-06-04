import React from "react";
import Slider from "../../Components/slider";
import CardsRestaurant from "../../Components/cards/cardsRestaurant/cardsRestaurant";
import Image1 from "../../images/Image1.jpg";
import Image2 from "../../images/image2.jpg";
import Image3 from "../../images/image3.jpg";
import "./home.css";
import CardOpiniones from "../../Components/card/cardOpiniones/cardOpiniones";
import CardPagos from "../../Components/card/cardPagos/cardPagos";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Navbar from "../../Components/navbar/navbar";

const mockImges = [Image1, Image2, Image3];

function Home() {
  const User = useSelector((state) => state.USER);
  const navigate = useNavigate();
  useEffect(() => {
    if (!User) {
      navigate("/");
    }
  }, [User, navigate]);
  return (
    <div className="homeContainer">
      <Navbar />

      <Slider images={mockImges} />
      <div className="cardContainer">
        <div className="cardRestContainer">
          <Link to="/menu">
            <CardsRestaurant />
          </Link>
        </div>

        <div className="cardOtherContainer">
          <div className="cardOtherItem">
            <Link to="/opiniones">
              <CardOpiniones />
            </Link>
          </div>
          <div className="cardOtherItem">
            <Link to="/pagos">
              <CardPagos />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
