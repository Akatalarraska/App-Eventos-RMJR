import React from "react";
import { useState } from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import signupImage1 from "../../img/signup-login1.jpg";

import "../../styles/login.css";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { actions } = useContext(Context);

    const navigate = useNavigate();


    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await actions.userLogin(email, password);
        if (response && response.token) {
          navigate("/private");
        } else {
          throw new Error("Error al iniciar sesión, inténtalo de nuevo");
        }
      } catch (error) {
        alert(error.message);
      }
    };
    



    return (


        <div className="container mt-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xl-6 col-lg-6">
                    <form className="login user-login-form m-5" onSubmit={handleLoginSubmit}>
                        <h3 className="fw-bold mt-5 mb-2 text-center text-black">
                            Inicio de sesión
                        </h3>

                        <div className="row m-3  d-flex justify-content-center" >
                            <div className="col-xl-6 col-lg-6">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="form-control form-control-user-login form-control-lg"
                                    placeholder="Email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row m-3  d-flex justify-content-center" >
                            <div className="col-xl-6 col-lg-6">
                                <input
                                    type="password"
                                    id="Password"
                                    name="Password"
                                    className="form-control form-control-user-login form-control-lg"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="row m-3 d-flex justify-content-center" >
                            <div className="col-xl-6 col-lg-6 d-flex justify-content-center">
                                <button type="submit" className="btn btn-lg btn-dark text-white btn-user-login">
                                    Iniciar sesión
                                </button>
                            </div>
                        </div>
                        <p className="text-center mt-3">Aún no tienes cuenta? <Link to="/signup">Regístrate</Link></p>

                    </form>
                </div>
                <div className="col-xl-6 col-lg-6 text-align-center">
                    <img src={signupImage1} alt="Imagen de registro de usuario" className="img-user-login" />
                </div>
            </div>
        </div>
    );
};
