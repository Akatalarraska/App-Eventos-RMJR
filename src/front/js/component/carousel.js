import React from "react";
import { ExpandingCards } from "../component/expandingCards";

import "../../styles/carousel.css";

const slides = [
  "src/front/img/caterfood.jpg",
  // Agrega más rutas de imágenes aquí según tus necesidades
];

export const Carousel = () => {
  return (
    <div className="carrousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="slide"
          style={{
            backgroundImage: `url(${slide})`,
          }}
        >
          <ExpandingCards /> 
        </div>
      ))}
    </div>
  );
};
