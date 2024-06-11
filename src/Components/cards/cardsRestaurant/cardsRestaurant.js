import CardRestaurant from "../../card/cardRestaurant/cardRestaurant";
import "./cardsRestaurant.css"


function CardsRestaurant({allRestaurants}) {
  return (
    <div className="CardsRestContainer">

      {allRestaurants &&
        allRestaurants.map((restaurant) => (
          <div key={restaurant?.id}>
          <CardRestaurant 
          id={restaurant?.id}
          name={restaurant?.name}
          description={restaurant?.description}
          image_url={restaurant?.image_url}/>
      </div>
        ))}
    </div>
  );
}

export default CardsRestaurant;
