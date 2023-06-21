import React from "react";
import { Link } from "react-router-dom";

const toggleMenu = () => {
  document.body.classList.toggle("open");
};

export const Navbar = () => (
  <div className="container navbar">
    <div class="back"></div>
    <nav>
      <a href="#">Home</a>
      <a href="#">Works</a>
      <a href="#">Partners</a>
      <a href="#">Private Area</a>
      <a href="#">Sign Up // Log in</a>
    </nav>
  </div>
);
