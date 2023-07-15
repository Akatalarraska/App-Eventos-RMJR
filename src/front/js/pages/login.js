import React from "react";
import { useState } from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


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
            Swal.fire({
                title: 'Sesión iniciada correctamente',
                text: 'Bienvenido a su área privada',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
          navigate("/private");
        } 
        else {
          throw new Error("Error al iniciar sesión, inténtalo de nuevo");
        }
      } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al iniciar sesión, inténtelo de nuevo',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
      }
    };
    



    return (


        <div className="container mt-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xl-8 col-lg-8">
                    <form className="login user-login-form m-5" onSubmit={handleLoginSubmit}>
                        <h3 className="fw-bold mt-5 mb-2 text-center text-black">
                            Inicio de sesión
                        </h3>

                        <div className="row m-3  d-flex justify-content-center" >
                            <div className="col-xl-8 col-lg-8">
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
                            <div className="col-xl-8 col-lg-8">
                                <input
                                    type="password"
                                    id="Password"
                                    name="Password"
                                    className="form-control form-control-user-login form-control-lg"
                                    placeholder="Password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                        
                        <div className="row m-3 d-flex justify-content-center" >
                            <div className="col-xl-8 col-lg-8 d-flex justify-content-center">
                                <button type="submit" className="btn btn-lg btn-dark text-white btn-user-login">
                                    Iniciar sesión
                                </button>
                            </div>
                        </div>
                        <p className="text-center mt-3">Aún no tienes cuenta? <Link to="/signup">Regístrate</Link></p>

                    </form>
                </div>
                <div className="col-xl-4 col-lg-4 text-align-center">
                    <img src={signupImage1} alt="Imagen de registro de usuario" className="img-user-login" />
                </div>
            </div>
        </div>
    );
};
