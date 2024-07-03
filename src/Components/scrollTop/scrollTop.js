import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        onClick={scrollToTop}
        title="Ir arriba"
        className="bg-red-500 text-white p-4 rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        ↑
      </button>
    </div>
  );
};

export default ScrollToTopButton;
