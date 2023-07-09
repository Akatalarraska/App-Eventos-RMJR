import React from 'react';
import { useState, useContext, useEffect } from 'react';
import eventImage from '../../img/event.png';
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/createevent.css";


export const CreateEvent = () => {



    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [personas, setPersonas] = useState("");
    const [free, setFree] = useState(false);
    const [importe, setImporte] = useState("");

    const { store, actions } = useContext(Context);

    const handleCreateEventSubmit = (e) => {
        e.preventDefault();
        actions.createEvent(nombre, descripcion, imagen, ubicacion, fechaInicio, fechaFin, personas, free, importe);
    };


    const handleCheckboxChange = (event) => {
        setFree(event.target.checked);
    };


    return (

        <div className="container-fluid mt-5">
            <div className="row d-flex justify-content-center align-items-center ">
                <div className="col-xl-8 col-lg-8">
                    <form className="create-event-form m-5" onSubmit={handleCreateEventSubmit}>
                        <h3 className="fw-bold mt-5 mb-2 text-center text-black">
                            Crea tu evento
                        </h3>
                        <div className="row m-3 d-flex justify-content-center " >
                            <div className="col-xl-8 col-lg-8">
                                <label htmlFor="nombre" className='ms-1'>Nombre del evento</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    className="form-control form-control-event-create form-control-lg"
                                    placeholder=""
                                    required
                                    value={nombre}
                                    onChange={(event) => setNombre(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="row m-3 d-flex justify-content-center ">
                            <div className="col-xl-8 col-lg-8">
                                <label htmlFor="descripcion" className='ms-1'>Describe tu evento</label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    className="form-control form-control-event-create form-control-lg"
                                    placeholder=""
                                    required
                                    style={{ height: 100 }}
                                    value={descripcion}
                                    onChange={(event) => setDescripcion(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row m-3 d-flex justify-content-center " >
                            <div className="col-xl-8 col-lg-8">
                                <label htmlFor="imagen" className='ms-1'>Imagen del evento</label>
                                <input
                                    id="imagen"
                                    name="imagen"
                                    className="form-control form-control-event-create form-control-lg"
                                    placeholder="(URL)"
                                    type="text"
                                    value={imagen}
                                    onChange={(event) => setImagen(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row m-3 d-flex justify-content-center " >
                            <div className="dropdown col-xl-8 col-lg-8">
                                <label htmlFor="ubicacion">Ubicación</label>
                                <select
                                    id="ubicacion"
                                    name="ubicacion"
                                    className="form-control form-control-event-create form-control-lg"
                                    required
                                    value={ubicacion}
                                    onChange={(event) => setUbicacion(event.target.value)}
                                >
                                    <option value="">Seleccione una ubicación</option>
                                    {store.cities.map((city) => (
                                        <option key={city}>{city}</option>
                                    ))}

                                </select>
                            </div>
                        </div>

                        <div className="row m-3 d-flex justify-content-center " >
                            <div className="col-xl-2 col-lg-2">
                                <label htmlFor="fechaInicio" className='ms-1'>Fecha de inicio</label>
                                <input
                                    type="date"
                                    id="Fecha de inicio"
                                    name="Fecha de inicio"
                                    className="form-control form-control-event-create form-control-lg"
                                    placeholder="Fecha de inicio"
                                    required
                                    value={fechaInicio}
                                    onChange={(event) => setFechaInicio(event.target.value)
                                    }
                                />
                            </div>
                            <div className="col-xl-2 col-lg-2">
                                <label htmlFor="fechaFIn" className='ms-1'>Fecha de fin</label>
                                <input
                                    type="date"
                                    id="Fecha de fin"
                                    name="Fecha de fin"
                                    className="form-control form-control-event-create form-control-lg"
                                    placeholder="Fecha de fin"
                                    required
                                    value={fechaFin}
                                    onChange={(event) => setFechaFin(event.target.value)
                                    }
                                />
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <label htmlFor="personas" className='ms-1'>Número aproximado de asistentes</label>
                                <input
                                    type="number"
                                    id="personas"
                                    name="personas"
                                    className="form-control form-control-event-create form-control-lg"
                                    placeholder="Número de personas"
                                    required
                                    min="1"
                                    value={personas}
                                    onChange={(event) => setPersonas(event.target.value)
                                    }
                                />
                            </div>
                        </div>


                        <div className="row m-3  d-flex justify-content-center " >
                        <div className="col-xl-4 col-lg-4">
                                <label htmlFor="Importe" className='ms-1'>Importe por persona</label>
                                <input
                                    type="number"
                                    id="Importe"
                                    name="Importe"
                                    className="form-control form-control-event-create form-control-lg"
                                    placeholder="€"
                                    required
                                    min="1"
                                    value={importe}
                                    onChange={(event) => setImporte(event.target.value)}
                                    disabled={free}
                                />
                            </div>
                            <div className="col-xl-4 col-lg-4 d-flex align-items-end">
                                <div className="form-check d-flex align-items-center">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="free"
                                        name="free"
                                        checked={free}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label m-2" htmlFor="flexCheckDefault">
                                        Marcar si el evento es gratuito
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row m-3 d-flex justify-content-center " >
                            <div className="col-xl-8 col-lg-8 d-flex justify-content-center">
                                <button type="submit" className="btn btn-lg btn-dark text-white btn-user-signup">
                                    Crear evento
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

/////////////////// IMAGEN DEL FORMULARIO CREAR EVENTO //////////////////////

{/* <div className="col-xl-8 col-lg-8 text-align-center">
                    <img src={eventImage} alt="Imagen de registro de usuario" className="img-create-event" />
                </div> */}


/////////////////// INPUT PARA SUBIR ARCHIVO (REVISAR, NO FUNCIONA) //////////////////////

            //     <div className="row m-3 d-flex justify-content-center " >
            //     <div className="col-xl-8 col-lg-8">
            //         <input
            //             id="formFile"
            //             name="imagen"
            //             className="form-control form-control-event-create form-control-lg"
            //             placeholder="Imagen del evento"
            //             type="file"
            //             accept='image/*'
            //             defaultValue={imagen ? imagen.name : ""}
            //             onChange={handleFileChange}
            //         />
            //     </div>
            // </div>


////////////////  FUNCION PARA GESTIONAR EL ARCHIVO IMAGEN /////////////////

            // const handleFileChange = (event) => {
            //     const file = event.target.files[0];
            //     setImagen(file);
            // };