import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/gestion_empleados.css";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Gestion_empleados = () => {
  const [empresa, setEmpresa] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { store } = useContext(Context);

  useEffect(() => {
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
  }, []);

  if (!empresa) {
    return <p>Empresa no encontrada</p>;
  }

  const handleAddEmpleado = () => {
    if (selectedUser) {
      fetch(process.env.BACKEND_URL + "/api/adduser_empresa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${store.token}`
        },
        body: JSON.stringify({
          email: selectedUser.email
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error de respuesta: " + response.status);
        })
        .then(data => {
          // Actualizar la lista de empresas después de agregar un empleado
          setEmpresas(prevEmpresas => [...prevEmpresas, data]);

          console.log("Empleado agregado:", data);
        })
        .catch(error => {
          console.error("Error al agregar el empleado:", error);
        });
    }
  };

  const handleUserSelect = user => {
    setSelectedUser(user);
  };

  return (
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
      
      <h1>Lista de usuarios:</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleUserSelect(user)}>Seleccionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <div>
          <p>Usuario seleccionado: {selectedUser.name}</p>
          <button onClick={handleAddEmpleado}>Agregar empleado</button>
        </div>
      )}
      <h1>Tus empleados:</h1>
    </div>
  );
};
