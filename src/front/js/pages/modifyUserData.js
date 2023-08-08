import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/modifyuserdata.css";
import Swal from "sweetalert2";

export const ModifyUserData = () => {
  const { store, actions } = useContext(Context);

  const [name, setName] = useState(store.user.name);
  const [dni, setDni] = useState(store.user.dni);
  const [email, setEmail] = useState(store.user.email);
  const [password, setPassword] = useState("");


  const navigate = useNavigate();


  const handleModifySubmit = async (event) => {
    event.preventDefault();

    const dniPattern = /^\d{8}[A-Za-z]?$/;
    if (!dniPattern.test(dni)) {
      Swal.fire({
        title: "Error",
        text: "El DNI no es válido. Debe tener 8 dígitos y una letra opcional al final.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      const success = await actions.updateUserData(store.user.id, name, dni, email, password);
      if (success) {
        Swal.fire({
          title: "Datos actualizados con éxito",
          text: "Por favor, vuelve a iniciar sesión con tus nuevos datos",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/login")
      } else {
        throw new Error("Error al actualizar los datos, inténtalo de nuevo");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al actualizar los datos, inténtalo de nuevo",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const nameAndDniWarning = () => {
    Swal.fire({
      title: "",
      text: "Por favor, para modificar tu nombre o tu DNI ponte en contacto con nosotros",
      icon: "warning",
      confirmButtonText: "Aceptar",
    });
  };

  return (
    <div className="container-modify-user-data m-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-xl-6 col-lg-6">
          <form className="modify-user-data-form m-5" onSubmit={handleModifySubmit}>
            <h3 className="fw-bold mt-5 mb-2 text-center text-black">Datos de usuario</h3>
            <div className="row m-3 d-flex justify-content-center">
              <div className="col-6 col-xl-6 col-lg-6">
                <div className={`form-control form-control-user-signup form-control-lg disabled-input ${name && "disabled-input"}`} onClick={nameAndDniWarning}>
                  {name || store.user.name}
                </div>
              </div>
            </div>
            <div className="row m-3 d-flex justify-content-center">
              <div className="col-6 col-xl-6 col-lg-6">
                <div className={`form-control form-control-user-signup form-control-lg disabled-input ${dni && "disabled-input"}`} onClick={nameAndDniWarning}>
                  {dni || store.user.dni}
                </div>
              </div>
            </div>

            <div className="row m-3  d-flex justify-content-center">
              <div className="col-6 col-xl-6 col-lg-6">

                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control form-control-user-signup form-control-lg"
                  placeholder="Email"
                  autoComplete="email"
                  value={store.user.email || email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="row m-3 d-flex justify-content-center">
              <div className="col-6 col-xl-6 col-lg-6">
                <input
                  type="password"
                  id="Password"
                  name="Password"
                  className="form-control form-control-user-signup form-control-lg"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <div className="row m-3 d-flex justify-content-center">
              <div className="col-8 col-xl-8 col-lg-8 d-flex justify-content-center">
                <button type="submit" className="btn btn-lg btn-dark text-white btn-user-signup">
                  Guardar cambios
                </button>
              </div>
            </div>
            <p className="text-center mt-3 text-black">
              Volver al <Link to="/private">área privada</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};



