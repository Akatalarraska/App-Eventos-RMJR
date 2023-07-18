import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/gestion_empleados.css";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const Gestion_empleados = () => {
  const [empresas, setEmpresas] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { empresaId } = useParams();
  const { store } = useContext(Context);

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

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/users", {
      /*
      headers: {
        Authorization: `Bearer ${store.token}`
      }
      */
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error de respuesta: " + response.status);
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const empresa = empresas.find(empresa => empresa.id === Number(empresaId));
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
      <h1 className="mt-5">Tu empresa:</h1>
      <div>
        <h2 className="fw-normal text-body-emphasis mt-2">{empresa.razon_social}</h2>
        <h2 className="cif fw-normal text-body-emphasis mt-2">{empresa.cif}</h2>
        <p>{empresa.poblacion}</p>
        <p>{empresa.email}</p>
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
