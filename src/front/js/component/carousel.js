import React, { useEffect } from "react";
import "../../styles/carousel.css";
import $ from "jquery";

export const Carousel = () => {
  useEffect(() => {
    $('input').on('change', function() {
      $('body').toggleClass('blue');
    });
  }, []);

  return (
    <div id="carrussel">
      <div className="container5">
        <input type="radio" name="slider" id="item-1" checked />
        <input type="radio" name="slider" id="item-2" />
        <input type="radio" name="slider" id="item-3" />
        <div className="cartas">
          <label className="caru1" htmlFor="item-1" id="song-1">
            <img src="https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80" alt="Slider Image" />
          </label>
          <label className="caru1" htmlFor="item-2" id="song-2">
            <img src="https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80" alt="Slider Image" />
          </label>
          <label className="caru1" htmlFor="item-3" id="song-3">
            <img src="https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="Slider Image" />
          </label>
        </div>
      </div>
    </div>
  );
};
