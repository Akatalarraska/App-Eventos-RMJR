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
        setOpinions(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <br className="mt-3" />
      <h1>Tus Valoraciones</h1>
      {opinions.map((valoracion) => (
        <ul>
          <div id="opicontainer">	
          <div className="product-details">
            <img src={valoracion.evento.imagen}/>
            <div className="product-details-info">
              <h3 className="hint new">{valoracion.evento.nombre}</h3> 
              <span className="hint-star star">
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star-half-o" aria-hidden="true"></i>
                <i className="fa fa-star-o" aria-hidden="true"></i>
              </span>
              <p className="information"> {valoracion.comentario} </p>
            </div>
            <button className="button-64" role="button" id="opino">
                <span className="text">
                  <Link to={`/event/${valoracion.evento?.id}`}>+ info</Link>{" "}
                </span>
            </button>
          </div>
          </div>
        </ul>
      ))}
    </div>
  );
};
