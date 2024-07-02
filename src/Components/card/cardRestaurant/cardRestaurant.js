import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function CardRestaurant({ id, name, description, image_url, rating }) {
  return (
    <div className="bg-white text-left shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform duration-200 w-72 h-72 m-2">
      <div>
        <img
          src={image_url}
          alt={name}
          className="object-cover w-full h-40 rounded-t-lg"
        />
      </div>
      <div className="p-2 flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <div className="flex items-center text-yellow-500">
          <FontAwesomeIcon icon={faStar} />
          <p className="ml-1">{parseInt(rating)}</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm p-2">{description}</p>
    </div>
  );
}

export default CardRestaurant;
