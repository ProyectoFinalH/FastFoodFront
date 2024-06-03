/* eslint-disable react/prop-types */
import "./cardMenus.css";

function CardMenus({ id, name, handleSelectMenu }) {
  const handleClick = () => {
    handleSelectMenu(id);
  };

  return (
    <div>
      <div className="cardMenusContainer">
        <button className="buttonMenus" onClick={handleClick}>
          {name}
        </button>
      </div>
    </div>
  );
}

export default CardMenus;
