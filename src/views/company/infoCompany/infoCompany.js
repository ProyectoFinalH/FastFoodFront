
import "./infoCompany.css";

import DetailCompany from "../detailCompany/detailCompany";


function InfoCompany({restaurant}) {

  console.log ("este es el res info comp",restaurant)

  return (
    <div>
      <div className="h2Company">

      <h2>Informacion de tu empresa</h2>
      </div>
      <div className="infoCompanyContainerMain">
          <DetailCompany key={restaurant?.id} restaurant={restaurant} />
      </div>
    </div>
  );
}

export default InfoCompany;

