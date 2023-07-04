import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/event.css";
import { Link } from "react-router-dom";

export const Event = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetch("https://akatalarraska-didactic-trout-pv4x575rp9pf65pj-3001.preview.app.github.dev/api/eventos")
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Error de respuesta: " + response.status);
          })
          .then(data => {
            setEventos(data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    
    return (
        <div>

            {eventos.map(evento => (
                <div>
                    <div className="container my-5">
                        <h1 className="fw-normal">{evento.nombre}</h1>
                        <img src={evento.imagen} />
                        <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
                            <button type="button" className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill" ></button>
                            <h1 className="text-body-emphasis">Placeholder jumbotron</h1>
                            <p className="col-lg-6 mx-auto mb-4">
                            This faded back jumbotron is useful for placeholder content. content is available and to encourage visitors to take a specific action.
                            </p>
                            <button className="btn btn-primary px-5 mb-5" type="button">
                            Registration
                            </button>
                        </div>
                    </div>
                            <div className="col-lg-4 col-sm-6" key={evento.id}>
                            <div className="flip-card">
                                <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img
                                    className="bd-placeholder-img rounded"
                                    width="400"
                                    height="400"
                                    src={evento.imagen}
                                    alt={evento.nombre}
                                    />
                                </div>
                                <div className="flip-card-back">
                                    <img src={evento.imagen} alt={evento.nombre} />
                                    <div className="flip-card-back-content">
                                        <h6 className="fw-normal pt-2">{evento.descripcion}</h6>
                                        <p>{evento.ubicacion}</p>
                                        <p>{evento.fecha_inicio + "~" + evento.fecha_fin}</p>
                                        <p>{evento.personas} personas</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="fw-normal">{evento.nombre}</h3>
                            </div>  
                </div>))}

            
            <p>Hola</p>
            <p>Hola</p>
            <p>Hola</p>
            <p>Hola</p>
            <p>Hola</p>
            <p>Hola</p>
            <p>Hola</p>
            <p>Hola</p>
            <p>Hola</p>
            <p>Hola</p>
            <p>Hola</p>
        </div>
    )
}