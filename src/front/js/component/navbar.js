import React from "react";
import { Link } from "react-router-dom";

const toggleMenu = () => {
  document.body.classList.toggle("open");
};

export const Navbar = () => (
  <div className="container navbar d-flex justify-content-center">
    <div className="back"></div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/">Eventos</Link>
      <Link to="/">Partners</Link>
      <Link to="/private">Private Area</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log in</Link>

    </nav>
  </div>
);


