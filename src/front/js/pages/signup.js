import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { TermsAndConditions } from "../component/termsandconditions";
import Swal from "sweetalert2";

import signupImage4 from "../../img/signup-login4.jpg";

import "../../styles/signup.css";

export const Signup = () => {

  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await actions.userSignup(name, dni, email, password);
      if (success) {
        Swal.fire({
          title: 'Registro realizado con éxito',
          text: 'Ya puede iniciar sesión',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        navigate('/login');
      } else {
        throw new Error("Error al registrar usuario, inténtalo de nuevo");
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al registrar el usuario, inténtelo de nuevo',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };


  const validDniPattern = /^\d{0,8}[A-Za-z]{0,1}$/;

  const handleDniChange = (event) => {
    const value = event.target.value.toUpperCase();
    if (validDniPattern.test(value)) {
      setDni(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-xl-8 col-lg-6">
          <form className="signup user-signup-form m-5" onSubmit={handleSignupSubmit}>
            <h3 className="fw-bold mt-5 mb-2 text-center text-black">Registro de usuario</h3>
            <div className="row m-3 d-flex justify-content-center">
              <div className="col-8 col-xl-8 col-lg-8">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control form-control-user-signup form-control-lg"
                  placeholder="Nombre"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>
            <div className="row m-3 d-flex justify-content-center">
              <div className="col-8 col-xl-8 col-lg-8">
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  className="form-control form-control-user-signup form-control-lg"
                  placeholder="DNI"
                  required
                  autoComplete="dni"
                  value={dni}
                  onChange={handleDniChange}
                />
              </div>
            </div>

            <div className="row m-3  d-flex justify-content-center">
              <div className="col-8 col-xl-8 col-lg-8">
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

            <div className="row m-3  d-flex justify-content-center">
              <div className="col-8 col-xl-8 col-lg-8 input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  name="Password"
                  className="form-control form-control-user-signup form-control-lg"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <i
                  className={`fa-solid ${showPassword ? "input-icon fa-eye-slash" : "input-icon fa-eye"}`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </div>
            <div className="row m-3 d-flex justify-content-center">
              <div className="col-8 col-xl-8 col-lg-8 d-flex justify-content-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck" required />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Acepto los{" "}
                    <span className="conditions-link" onClick={openModal}>
                      <u>términos y condiciones</u>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            {showModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>Terms and Conditions</h2>
                  <TermsAndConditions />
                  <button className="close-button" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            )}
            <div className="row m-3 d-flex justify-content-center">
              <div className="col-8 col-xl-8 col-lg-8 d-flex justify-content-center">
                <button type="submit" className="btn btn-lg btn-dark text-white btn-user-signup">
                  Registrar
                </button>
              </div>
            </div>
            <p className="text-center mt-3 text-black">
              Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </form>

        </div>
        <div className="col-xl-4 col-lg-6 text-align-center">
          <img src={signupImage4} alt="Imagen de registro de usuario" className="img-user-signup" />
        </div>
      </div>
    </div>
  );
};






