import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/forgot-password.css"; 

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamamos a la función requestPasswordReset del contexto para solicitar el restablecimiento de contraseña
      const success = await actions.requestPasswordReset(email);
      if (success) {
        Swal.fire({
          title: "Correo enviado",
          text: "Se ha enviado un correo con las instrucciones para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada y sigue los pasos indicados.",
          icon: "success",
          confirmButtonText: "Volver a inicio de sesión",
        });
        navigate("/login");

      } else {
        Swal.fire({
          title: "Error",
          text: "Error al solicitar el restablecimiento de contraseña, inténtalo de nuevo",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.log("Error requesting password reset", error);
      Swal.fire({
        title: "Error",
        text: "Error al solicitar el restablecimiento de contraseña, inténtalo de nuevo",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="container-fluid my-5 p-4">
      <div className="row d-flex justify-content-center align-items-center m-1">
        <div className="col-xl-6">
          <form className="forgot-password-form m-5" onSubmit={handleForgotPasswordSubmit}>
            <h1 className="fw-bold mt-5 mb-2 text-center text-black">Recuperar contraseña</h1>
            <p className="text-center text-black">
              Introduce tu email y te enviaremos un correo con las instrucciones para restablecer tu contraseña
            </p>
            <div className="row m-3 p-1 d-flex justify-content-center">
              <div className="col-xl-6 col-lg-6">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control form-control-lg forgot-password-form-control"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="row m-3 p-1 d-flex justify-content-center">
              <div className="col-xl-8 col-lg-8 d-flex justify-content-center">
                <button type="submit" className="btn btn-lg btn-dark text-white">
                  Enviar correo
                </button>
              </div>
            </div>
            <p className="text-center mt-3 p-1 text-black">
            ¿Prefieres no restablecer tu contraseña? Vuelve a <Link to="/login">inicio de sesión</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
