import React, { useEffect, useState } from "react";
import "../../styles/home.css";



export const ExpandingCards = () => {

	const [eventos, setEventos] = useState([]);
    
    useEffect(() => {
		fetch("https://akatalarraska-laughing-spoon-wrv5vv69wx93v57q-3001.preview.app.github.dev//api/eventos")
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
    
    
    return(
        <>
            <div className="eventcard">
					<div className="container marketing">
						<div className="row">
						{eventos.map(evento => (
							<div className="col-lg-3 col-sm-6" key={evento.id}>
							<img
								className="bd-placeholder-img rounded"
								width="240"
								height="200"
								src={evento.imagen}
								role="img"
							/>
							<h2 className="fw-normal">{evento.nombre}</h2>
							<p>{evento.descripcion}</p>
							</div>
						))}
						</div>
					</div>
				</div>

        </>
    )
}
