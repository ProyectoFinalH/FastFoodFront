import Slider from "../../Components/slider";
import CardsRestaurant from "../../Components/cards/cardsRestaurant/cardsRestaurant";
import Image1 from "../../images/Image1.jpg";
import Image2 from "../../images/image2.jpg";
import Image3 from "../../images/image3.jpg";
import "./home.css";
import CardOpiniones from "../../Components/card/cardOpiniones/cardOpiniones";
import CardPagos from "../../Components/card/cardPagos/cardPagos";
import { Link } from "react-router-dom";

const mockImges = [Image1, Image2, Image3];

function Home() {
  return (
    <div className="homeContainer">
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
