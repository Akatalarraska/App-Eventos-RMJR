import React, { useEffect, useState } from "react";
import "../../styles/expandingCards.css";

export const ExpandingCards = () => {
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
    <div className="eventcard">
      <div className="container marketing">
        <div className="row">
          {eventos.map(evento => (
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
          ))}
        </div>
      </div>
    </div>
  );
};
