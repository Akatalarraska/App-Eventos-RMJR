import React, { useEffect, useState, useContext } from "react";
import "../../styles/gestion_empleados.css";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Gestion_empleados = () => {
  const [empresa, setEmpresa] = useState();
  const [users, setUsers] = useState([]);
  const [newEmployeeEmail, setNewEmployeeEmail] = useState(""); // Estado para almacenar el email ingresado
  const { store } = useContext(Context);
  const user_empresa = users.find(user => user.email === newEmployeeEmail);
  
  const get_empresas = () => {
    fetch(process.env.BACKEND_URL + "/api/myempresa",{
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error de respuesta: " + response.status);
      })
      .then(data => {
        setEmpresa(data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  useEffect(() => {
    get_empresas()
  }, []);

  if (!empresa) {
    return <p>Empresa no encontrada</p>;
  }

  const handleAddEmpleado = () => {
    if (newEmployeeEmail) {
      fetch(process.env.BACKEND_URL + '/api/adduser_empresa', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
          email: newEmployeeEmail // Utiliza el email ingresado en el formulario
          
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error de respuesta: " + response.status);
        })
        .then(data => {
          get_empresas()
        })
        .catch(error => {
          console.error("Error al agregar el empleado:", error);
        });
    }
  };
  
  
  return empresa ? (

    <div className="empresa">
      <br />
      <br />
      <br />
      <div className="p-5 mb-2 infoe bg-body-tertiary rounded-3">
        <div className="container-fluid py-2">
          <h1 className="display-5 fw-bold">{empresa.razon_social}</h1>
          <div className="row infoempresa cl-4">
            <div className="col-md-4">
              <p>CIF: {empresa.cif}</p>
            </div>
            <div className="col-md-4">
              <p>Población: {empresa.poblacion}</p>
            </div>
            <div className="col-md-4">
              <p>Email: {empresa.email}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="add_user">
      <h4 className="inviteh4 mt-3 mb-3">Agregar nuevo empleado:</h4>
        <div className="row inputuser">
          <div className="inputer">
            <input 
            type="text"
            value={newEmployeeEmail}
            onChange={e => setNewEmployeeEmail(e.target.value)}
            placeholder="Email del nuevo empleado"/>
            <button className="invite-btn"  onClick={handleAddEmpleado}> Añadir </button>
          </div>
        </div>
      </div>

      <h1>Tus empleados:</h1>      
       
      <ul className="employers">
        {empresa ? empresa.users.map((user,index) => (
          <li  key={index}>
            <p className="worker"><strong>Email:</strong> {user.email} // <strong>Nombre:</strong> {user.name}</p>
            {user === user_empresa && (<span></span>)}
          </li>
          
        )): ""}
      
      </ul> 
      
    </div>
  ) : "";
};
