/* eslint-disable react/prop-types */
import "./cardMenus.css";

function CardMenus({ id, name, handleSelectMenu }) {
  const handleClick = () => {
    handleSelectMenu(id);
  };

  return (
    
      <div className="cardMenusContainer">
        <button className="buttonMenus" onClick={handleClick}>
          {name}
        </button>
      </div>

  );
}

export default CardMenus;
