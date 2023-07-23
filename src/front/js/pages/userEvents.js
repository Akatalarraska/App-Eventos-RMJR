import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";

export const UserEvents = () => {
    const [userEvents, setUserEvents] = useState([]);
  
    useEffect(() => {
      // Aquí realizamos la llamada a la API de "facturas" para obtener las facturas del usuario
      fetch(process.env.BACKEND_URL + "/api/myinvoice", {
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
          // Obtenemos los eventos relacionados con las facturas obtenidas
          const events = data.map(factura => factura.evento);
          setUserEvents(events);
          console.log("User events", events);  
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    return (
      <div className="container mt-5">
        <h1 className="mb-4">Tus eventos</h1>
        <div className="row">
          {userEvents.map(event => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={event.id}>
              <div className="card-event">
                <img src={event.imagen}                       className="bd-placeholder-img rounded"
                      width="400"
                      height="400"alt="Evento" />
                <div className="card-body">
                  <h5 className="card-title">{event.nombre}</h5>
                  <p className="card-text">{event.descripcion}</p>
                  <Link to={`/event/${event.id}`} className="btn btn-primary">
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };