import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StarRating } from "../component/starRating";
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
        setOpinions(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <br className="mt-3" />
      <h1 className="mb-3">Tus Valoraciones</h1>
      <div className="opiniones">
        {opinions.map((valoracion) => (
          <div className="opinion-card" key={valoracion.id}>
            <div className="image-container">
              <img src={valoracion.evento.imagen} alt="Evento" />
              <button className="button-64" role="button" id="opino">
                <span className="text">
                  <Link to={`/event/${valoracion.evento?.id}`}>+ info</Link>{" "}
                </span>
              </button>
            </div>
            <div className="details-container">
              <h2 className="opinion-title">{valoracion.evento.nombre}</h2>
              <StarRating rating={valoracion.estrellas} />
              <p className="information">{valoracion.comentario}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
