/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./slider.css";

function Slider({ images }) {
  const [imageActual, setImageActual] = useState(0);

  const imagesCant = images?.length;

  //verificar si viene una imagen y evitar errores
  if (!Array.isArray(images) || imagesCant === 0) {
    return null;
  }


  const nextImage = () =>
    setImageActual(imageActual === imagesCant -1 ? 0 : imageActual + 1)

  const prevImage = () =>
    setImageActual(imageActual === 0 ?imagesCant -1 : imageActual - 1)


  return (
    <div className="ContainerSlider">
      <button className="prevButton" onClick={prevImage}>◄</button>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="image"
          className={imageActual === index ? "slide active" : "slide"}
        />
      ))}
      <button className="nextButton" onClick={nextImage}>►</button>
    </div>
  );
}

export default Slider;
