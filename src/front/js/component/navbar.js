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
      <div className="container navbar d-flex justify-content-center align-items-center">
        <nav className="d-flex justify-content-center align-items-center">
          <Link to="/">Home</Link>
          <Link to="/eventos">Events</Link>
          {token && token != null && token != undefined ? (
            
            <div className="private-area-items d-flex justify-content-evenly align-items-center">
              <Link to="/private">Área privada</Link>
              <p className="m-5 text-black">Bienvenid@, {store.user.name.split(' ')[0]} <i className="fa-solid fa-user fa-beat" ></i></p>
                <button
                  type="button"
                  className="btn btn-dark text-white close-session-button me-5 align-item-end"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            
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