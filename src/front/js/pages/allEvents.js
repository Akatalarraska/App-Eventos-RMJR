import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/expandingCards.css";
import { ExpandingCards } from "../component/expandingCards";

export const AllEvents = () => {
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

  return (
    <div >
        <ExpandingCards/>

    </div>
  );
};
