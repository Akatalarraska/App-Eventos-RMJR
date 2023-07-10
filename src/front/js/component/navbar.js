import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {

  const navigate = useNavigate();

  const { store } = useContext(Context);
  const token = store.user.token;

  const handleLogout = () => {
   store.user.token = null;
   navigate("/")
  };

  return (
    <div className="container navbar d-flex justify-content-center">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/event">Eventos</Link>
        {token ? (
          <>
            <Link to="/private">Área privada</Link>
            <div className="mb-5 d-flex justify-content-end" >
              <button type="button" className="btn-lg btn-primary me-5" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </>

        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log in</Link>
          </>
        )}
      </nav>
    </div>
  )

}

{/* <div className="back"></div> */ }


// const toggleMenu = () => {
//   document.body.classList.toggle("open");
// };
