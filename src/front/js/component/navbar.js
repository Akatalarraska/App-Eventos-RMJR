import React from "react";
import { Link } from "react-router-dom";

const toggleMenu = () => {
  document.body.classList.toggle("open");
};

export const Navbar = () => (
  <div className="container">
    <nav>
      <img src="ruta_de_la_imagen.jpg" alt="Logo" />
    </nav>
    <div className="overlay"></div>
    <button className="burger" onClick={toggleMenu}>
      <i className="fa-solid fa-bars"></i>
      <i className="fa-solid fa-close"></i>
    </button>
    <aside>
      <a>Home</a>
      <a>Products</a>
      <a>Contact</a>
      <h3>Test</h3>
      <a>Private Area</a>
      <button>Sign Up // Log in</button>
    </aside>
  </div>
);
