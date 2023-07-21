import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/factura.css";

export const Factura = () => {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
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
        // Obtener los IDs de los eventos asociados a las facturas
        const eventoIds = data.map(factura => factura.evento_id);
        // Obtener los detalles de los eventos usando los IDs obtenidos
        fetch(process.env.BACKEND_URL + "/api/eventos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          /* body: JSON.stringify({ eventoIds })*/
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Error de respuesta: " + response.status);
          })
          .then(eventosData => {
            // Combinar los detalles de los eventos con las facturas
            const facturasConEventos = data.map(factura => {
              const evento = eventosData.find(evento => evento.id === factura.evento_id);
              return { ...factura, evento };
            });
            setFacturas(facturasConEventos);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="invoicecard">
      <br className="mt-3"/>
      <h1>Tus facturas</h1>
      <div className="l-col-right ticket-wrap">
        {facturas.map(factura => (
          <div className="ticket" key={factura.id} aria-hidden="true">
            <div className="ticket__header">
              <div className="ticket__co">
                <span className="ticket__co-name">{factura.evento ? factura.evento.nombre : "Nombre del evento"}</span>
              </div>
            </div>
            <div className="ticket__body">
              <p className="ticket__description">Descripción evento</p>
              <div className="ticket__timing">
                <p>
                  <span className="u-upper ticket__small-label">Date</span>
                  <span className="ticket__detail">{factura.fecha}</span>
                </p>
                <p>
                  <span className="u-upper ticket__small-label">Where</span>
                  <span className="ticket__detail">Ubicación</span>
                </p>
              </div>
              <p className="ticket__fine-print">Units: {factura.cantidad} PAX</p>
              <p className="u-upper ticket__admit">Precio {factura.precio} €</p>
              <img className="ticket__barcode" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/515428/barcode.png" alt="Fake barcode" />
              <button className="button-64" role="button">
                  <span className="text">
                    <Link to={`/event/${factura.evento?.id}`}>+ info</Link> {/* Use ?. to access "id" */}
                  </span>
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};