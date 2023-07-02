import React from "react";
import { Link } from "react-router-dom";
import "../../styles/private.css";
import calendarImage from "../../img/calendar.png";
import eventImage from "../../img/evento.jpg";
import companyImage from "../../img/empresa.png";
import dataImage from "../../img/datos.jpg";
import nextEventsImage from "../../img/proximos-eventos.jpg";
import pastEventsImage from "../../img/registro-eventos.png";

export const Private = () => {


    return (
        <div className="container mt-5 justify-content-center">
            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-6 card-container">
                    <div className="card">
                        <div className="card__inner">
                            <div className="card__side card__side--front">
                                <div className="card__image-wrapper">
                                    <img
                                        src={eventImage}
                                        alt="Crea tu evento"
                                        className="card__image"
                                    />
                                </div>
                                <div className="card__body card__body--flex">
                                    <h2 className="card__title">Crea tu evento</h2>
                                    <i className="fa-solid fa-circle-arrow-right fa-2xl" />
                                </div>
                            </div>
                            <div className="card__side card__side--back">
                                <div className="card__body">
                                    <p>
                                        Organiza eventos memorables con Ibento. Desde conferencias y exposiciones hasta fiestas y reuniones corporativas,
                                        nuestra herramienta te ofrece todas las funcionalidades necesarias para planificar, promocionar y gestionar tus eventos
                                        de manera eficiente y exitosa.
                                    </p>
                                </div>
                                <div className="card__body-btn d-flex justify-content-center align-items-end mb-5">
                                    <Link to="/eventos" className="link">
                                        <button className="btn btn--body-custom">
                                            Crear evento
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 card-container">
                    <div className="card">
                        <div className="card__inner">
                            <div className="card__side card__side--front">
                                <div className="card__image-wrapper">
                                    <img
                                        src={calendarImage}
                                        alt="Calendario de eventos"
                                        className="card__image"
                                    />
                                </div>
                                <div className="card__body card__body--flex">
                                    <h2 className="card__title">Calendario de eventos</h2>
                                    <i className="fa-solid fa-circle-arrow-right fa-2xl" />
                                </div>
                            </div>
                            <div className="card__side card__side--back">
                                <div className="card__body">
                                    <p>
                                        Descubre un mundo lleno de oportunidades en nuestro calendario de eventos.
                                        Explora una amplia variedad de actividades, conferencias y encuentros profesionales en tu industria.
                                        Mantente al tanto de las fechas importantes y no te pierdas ninguna oportunidad de networking, aprendizaje y crecimiento.
                                    </p>
                                    </div>
                                <div className="card__body-btn d-flex justify-content-center align-items-end mb-5">
                                    <Link to="/calendario" className="link">
                                        <button className="btn btn--body-custom">
                                            Calendario de eventos
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-6 card-container">
                    <div className="card">
                        <div className="card__inner">
                            <div className="card__side card__side--front">
                                <div className="card__image-wrapper">
                                    <img
                                        src={nextEventsImage}
                                        alt="Próximos eventos"
                                        className="card__image"
                                    />
                                </div>
                                <div className="card__body card__body--flex">
                                    <h2 className="card__title">Próximos eventos</h2>
                                    <i className="fa-solid fa-circle-arrow-right fa-2xl" />
                                </div>
                            </div>
                            <div className="card__side card__side--back">
                                <div className="card__body">
                                    <p>
                                        Mantén tus ojos en el futuro y prepárate para los próximos eventos más emocionantes.
                                        Nuestro catálogo incluye una selección de eventos próximos en diferentes industrias.
                                        Descubre nuevas tendencias, conecta con expertos y amplía tu red de contactos mientras te sumerges en experiencias enriquecedoras.
                                    </p>
                                    </div>
                                <div className="card__body-btn d-flex justify-content-center align-items-end mb-5">
                                    <Link to="/eventos" className="link">
                                        <button className="btn btn--body-custom">
                                            Próximos eventos
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 card-container">
                    <div className="card">
                        <div className="card__inner">
                            <div className="card__side card__side--front">
                                <div className="card__image-wrapper">
                                    <img
                                        src={pastEventsImage}
                                        alt="Eventos realizados"
                                        className="card__image"
                                    />
                                </div>
                                <div className="card__body card__body--flex">
                                    <h2 className="card__title">Eventos realizados</h2>
                                    <i className="fa-solid fa-circle-arrow-right fa-2xl" />
                                </div>
                            </div>
                            <div className="card__side card__side--back">
                                <div className="card__body">
                                    <p>
                                        Revive los momentos destacados de los eventos realizados en nuestra plataforma.
                                        Explora los logros, las conexiones y las oportunidades generadas en eventos anteriores.
                                        A través de testimonios, imágenes y estadísticas, te mostraremos el impacto que nuestros eventos han tenido en la comunidad empresarial.
                                    </p>
                                    </div>
                                <div className="card__body-btn d-flex justify-content-center align-items-end mb-5">
                                    <Link to="/eventos" className="link">
                                        <button className="btn btn--body-custom">
                                            Eventos realizados
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-5 d-flex justify-content-center">
                <div className="col-6 card-container">
                    <div className="card">
                        <div className="card__inner">
                            <div className="card__side card__side--front">
                                <div className="card__image-wrapper">
                                    <img
                                        src={dataImage}
                                        alt="Modifica tus datos"
                                        className="card__image"
                                    />
                                </div>
                                <div className="card__body card__body--flex">
                                    <h2 className="card__title">Modifica tus datos</h2>
                                    <i className="fa-solid fa-circle-arrow-right fa-2xl" />
                                </div>
                            </div>
                            <div className="card__side card__side--back">
                                <div className="card__body">
                                    <p>
                                        Mantén tu información actualizada y personaliza tu perfil según tus necesidades.
                                        Nuestra plataforma te permite modificar tus datos personales de manera sencilla y rápida.
                                        Actualiza tu foto de perfil, añade nuevas habilidades y mantén al día tus preferencias para recibir recomendaciones personalizadas.
                                    </p>
                                    </div>
                                <div className="card__body-btn d-flex justify-content-center align-items-end mb-5">
                                    <Link to="/eventos" className="link">
                                        <button className="btn btn--body-custom">
                                            Modificar datos
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 card-container">
                    <div className="card">
                        <div className="card__inner">
                            <div className="card__side card__side--front">
                                <div className="card__image-wrapper">
                                    <img
                                        src={companyImage}
                                        alt="Alta de Empresa"
                                        className="card__image"
                                    />
                                </div>
                                <div className="card__body card__body--flex">
                                    <h2 className="card__title">Alta de empresa</h2>
                                    <i className="fa-solid fa-circle-arrow-right fa-2xl" />
                                </div>
                            </div>
                            <div className="card__side card__side--back">
                                <div className="card__body">
                                    <p>
                                        Aprovecha al máximo nuestra plataforma dando de alta tu empresa.
                                        Destaca entre la competencia y promociona tus servicios y productos ante una audiencia profesional.
                                        Crea un perfil empresarial completo, muestra tu experiencia y amplía tus oportunidades de negocio en el mundo de los eventos.
                                    </p>
                                    </div>
                                <div className="card__body-btn d-flex justify-content-center align-items-end mb-5">
                                    <Link to="/companysignup" className="link">
                                        <button className="btn btn--body-custom">
                                            Registrar empresa
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center my-5">
                <div className="col-4 btn-col">
                    <Link to="/" className="link">
                        <button className="btn btn-custom">
                            Log out
                        </button>
                    </Link>
                </div>
            </div>


        </div>

    )
}