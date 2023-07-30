import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/companysignup.css";
import businessImage from "../../img/business.jpg";
import { useNavigate } from "react-router-dom";
import { TermsAndConditions } from "../component/termsandconditions";



export const CompanySignup = () => {


    const [razonSocial, setRazonSocial] = useState("");
    const [cif, setCif] = useState("");
    const [direccion, setDireccion] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [poblacion, setPoblacion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [registrationCompleted, setRegistrationCompleted] = useState(false);

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const handleSubmit = (event) => {
        event.preventDefault();
        actions.companySignup(
            razonSocial,
            cif,
            direccion,
            codigoPostal,
            poblacion,
            telefono,
            email
        );
        setRegistrationCompleted(true)
        setTimeout(() => {
            navigate("/private");
        }, 10000);

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
            {registrationCompleted ? (
                <div className="row">
                    <div className="registration-completed mt-5 mb-2 col-12 rotate-vertical-center">
                        <h1 className="fw-bold mt-5 mb-2 text-center text-black">
                            ¡¡Registro completado con éxito!!
                        </h1>
                        <h3 className="text-center text-black">
                            Enhorabuena, ya puedes gestionar tus eventos de empresa desde la plataforma.
                        </h3>
                        <p className="text-center text-black">
                            En unos segundos volverás a tu área privada.
                        </p>
                    </div>
                    <div className="row d-flex justify-content-center mb-5">
                        <span className="loader"></span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-xl-6 col-lg-6">
                        <form className="signup company-form m-5" onSubmit={handleSubmit}>
                            <h3 className="fw-bold mt-5 mb-2 text-center text-black">
                                Registro de empresa
                            </h3>
                            <div className="row m-3 d-flex justify-content-center" >
                                <div className="col-8 col-xl-6 col-lg-6">
                                    <input
                                        type="text"
                                        id="razonSocial"
                                        name="razonSocial"
                                        className="form-control form-control-company form-control-lg"
                                        placeholder="Razón Social"
                                        required
                                        value={razonSocial}
                                        onChange={(event) => setRazonSocial(event.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row m-3 d-flex justify-content-center" >

                                <div className="col-8 col-xl-6 col-lg-6">
                                    <input
                                        type="text"
                                        id="cif"
                                        name="cif"
                                        className="form-control form-control-company form-control-lg"
                                        placeholder="CIF"
                                        required
                                        value={cif}
                                        onChange={(event) => setCif(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row m-3  d-flex justify-content-center" >
                                <div className="col-8 col-xl-6 col-lg-6">
                                    <input
                                        type="text"
                                        id="direccion"
                                        name="direccion"
                                        className="form-control form-control-company form-control-lg"
                                        placeholder="Direccion"
                                        autoComplete="address"
                                        required
                                        value={direccion}
                                        onChange={(event) => setDireccion(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row m-3 d-flex justify-content-center" >
                                <div className="col-8 col-xl-6 col-lg-6">
                                    <input
                                        type="text"
                                        id="codigoPostal"
                                        name="codigoPostal"
                                        className="form-control form-control-company form-control-lg"
                                        placeholder="Código Postal"
                                        required
                                        value={codigoPostal}
                                        onChange={(event) => setCodigoPostal(event.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row m-3 d-flex justify-content-center " >
                                <div className="dropdown col-8 col-xl-6 col-lg-6">

                                    <select
                                        id="ubicacion"
                                        name="ubicacion"
                                        className="form-control form-control-event-create form-control-lg"
                                        required
                                        value={poblacion}
                                        onChange={(event) => setPoblacion(event.target.value)}
                                    >
                                        <option value="">Seleccione una ubicación</option>
                                        {store.cities.map((city) => (
                                            <option key={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="row m-3  d-flex justify-content-center" >
                                <div className="col-8 col-xl-6 col-lg-6">
                                    <input
                                        type="text"
                                        id="telefono"
                                        name="telefono"
                                        className="form-control form-control-company form-control-lg"
                                        placeholder="Número de Teléfono"
                                        required
                                        value={telefono}
                                        onChange={(event) => setTelefono(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row m-3  d-flex justify-content-center" >
                                <div className="col-8 col-xl-6 col-lg-6">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="form-control form-control-company form-control-lg"
                                        placeholder="Email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row m-3 d-flex justify-content-center" >
                                <div className="col-8 col-xl-6 col-lg-6 d-flex justify-content-center">
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
                                        {<TermsAndConditions />}
                                        <button className="close-button" onClick={closeModal}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="row m-3 d-flex justify-content-center" >
                                <div className="col-xl-6 col-lg-6 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-lg btn-dark text-white btn-company-signup">
                                        Sign in
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <img src={businessImage} alt="Imagen de la empresa" className="img-company" />
                    </div>
                </div>
            )}
        </div>
    );
}