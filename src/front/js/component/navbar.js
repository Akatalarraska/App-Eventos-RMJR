import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

export const Navbar = () => {

  const navigate = useNavigate();

  const { actions, store } = useContext(Context);
  const token = store.user.token;

  const handleLogout = () => {
    actions.userLogOut();
    navigate("/");
  };

    return (
      <div className="container navbar d-flex justify-content-center">
        <nav className="d-flex justify-content-center">
          <Link to="/">Home</Link>
          <Link to="/event">Eventos</Link>
          {token && token != null && token != undefined ? (
            <>
              <Link to="/private">Área privada</Link>
             
                <button
                  type="button"
                  className="btn btn-primary me-5 align-item-end"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              
            </>
          ) : (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log in</Link>
            </>
          )}
        </nav>
      </div>
    );
  };




 

