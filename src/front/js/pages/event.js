import React, { useEffect, useState,useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "../../styles/event.css";

export const Event = () => {
  const { store, actions } = useContext(Context);
  const [eventos, setEventos] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showFacturaForm, setShowFacturaForm] = useState(false);
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const { eventId } = useParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [numberOfTickets, setNumberOfTickets] = useState(1) // pre definido en 1 unidad por defecto

  // Formulario de comentarios
  const handleCommentClick = () => {
    setShowCommentForm(true);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    const valoracionData = {
      user_id: store.user.id,
      evento_id: eventId,
      estrellas: stars,
      comentario: comment,
    };

    fetch(process.env.BACKEND_URL + "/api/valoracion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valoracionData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("La valoración se guardó exitosamente");
          setFormSubmitted(true);
        } else {
          throw new Error("Error de respuesta: " + response.status);
        }
      })
      .catch((error) => {
        console.error(error);
        console.log("No se ha enviado tu valoración")// Maneja el error 
      });
  };

// Formulario de factura
  const handleFacturaClick = () => {
    setShowFacturaForm(true);
  };
  // Obtener la fecha actual
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString()

  const handleFacturaSubmit = (e) => {
    e.preventDefault()
    const facturaData = {
      user_id: store.user.id,
      evento_id: eventId,
      fecha: formattedDate,
      personas: numberOfTickets,
      precio: finalPrice,
    };

    fetch(process.env.BACKEND_URL + "/api/factura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(facturaData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("La factura se ha creado exitosamente");
          setFormSubmitted(true);
        } else {
          throw new Error("Error de respuesta: " + response.status);
        }
      })
      .catch((error) => {
        console.error(error);
        console.log("No se ha generado tu factura")// Maneja el error 
      });
  };

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/eventos")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error de respuesta: " + response.status);
      })
      .then((data) => {
        setEventos(data);
      })
      .catch((error) => {
        console.error(error);
      });
  
    if (formSubmitted) {
      setShowCommentForm(false);
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  const evento = eventos.find((evento) => evento.id === Number(eventId));
  if (!evento) {
    return <p>Evento no encontrado</p>;
  }
   
  const finalPrice = evento.importe * numberOfTickets;
    return (
        <div>
                    <div className="container my-5" >
                        <img className="eventimg" src={evento.imagen} />
                        <h1 className="fw-normal text-body-emphasis mt-2">{evento.nombre}</h1>
                        <div className="position-relative p-5  event-container">
                            <h4 className="col-lg-6  mb-4 text-body-emphasis">
                              <i className="fa-regular fa-clipboard"></i>
                              <span className="description">{evento.descripcion}</span>
                            </h4>
                            <p>
                              <i className="fa-solid fa-location-dot"></i>
                              <span className="icon-text">{evento.ubicacion}</span>
                            </p>
                            <p>
                              <i className="fa-regular fa-calendar"></i>
                              <span className="icon-text">
                                {evento.fecha_inicio} ~ {evento.fecha_fin}
                              </span>
                            </p>
                            <p>
                              <i className="fa-solid fa-people-group"></i>
                              <span className="icon-text">{evento.personas} personas</span>
                            </p>
                            <p>
                              <i className="fa-solid fa-coins"></i>
                              <span className="icon-text">{evento.importe} €</span>
                            </p>
                            <p>
                              <i className="fa-regular fa-money-check"></i>
                              <span className="icon-text">It's free?</span>
                            </p>

                            <div className="botones">
                              <button className="buttoncom" onClick={handleCommentClick}>
                                <svg className="svg-icon" fill="none" height="22" viewBox="0 0 20 20" width="22" xmlns="http://www.w3.org/2000/svg"><g stroke="#fff" strokeLinecap="round" strokeWidth="1.5"><path d="m6.66669 6.66667h6.66671"></path><path clipRule="evenodd" d="m3.33331 5.00001c0-.92047.74619-1.66667 1.66667-1.66667h10.00002c.9205 0 1.6666.7462 1.6666 1.66667v6.66669c0 .9205-.7461 1.6666-1.6666 1.6666h-4.8274c-.1105 0-.21654.044-.29462.122l-2.50004 2.5c-.26249.2625-.71129.0766-.71129-.2945v-1.9108c0-.2301-.18655-.4167-.41667-.4167h-1.25c-.92048 0-1.66667-.7461-1.66667-1.6666z" fillRule="evenodd"></path><path d="m6.66669 10h2.5"></path></g></svg>
                                <span className="lable">Comment</span>
                              </button>
                              <a className="fancy" onClick={handleFacturaClick} href="#">
                                <span className="top-key"></span>
                                <span className="text">Buy Tickets</span>
                                <span className="bottom-key-1"></span>
                                <span className="bottom-key-2"></span>
                              </a>
                        </div>

                        {showFacturaForm && (
                          <div className="comment-form-overlay">
                            <div className="comment-form-container">
                              <form onSubmit={handleFacturaSubmit}>
                                <h2>Your ticket</h2>
                                <h5 className="fw-normal text-body-emphasis mt-2">Event:{evento.nombre}</h5>
                                <h6 className="fw-normal text-body-emphasis mt-2">Price: {evento.importe} €</h6>
                              <input type="hidden" name="eventId" value="7" />
                              <select
                                name="numberOfTickets"
                                value={numberOfTickets}
                                onChange={(e) => setNumberOfTickets(parseInt(e.target.value))}
                              >
                                <option value="0">Seleccione el número de entradas</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                {/* Agrega más opciones según tus necesidades */}
                              </select>
                                
                                <h5 className="fw-normal text-body-emphasis mt-2">
                                Final price = {finalPrice} €</h5>
                             
                              <div className="botones mt-2">
                              
                                <button className="buton" id="cancel" onClick={() => setShowFacturaForm(false)}>Cancel<span></span></button>
                                <button className="buton" type="submit"> Buy
                                    <span></span>
                                </button>
                              </div>
                              </form>
                            </div>
                          </div>                                 
                        )}

                            {showCommentForm && (
                              <div className="comment-form-overlay">
                                <div className="comment-form-container">
                                  <form onSubmit={handleCommentSubmit}>
                                  <h2>Leave a Comment</h2>
                                  <div className="rating m-3">
                                    <input
                                      type="radio"
                                      name="star-radio"
                                      id="star-5"
                                      value="5"
                                      checked={stars === 5}
                                      onChange={() => setStars(5)}
                                    />
                                    <label htmlFor="star-5">
                                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                                      </svg>
                                    </label>
                                    <input
                                      type="radio"
                                      name="star-radio"
                                      id="star-4"
                                      value="4"
                                      checked={stars === 4}
                                      onChange={() => setStars(4)}
                                    />
                                    <label htmlFor="star-4">
                                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                                      </svg>
                                    </label>
                                    <input
                                      type="radio"
                                      name="star-radio"
                                      id="star-3"
                                      value="3"
                                      checked={stars === 3}
                                      onChange={() => setStars(3)}
                                    />
                                    <label htmlFor="star-3">
                                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                                      </svg>
                                    </label>
                                    <input
                                      type="radio"
                                      name="star-radio"
                                      id="star-2"
                                      value="2"
                                      checked={stars === 2}
                                      onChange={() => setStars(2)}
                                    />
                                    <label htmlFor="star-2">
                                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                                      </svg>
                                    </label>
                                    <input
                                      type="radio"
                                      name="star-radio"
                                      id="star-1"
                                      value="1"
                                      checked={stars === 1}
                                      onChange={() => setStars(1)}
                                    />
                                    <label htmlFor="star-1">
                                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                                      </svg>
                                    </label>
                                  </div>

                                  <textarea
                                    placeholder="Enter your comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  ></textarea>
                                  <div className="botones">
                                    <button className="buton" type="submit"> Submit
                                      <span></span>
                                    </button>
                                    <button className="buton" id="cancel" onClick={() => setShowCommentForm(false)}>Cancel<span></span></button>
                                  </div>
                                  </form>
                                </div>
                              </div>
                            )}
                        </div>
                    </div>
            
                </div> 
                )}
