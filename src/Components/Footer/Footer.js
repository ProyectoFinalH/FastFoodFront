import React from "react";
import cisnerosImage from "./images/cisneros-jorge.jpg";
import DanielImage from "./images/Daniel Navarro.png";
import JoseImage from "./images/Jose Rojas.jpg";
import JulioImage from "./images/Julio Cesar.jpg";
import LuisImage from "./images/Luis Alberto Buelvas Cogollo.png";
import MillerImage from "./images/Millervillamizar.jpg";

const Footer = () => {
  const members = [
    {
      id: 1,
      name: "Jorge Cisneros",
      icon: "icon1",
      image: cisnerosImage,
      linkedin: "https://www.linkedin.com/in/cisneros-jorge/",
    },
    {
      id: 2,
      name: "Jose Rojas",
      icon: "icon2",
      image: JoseImage,
      linkedin: "https://www.linkedin.com/in/joserojas2508/",
    },
    {
      id: 3,
      name: "Julio Uribe",
      icon: "icon3",
      image: JulioImage,
      linkedin:
        "https://www.linkedin.com/in/julio-cesar-uribe-betancourt-9b46a1263/",
    },
    {
      id: 4,
      name: "Luis Buelvas",
      icon: "icon4",
      image: LuisImage,
      linkedin: "https://github.com/CunGemcrak",
    },
    {
      id: 5,
      name: "Miller Villamizar",
      icon: "icon5",
      image: MillerImage,
      linkedin: "https://www.linkedin.com/in/miller-villa/",
    },
    {
      id: 6,
      name: "Daniel Navarro",
      icon: "icon6",
      image: DanielImage,
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
    <footer className="bg-gray-900 py-5 text-white text-center">
      <div className="mb-8">
        <p className="text-xl">Equipo de Desarrollo</p>
      </div>
      <div className="flex justify-center">
        {members.map((member) => (
          <a
            key={member.id}
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mx-2 mb-6 icon-wrapper"
            onMouseEnter={() => handleMouseEnter(member.id)}
            onMouseLeave={() => handleMouseLeave(member.id)}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-16 h-16 rounded-full border-2 border-white cursor-pointer"
            />
            <div
              id={`tooltip-${member.id}`}
              className="hidden absolute -top-11 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs"
            >
              {member.name}
            </div>
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
