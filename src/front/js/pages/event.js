import React, { useEffect, useState } from "react";
import "../../styles/event.css";


export const Event = () => {
    const [eventos, setEventos] = useState([]);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [comment, setComment] = useState('');
    const [stars, setStars] = useState(0);

    const handleCommentClick = () => {
      setShowCommentForm(true);
    };

    const handleCommentSubmit = () => {
      // Aquí puedes enviar el comentario al backend y realizar las operaciones necesarias
      // para guardar la valoración en la base de datos
      // ...
  
      // Una vez que se envía el comentario, puedes cerrar la ventana emergente
      setShowCommentForm(false);
      setComment('');
    };

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
                <div key={evento.id}>
                    <div className="container my-5" >
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
                              <button className="buttoncom" onClick={handleCommentClick}>
                                <svg className="svg-icon" fill="none" height="22" viewBox="0 0 20 20" width="22" xmlns="http://www.w3.org/2000/svg"><g stroke="#fff" strokeLinecap="round" strokeWidth="1.5"><path d="m6.66669 6.66667h6.66671"></path><path clipRule="evenodd" d="m3.33331 5.00001c0-.92047.74619-1.66667 1.66667-1.66667h10.00002c.9205 0 1.6666.7462 1.6666 1.66667v6.66669c0 .9205-.7461 1.6666-1.6666 1.6666h-4.8274c-.1105 0-.21654.044-.29462.122l-2.50004 2.5c-.26249.2625-.71129.0766-.71129-.2945v-1.9108c0-.2301-.18655-.4167-.41667-.4167h-1.25c-.92048 0-1.66667-.7461-1.66667-1.6666z" fillRule="evenodd"></path><path d="m6.66669 10h2.5"></path></g></svg>
                                <span className="lable">Comment</span>
                              </button>
                              <a className="fancy" href="#">
                                <span className="top-key"></span>
                                <span className="text">Buy Tickets</span>
                                <span className="bottom-key-1"></span>
                                <span className="bottom-key-2"></span>
                              </a>
                            </div>

                            {showCommentForm && (
                              <div className="comment-form-overlay">
                                <div className="comment-form-container">
                                  <h2>Leave a Comment</h2>
                                  <div className="rating">
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
                                  </div>

                                  <textarea
                                    placeholder="Enter your comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  ></textarea>
                                  <button onClick={handleCommentSubmit}>Submit</button>
                                  <button onClick={() => setShowCommentForm(false)}>Cancel</button>
                                </div>
                              </div>
                            )}

                        </div>
                    </div>
            
             
           
                </div> 
                ))}
        </div>
    )
}