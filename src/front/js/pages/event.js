import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/event.css";
import { Link } from "react-router-dom";

export const Event = () => {
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
    
    return (
        <div>

            {eventos.map(evento => (
                <div>
                    <div className="container my-5" key={evento.id}>
                        <h1 className="fw-normal text-body-emphasis">{evento.nombre}</h1>
                        <img src={evento.imagen} />
                        <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
                            <button type="button" className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill" ></button>
                            <h4 className="col-lg-6 mx-auto mb-4 text-body-emphasis">{evento.descripcion} </h4>
                            <p>{evento.ubicacion}</p>
                            <p>{evento.fecha_inicio + "~" + evento.fecha_fin}</p>
                            <p>{evento.personas} personas</p>
                            <p>{evento.free} It's free?</p>
                            <p>{evento.importe} €</p>
                            <button className="btn btn-primary px-5 mb-5" type="button">
                            Registration
                            </button>
                        </div>
                    </div>
            
                <p>Hola</p>
                <p>Hola</p>
           
                </div> 
                ))}
        </div>
    )
}