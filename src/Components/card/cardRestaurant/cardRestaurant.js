import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function CardRestaurant({ id, name, description, image_url, rating }) {
  return (
    <div className="bg-white text-left shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform duration-200 w-96 h-96 m-4">
      <div>
        <img
          src={image_url}
          alt={name}
          className="object-cover w-full h-48 rounded-t-lg"
        />
      </div>
      <div className="p-4 flex justify-between items-start">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <div className="flex items-center text-yellow-500">
          <FontAwesomeIcon icon={faStar} />
          <p className="ml-1">{parseInt(rating)}</p>
        </div>
      </div>
      <p className="text-gray-600 text-base p-4">{description}</p>
    </div>
  );
}

export default CardRestaurant;
