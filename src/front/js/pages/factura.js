import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/factura.css";

export const Factura = () => {
  const [factura, setFactura] = useState([]);

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/factura")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error de respuesta: " + response.status);
      })
      .then(data => {
        setFactura(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Obtener los datos del evento asociado a cada factura
    const fetchEventos = async () => {
      try {
        const facturasConEventos = await Promise.all(
          facturas.map(async factura => {
            const response = await fetch(
              process.env.BACKEND_URL + `/api/evento/${factura.evento_id}`
            );
            if (response.ok) {
              const evento = await response.json();
              return { ...factura, evento };
            }
            throw new Error("Error de respuesta: " + response.status);
          })
        );
        setFacturas(facturasConEventos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventos();
  }, [facturas]);

  return (
    <div className="invoicecard">
      <div className="row">
        {facturas.map(factura => (
          <div className="col-lg-4 col-sm-6" key={factura.id}>
            <div className="flip-card">
              <div className="flip-card-back-content">
                
                <p>{factura.precio}</p>
                <p>{factura.fecha}</p>
                <p>{factura.cantidad}</p>
                <p>{factura.evento}</p>
                <button className="button-64" role="button">
                  <span className="text">
                    <Link to={`/event/${factura.evento.id}`}>+ info</Link>
                  </span>
                </button>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};