import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/expandingCards.css";

export const ExpandingCards = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/eventos")
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

  // Define el eventId aquí antes de usarlo en la línea siguiente
  const eventId = 1; // Reemplaza esto con el valor correcto del evento que deseas mostrar

  const evento = eventos.find(evento => evento.id === eventId);
  if (!evento) {
    return <p>Evento no encontrado</p>;
  }

  // Solo muestra los primeros 6 eventos
  const primeros6Eventos = eventos.slice(0, 80);

  // Mezcla los eventos
  primeros6Eventos.sort(() => Math.random() - 0.5);

  return (
    <div className="eventcard">
      <div className="container marketing">
        <div className="row">
          {primeros6Eventos.slice(0, 6).map(evento => (
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
                      <button className="button-64" role="button">
                        <span className="text">
                          <Link to={`/event/${evento.id}`}>+ info</Link>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="fw-normal mb-4">{evento.nombre}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
