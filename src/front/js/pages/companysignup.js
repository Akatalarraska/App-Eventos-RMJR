import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/companysignup.css";
import businessImage from "../../img/business.jpg";
import { useNavigate } from "react-router-dom";



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
    const { actions } = useContext(Context);

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
        }, 5000);

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
                    <div className="row d-flex justify-content-center">
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
                                <div className="col-xl-6 col-lg-6">
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

                                <div className="col-xl-6 col-lg-6">
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
                                <div className="col-xl-6 col-lg-6">
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

                            <div className="row m-3  d-flex justify-content-center" >
                                <div className="col-xl-6 col-lg-6">
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

                            <div className="row m-3  d-flex justify-content-center" >
                                <div className="col-xl-6 col-lg-6">
                                    <input
                                        type="text"
                                        id="poblacion"
                                        name="poblacion"
                                        className="form-control form-control-company form-control-lg"
                                        placeholder="Poblacion"
                                        required
                                        value={poblacion}
                                        onChange={(event) => setPoblacion(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="row m-3  d-flex justify-content-center" >
                                <div className="col-xl-6 col-lg-6">
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
                                <div className="col-xl-6 col-lg-6">
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
                                <div className="col-xl-6 col-lg-6 d-flex justify-content-center">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" required />
                                        <label className="form-check-label" htmlFor="gridCheck">
                                            I accept the{" "}
                                            <span
                                                className="conditions-link"
                                                onClick={openModal}
                                            >
                                                terms and conditions
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {showModal && (
                                <div className="modal-overlay">
                                    <div className="modal-content">
                                        <h2>Terms and Conditions</h2>
                                        <div>
                                            <ul className="terms-list">
                                                <li>
                                                    <strong>Términos y Condiciones de Ibento:</strong>
                                                </li>
                                                <li>
                                                    Bienvenido/a a Ibento, una plataforma B2B de organización de eventos.
                                                    Antes de utilizar nuestros servicios, te pedimos que leas atentamente
                                                    los siguientes términos y condiciones. Estos términos establecen los
                                                    derechos y obligaciones tanto de Ibento como de los usuarios de
                                                    nuestra plataforma. Al acceder y utilizar nuestros servicios, aceptas
                                                    cumplir y estar sujeto a estos términos.
                                                </li>
                                                <li>
                                                    <strong>1. Uso de la Plataforma</strong>
                                                    <ul>
                                                        <li>
                                                            <strong>1.1. Registro de Usuario:</strong> Para acceder a ciertas
                                                            funcionalidades de Ibento, debes registrarte y crear una cuenta de
                                                            usuario. Tú eres responsable de proporcionar información precisa y
                                                            mantener tu cuenta segura. No compartir tu información de acceso
                                                            con terceros y notificar de inmediato cualquier uso no autorizado
                                                            de tu cuenta.
                                                        </li>
                                                        <li>
                                                            <strong>1.2. Contenido del Usuario:</strong> Al utilizar Ibento,
                                                            puedes crear, cargar, publicar y compartir contenido, como
                                                            información sobre eventos, imágenes, descripciones, etc. Eres el
                                                            único responsable de tu contenido y garantizas que no infringes
                                                            ningún derecho de propiedad intelectual o violas ninguna ley
                                                            aplicable.
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <strong>2. Propiedad Intelectual</strong>
                                                    <ul>
                                                        <li>
                                                            <strong>2.1. Derechos de Autor:</strong> Ibento y sus licenciantes
                                                            son los propietarios exclusivos de todos los derechos de propiedad
                                                            intelectual relacionados con la plataforma, incluyendo software,
                                                            diseño, marcas registradas y contenido creado por Ibento. No puedes
                                                            copiar, modificar, distribuir o utilizar nuestro contenido sin
                                                            autorización previa por escrito.
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <strong>3. Limitación de Responsabilidad</strong>
                                                    <ul>
                                                        <li>
                                                            <strong>3.1. Uso bajo tu Propio Riesgo:</strong> El uso de Ibento
                                                            es bajo tu propio riesgo. No garantizamos la disponibilidad
                                                            ininterrumpida de la plataforma o la exactitud, confiabilidad o
                                                            integridad del contenido. No nos hacemos responsables de ningún
                                                            daño o pérdida causada por el uso de Ibento.
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <strong>4. Privacidad</strong>
                                                    <ul>
                                                        <li>
                                                            <strong>4.1. Protección de Datos:</strong> Valoramos tu privacidad
                                                            y nos comprometemos a proteger tus datos personales de acuerdo con
                                                            nuestra Política de Privacidad. Al utilizar Ibento, aceptas el
                                                            procesamiento de tus datos personales de acuerdo con nuestra
                                                            política.
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <strong>5. Disposiciones Generales</strong>
                                                    <ul>
                                                        <li>
                                                            <strong>5.1. Modificaciones:</strong> Nos reservamos el derecho de
                                                            modificar estos términos y condiciones en cualquier momento. Te
                                                            notificaremos sobre los cambios significativos y podrás revisar los
                                                            términos actualizados en nuestra plataforma. El uso continuado de
                                                            Ibento después de los cambios constituirá tu aceptación de los
                                                            términos modificados.
                                                        </li>
                                                        <li>
                                                            <strong>5.2. Ley Aplicable:</strong> Estos términos se regirán e
                                                            interpretarán de acuerdo con las leyes de España, país en el que
                                                            Ibento tiene su sede.
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    Si tienes alguna pregunta sobre estos términos y condiciones,
                                                    contáctanos a través de nuestra plataforma.
                                                </li>
                                            </ul>
                                        </div>
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