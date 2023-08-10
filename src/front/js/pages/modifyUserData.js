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
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newEmail, setNewEmail] = useState("");


  useEffect(() => {
    if (store.user.name) {
      setName(store.user.name);
    }
    if (store.user.dni) {
      setDni(store.user.dni);
    }

    if (store.user.email) {
      setEmail(store.user.email);
    }
  }, [store.user]);



  const navigate = useNavigate();


  const handleModifySubmit = async (event) => {
    event.preventDefault();
  
    try {
      const success = await actions.updateUserData(
        store.user.id,
        name,
        dni,
        email,
        password,
        newEmail,
        newPassword
      );
  
      if (success) {
        Swal.fire({
          title: "Datos actualizados con éxito",
          text: "Por favor, vuelve a iniciar sesión con tus nuevos datos",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "Error",
          text: "La contraseña no es correcta, por favor inténtalo de nuevo",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
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
      text: "Por favor, para modificar tu nombre o tu DNI ponte en contacto con nosotros. Escríbenos un correo a events.ibento@gmail.com",
      icon: "warning",
      confirmButtonText: "Aceptar",
    });
  };

  const showPartialEmail = (email) => {
    const parts = email.split('@');
    const username = parts[0];
    const domain = parts[1];

    const maskedUsername =
      username.length >= 3
        ? username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1)
        : username;

    return maskedUsername + '@' + domain;
  };


  const starredText = (text) => {
    if (text)
      return '*'.repeat(text.length);
  };



  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  return (
    <div className="container-fluid container-modify-user-data mt-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-xs-12 col-xl-6 col-lg-6">
          <form className="modify-user-data-form m-5" onSubmit={handleModifySubmit}>
            <h3 className="fw-bold mt-5 mb-2 text-center text-black">Modificación de datos de usuario</h3>
            <div className="row m-2 d-flex justify-content-center">
              <div className="col-xs-6 col-xl-6 col-lg-6">
                <label className="name-label" htmlFor="name">Nombre</label>
                <div className={`form-control form-control-user-signup form-control-lg disabled-input ${name && "disabled-input"}`} onClick={nameAndDniWarning}>
                  {starredText(store.user.name)}
                </div>
              </div>
            </div>
            <div className="row m-2 d-flex justify-content-center">
              <div className="col-xs-6 col-xl-6 col-lg-6">
                <label className="dni-label" htmlFor="dni">DNI</label>
                <div className={`form-control form-control-user-signup form-control-lg disabled-input ${dni && "disabled-input"}`} onClick={nameAndDniWarning}>
                  {starredText(store.user.dni)}
                </div>
              </div>
            </div>

            <div className="row m-2  d-flex justify-content-center">
              <div className="col-xs-6 col-xl-6 col-lg-6">
                <label className="email-label" htmlFor="email">Email actual</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control form-control-user-signup form-control-lg"
                  placeholder="Email"
                  autoComplete="email"
                  value={showPartialEmail(store.user.email || email)}
                  readOnly
                />
              </div>
            </div>

            <div className="row mx-2 my-4 d-flex justify-content-center ">
              <div className="col-xs-6 col-xl-6 col-lg-6 input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="Current password"
                  name="Current password"
                  className="form-control form-control-user-signup form-control-lg"
                  placeholder="Introduce tu contraseña actual"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}

                />
                <i
                  className={`fa-solid ${showPassword ? "input-icon fa-eye-slash" : "input-icon fa-eye"}`}
                  onClick={togglePasswordVisibility}

                ></i>
              </div>
            </div>

            <div className="row mx-2 my-4 d-flex justify-content-center">
              <div className="col-xs-6 col-xl-6 col-lg-6">
                <input
                  type="text"
                  id="newEmail"
                  name="email"
                  className="form-control form-control-user-signup form-control-lg"
                  placeholder="Introduce tu nuevo email"
                  autoComplete="email"
                  value={newEmail}
                  onChange={(event) => setNewEmail(event.target.value)}
                />
              </div>
            </div>


            <div className="row mx-2 my-4 d-flex justify-content-center">
              <div className="col-xs-6 col-xl-6 col-lg-6 input-wrapper">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="New password"
                  name="New password"
                  className="form-control form-control-user-signup form-control-lg"
                  placeholder="Introduce tu nueva contraseña"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <i
                  className={`fa-solid ${showNewPassword ? "input-icon fa-eye-slash" : "input-icon fa-eye"}`}
                  onClick={toggleNewPasswordVisibility}

                ></i>
              </div>
            </div>
            <div className="row mt-5 mx-2 d-flex justify-content-center">
              <div className="col-xs-8 col-xl-8 col-lg-8 d-flex justify-content-center">
                <button type="submit" className="btn btn-lg btn-dark text-white btn-user-signup">
                  Guardar cambios
                </button>
              </div>
            </div>
            <p className="text-center mt-3 text-black">
              ¿Prefieres no hacer cambios en tu perfil? Vuelve al <Link to="/private">área privada</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};



