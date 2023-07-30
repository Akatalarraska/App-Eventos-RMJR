import React from 'react';
import { useState, useContext } from 'react';
import eventImage from '../../img/event.png';
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/createevent.css";
import Swal from "sweetalert2";



export const CreateEvent = () => {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState(null);
    const [ubicacion, setUbicacion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [personas, setPersonas] = useState("");
    const [free, setFree] = useState(false);
    const [importe, setImporte] = useState("");

    const { store, actions } = useContext(Context);

    const navigate = useNavigate();


    const handleCreateEventSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await actions.createEvent(
                nombre,
                descripcion,
                imagen,
                ubicacion,
                fechaInicio,
                fechaFin,
                personas,
                free,
                importe
            );

            if (success) {
                await Swal.fire({
                    title: 'Enhorabuena',
                    text: 'Evento creado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
                navigate('/private');
            } else {
                throw new Error("No se pudo crear el evento");
            }
        } catch (error) {
            await Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };



    const handleCheckboxChange = (event) => {
        const isFree = event.target.checked;
        setFree(isFree);

        if (isFree) {
            setImporte(0);
        }
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
                            <div className="col-8 col-xl-10 col-lg-10 form-group">
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
                            <div className="col-8 col-xl-10 col-lg-10 form-group">
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
                            <div className="col-8 col-xl-10 col-lg-10 form-group">
                                <input
                                    id="formFile"
                                    name="imagen"
                                    className="form-control form-control-event-create form-control-lg"
                                    placeholder="Imagen del evento"
                                    type="file"
                                    accept='image/*'
                                    defaultValue={imagen ? imagen.name : ""}
                                    onChange={(event) => setImagen(event.target.files)}
                                />
                            </div>
                        </div>
                        <div className="row m-3 d-flex justify-content-center " >
                            <div className="dropdown col-8 col-xl-10 col-lg-10 form-group">
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
                        <div className="row m-3 d-flex justify-content-center" >
                            <div className="col-4 col-xl-5 col-lg-5 form-group">
                                <label htmlFor="Fecha de inicio" className='m-1'>Fecha de inicio</label>
                                <input
                                    type="date"
                                    id="Fecha de inicio"
                                    name="Fecha de inicio"
                                    value={fechaInicio}
                                    onChange={(event) => setFechaInicio(event.target.value)}
                                    min={new Date().toISOString().split("T")[0]} 
                                    className="form-control form-control-event-create form-control-lg"
                                />

                            </div>
                            <div className="col-4 col-xl-5 col-lg-5 form-group">
                                <label htmlFor="Fecha de fin" className='m-1'>Fecha de fin</label>
                                <input
                                    type="date"
                                    value={fechaFin}
                                    id="Fecha de fin"
                                    name="Fecha de fin"
                                    onChange={(event) => setFechaFin(event.target.value)}
                                    min={fechaInicio} 
                                    className="form-control form-control-event-create form-control-lg"
                                />
                            </div>
                        </div>
                        <div className="row m-3 d-flex justify-content-center align-items-end" >
                            <div className="col-4 col-xl-5 col-lg-5 form-group">
                                <label htmlFor="personas" className='ms-1'>Número de asistentes</label>
                                <input
                                    type="number"
                                    id="personas"
                                    name="personas"
                                    className="form-control form-control-event-create form-control-lg"
                                    required
                                    min="1"
                                    value={personas}
                                    onChange={(event) => setPersonas(event.target.value)
                                    }
                                />
                            </div>
                            <div className="col-4 col-xl-5 col-lg-5 form-group">
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
                        </div>
                        <div className="row m-3 align-items-end" >
                            <div className="col-8 col-xl-10 col-lg-10 form-group">
                                <div className="form-check d-flex align-items-center">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="free"
                                        name="free"
                                        checked={free}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label m-2" htmlFor="free">
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
