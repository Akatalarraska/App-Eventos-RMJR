import React from "react";
import { useState } from "react";
import { Context } from "../store/appContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TermsAndConditions } from "../component/termsandconditions";


import signupImage4 from "../../img/signup-login4.jpg";

import "../../styles/signup.css";

export const Signup = () => {


    const [name, setName] = useState("");
    const [dni, setDni] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        actions.userSignup(name, dni, email, password);
        if (store.user) {
            alert("Usuario registrado correctamente, ya puedes iniciar sesión");
            navigate("/login");

        } else {
            alert("Error al registrar usuario, inténtalo de nuevo");
        }
    };

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (


        <div className="container mt-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xl-6 col-lg-6">
                    <form className="signup user-signup-form m-5" onSubmit={handleSignupSubmit}>
                        <h3 className="fw-bold mt-5 mb-2 text-center text-black">
                            Registro de usuario
                        </h3>
                        <div className="row m-3 d-flex justify-content-center" >
                            <div className="col-xl-6 col-lg-6">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control form-control-user-signup form-control-lg"
                                    placeholder="Nombre"
                                    required
                                    value={name}
                                    onChange={(event) => setName(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="row m-3 d-flex justify-content-center" >

                            <div className="col-xl-6 col-lg-6">
                                <input
                                    type="text"
                                    id="dni"
                                    name="dni"
                                    className="form-control form-control-user-signup form-control-lg"
                                    placeholder="DNI"
                                    required
                                    value={dni}
                                    onChange={(event) => setDni(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row m-3  d-flex justify-content-center" >
                            <div className="col-xl-6 col-lg-6">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="form-control form-control-user-signup form-control-lg"
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
                                    type="text"
                                    id="Password"
                                    name="Password"
                                    className="form-control form-control-user-signup form-control-lg"
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
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" required />
                                        <label className="form-check-label" htmlFor="gridCheck">
                                            Acepto los{" "}
                                            <span
                                                className="conditions-link"
                                                onClick={openModal}
                                            >
                                                términos y condiciones
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {showModal && (
                                <div className="modal-overlay">
                                    <div className="modal-content">
                                        <h2>Terms and Conditions</h2>
                                        {<TermsAndConditions/>}
                                        <button className="close-button" onClick={closeModal}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        <div className="row m-3 d-flex justify-content-center" >
                            <div className="col-xl-6 col-lg-6 d-flex justify-content-center">
                                <button type="submit" className="btn btn-lg btn-dark text-white btn-user-signup">
                                    Registrar
                                </button>
                            </div>
                        </div>
                        <p className="text-center mt-3">Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                    </form>
                </div>
                <div className="col-xl-6 col-lg-6 text-align-center">
                    <img src={signupImage4} alt="Imagen de registro de usuario" className="img-user-signup" />
                </div>
            </div>
        </div>
    );
};
