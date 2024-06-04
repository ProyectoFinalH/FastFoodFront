import { useState, useEffect } from "react";
import "./slider.css";

function Slider({ images }) {
  const [imageActual, setImageActual] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageActual((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const changeImage = (index) => {
    setImageActual(index);
  };

  return (
    <div className="ContainerSlider">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={index === imageActual ? "slide active" : "slide"}
        />
      ))}
      <div className="dotContainer">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === imageActual ? "dot active" : "dot"}
            onClick={() => changeImage(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Slider;
