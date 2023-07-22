import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/valoracion.css";

export const Valoracion = () => {
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/my_opinion", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      },
    }) 
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error de respuesta: " + response.status);
      })
      .then(data => {
       setOpinions(data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="invoicecard">
      <br className="mt-3" />
      <h1>Tus Valoraciones</h1>
      <div className="l-col-right ticket-wrap">
        {opinions.map((valoracion) => (
          <div className="ticket" key={valoracion.id} aria-hidden="true">
            <div className="ticket__header">
              <div className="ticket__co">
                <span className="ticket__co-name">
                  {valoracion.evento ? valoracion.evento.nombre : "Nombre del evento"}
                </span>
              </div>
            </div>
            <div className="ticket__body">
              <button className="button-64" role="button">
                <span className="text">
                  <Link to={`/event/${valoracion.evento?.id}`}>+ info</Link>{" "}
                </span>
              </button>
              <div className="ticket__timing">
                <p>
                  <span className="u-upper ticket__small-label">Stars</span>
                  <span className="ticket__detail">
                    {valoracion.estrellas}
                  </span>
                </p>
              </div>
              <p className="u-upper ticket__admit">Precio {valoracion.comentario} €</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};