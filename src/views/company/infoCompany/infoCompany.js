import "./infoCompany.css";

import DetailCompany from "../detailCompany/detailCompany";


function InfoCompany({allRestaurants}) {


  return (
    <div>
      <h2>Informacion de tu empresa</h2>
      <div className="infoCompanyContainer">
      {allRestaurants.map((restaurant) => (
          <DetailCompany key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default InfoCompany;
