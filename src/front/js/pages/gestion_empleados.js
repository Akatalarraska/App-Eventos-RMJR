import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/gestion_empleados.css";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


export const Gestion_empleados = () => {
  const [empresas, setEmpresas] = useState([]);
  const { empresaId } = useParams();

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/empresa")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error de respuesta: " + response.status);
      })
      .then(data => {
        setEmpresas(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const empresa = empresas.find((empresa) => empresa.id === Number(empresaId));
  if (!empresa) {
    return <p>Empresa no encontrado</p>;}


  return (
    <div className="empresa">
        <h1 className="fw-normal text-body-emphasis mt-2">{empresa.razon_social}</h1>
        <span className="description">{empresa.cif}</span>
        <p> {empresa.poblacion}   </p>
        <p> {empresa.email}</p>
                            
    </div>
  );
};
