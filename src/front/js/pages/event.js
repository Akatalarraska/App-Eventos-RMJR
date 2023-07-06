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
                            <div className="botones">
                              <button className="btn btn-primary px-5 mb-5" type="button">
                              Registration
                              </button>
                              <button className="buttoncom">
                                <svg className="svg-icon" fill="none" height="22" viewBox="0 0 20 20" width="22" xmlns="http://www.w3.org/2000/svg"><g stroke="#fff" stroke-linecap="round" stroke-width="1.5"><path d="m6.66669 6.66667h6.66671"></path><path clip-rule="evenodd" d="m3.33331 5.00001c0-.92047.74619-1.66667 1.66667-1.66667h10.00002c.9205 0 1.6666.7462 1.6666 1.66667v6.66669c0 .9205-.7461 1.6666-1.6666 1.6666h-4.8274c-.1105 0-.21654.044-.29462.122l-2.50004 2.5c-.26249.2625-.71129.0766-.71129-.2945v-1.9108c0-.2301-.18655-.4167-.41667-.4167h-1.25c-.92048 0-1.66667-.7461-1.66667-1.6666z" fill-rule="evenodd"></path><path d="m6.66669 10h2.5"></path></g></svg>
                                <span className="lable">Comment</span>
                              </button>
                              <a className="fancy" href="#">
                                <span className="top-key"></span>
                                <span className="text">Buy Tickets</span>
                                <span className="bottom-key-1"></span>
                                <span className="bottom-key-2"></span>
                              </a>
                            </div>

                        </div>
                    </div>
            
                <p>Hola</p>
                <p>Hola</p>
           
                </div> 
                ))}
        </div>
    )
}