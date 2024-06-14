
import Slider from "../../Components/slider";
import CardsRestaurant from "../../Components/cards/cardsRestaurant/cardsRestaurant";
import Image1 from "../../images/Image1.jpg";
import Image2 from "../../images/image2.jpg";
import Image3 from "../../images/image3.jpg";
import "./home.css";
import CardOpiniones from "../../Components/card/cardOpiniones/cardOpiniones";
import CardPagos from "../../Components/card/cardPagos/cardPagos";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Navbar from "../../Components/navbar/navbar";
import { getAllRestaurants, login_user_localstorag} from "../../Redux/actions";

//import localUser from '../../Components/Login/Login_Ingreso/LocalStorange_user/LocalStorange_user'

import {
  obtenerEstatusUsuario,
  obtenerCorreoUsuario,
  obtenerNombreUsuario,
  obtenerIdUsuario,
} from "../../Components/Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";

const mockImges = [Image1, Image2, Image3];

function Home() {



  
  const allRestaurants = useSelector((state) => state.allRestaurants)
  const User = useSelector((state) => state.USER);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  /*localUser.guardarNombreUsuario(User.name)
  localUser.guardarCorreoUsuario(User.mail)
  localUser.guardarEstatusUsuario(User.state)
  localUser.guardarIdUsuario(User.id)
*/
  useEffect(() => {
    dispatch(getAllRestaurants());

    if (!User) {
      navigate("/");
    }
  }, [User, navigate, dispatch]);

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
      navigate('/menu');
    }else{
      navigate('/')
    }
  }, [dispatch, navigate]);





  return (
    <div className="homeContainer">
      <Navbar />
      <Slider images={mockImges} />
      <div className="cardContainer">
        <div className="cardRestContainer">
      <div>
        <h2>Restaurantes</h2>
        </div>
        <Link to="/menu">
          <CardsRestaurant allRestaurants={allRestaurants}
        />
          </Link>
        </div>
      <div>
        <div>

<h2>Conocé más!</h2>
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
     
    </div>
  );
}

export default Home;
