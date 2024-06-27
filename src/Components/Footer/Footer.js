import React from "react";
import "./Footer.css";
import foodCopiaImage from "./images/food copia.png";

const Footer = () => {
  const members = [
    {
      id: 1,
      name: "Jorge Cisneros",
      icon: "icon1",
      image: foodCopiaImage,
      // linkedin: "https://www.linkedin.com/in/jorge-cisneros/",
    },
    {
      id: 2,
      name: "Jose Rojas",
      icon: "icon2",
      image: foodCopiaImage,
      // linkedin: "https://www.linkedin.com/in/jose-rojas/",
    },
    {
      id: 3,
      name: "Julio Uribe",
      icon: "icon3",
      image: foodCopiaImage,
      // linkedin: "https://www.linkedin.com/in/julio-uribe/",
    },
    {
      id: 4,
      name: "Luis Buelvas",
      icon: "icon4",
      image: foodCopiaImage,
      // linkedin: "https://www.linkedin.com/in/luis-buelvas/",
    },
    {
      id: 5,
      name: "Miller Villamizar",
      icon: "icon5",
      image: foodCopiaImage,
      linkedin: "https://www.linkedin.com/in/miller-villa/",
    },
    {
      id: 6,
      name: "Daniel Navarro",
      icon: "icon6",
      image: foodCopiaImage,
      linkedin: "https://www.linkedin.com/in/danielnavarrozt/",
    },
  ];

  const handleMouseEnter = (id) => {
    const tooltip = document.getElementById(`tooltip-${id}`);
    if (tooltip) tooltip.style.display = "block";
  };

  const handleMouseLeave = (id) => {
    const tooltip = document.getElementById(`tooltip-${id}`);
    if (tooltip) tooltip.style.display = "none";
  };

  return (
    <footer className="footer">
      <div className="footer-header">
        <p>Equipo de Desarrollo</p>
      </div>
      <div className="icons-container">
        {members.map((member) => (
          <a
            key={member.id}
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-wrapper"
            onMouseEnter={() => handleMouseEnter(member.id)}
            onMouseLeave={() => handleMouseLeave(member.id)}
          >
            <img
              src={member.image}
              alt={member.name}
              className={`icon ${member.icon}`}
            />
            <div id={`tooltip-${member.id}`} className="tooltip">
              {member.name}
            </div>
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
