const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			user: {
				email: "",
				token: null,
				id: ""
			},

			company: {
			},
			
			evento: {
				nombre: "",
				descripcion: "",
				imagen: null,
				ubicacion: "",
				fechaInicio: "",
				fechaFin: "",
				personas: "",
				free: false,
				importe: "",
			},

			cities: ["Albacete", "Alicante", "Almería", "Ávila", "Badajoz", "Barcelona", "Bilbao", "Burgos", "Castellón", "Ceuta", "Ciudad Real", "Cuenca", "Cáceres", "Cádiz", "Córdoba", "Gerona", "Granada", "Guadalajara", "Huelva", "Huesca", "Jaén", "La Coruña", "Las Palmas de Gran Canaria", "León", "Logroño", "Lugo", "Lérida", "Madrid", "Melilla", "Murcia", "Málaga", "Orense", "Oviedo", "Palencia", "Palma de Mallorca", "Pamplona", "Pontevedra", "Salamanca", "San Sebastián", "Santa Cruz de Tenerife", "Santander", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vitoria", "Zamora", "Zaragoza"],
		},
		actions: {



			userSignup: async (name, dni, email, password) => {
				try {
				  const newUser = {
					name: name,
					dni: dni,
					email: email,
					password: password,
				  };
			  
				  const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify(newUser),
				  });
			  
				  if (!response.ok) {
					throw new Error("Error creating user");
				  }
			  
				  const data = await response.json();
				  return true; // El usuario se registró exitosamente
				} catch (error) {
				  console.log("Error creating user", error);
				  return false; // Hubo un error al registrar al usuario
				}
			  },
			  


			userLogin: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					})
					if (response.status !== 200) {
						throw new Error("Error en la solicitud de inicio de sesión");
					}
					const data = await response.json()
					console.log("data", data)
					sessionStorage.setItem("email", data.email);
					sessionStorage.setItem("token", data.token);
					sessionStorage.setItem("id", data.id);
					setStore({
						user: {
							email: data.email,
							token: data.token,
							id: data.id
						}
					})
					return data;
				} catch (error) {
					console.log("Error logging in user", error);
					throw error;
				  }
			},

			userLogOut: () => {
				sessionStorage.removeItem("token");
				setStore({
					user: {
						email: "",
						token: null,
						id: ""
					}
				})
			},




			companySignup: (razonSocial, cif, direccion, codigoPostal, poblacion, telefono, email) => {

				const newCompany = {
					razonSocial: razonSocial,
					cif: cif,
					direccion: direccion,
					codigoPostal: codigoPostal,
					poblacion: poblacion,
					telefono: telefono,
					email: email
				}
				fetch(process.env.BACKEND_URL + "/api/companysignup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newCompany)
				})
					.then(resp => resp.json())
					.then(data => {
						console.log("data", data)
						setStore({ company: newCompany });
					})
					.catch(error => console.log("Error creating company", error));
			},



			createEvent: async (nombre, descripcion, imagen, ubicacion, fechaInicio, fechaFin, personas, free, importe) => {
				
				try {
				const store = getStore();
				const userId = store.user.id;
			
				const newEvent = {
					nombre: nombre,
					descripcion: descripcion,
					imagen: imagen,
					ubicacion: ubicacion,
					fechaInicio: fechaInicio,
					fechaFin: fechaFin,
					personas: personas,
					free: free,
					importe: importe,
					user_id: userId,
				};
			
				
				const response = await fetch(process.env.BACKEND_URL + "/api/crearevento", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json"
					},
					body: JSON.stringify(newEvent)
				  });
			  
				  if (response.ok) {
					const data = await response.json();
					setStore({ event: newEvent });
					console.log("data", data);
					return true; // Indicar que la creación del evento fue exitosa
				  } else {
					throw new Error("Error al crear el evento"); // Lanzar un error en caso de respuesta no exitosa
				  }
				} catch (error) {
				  console.log("Error creating event", error);
				  throw new Error("Error al crear el evento"); // Lanzar un error en caso de excepción
				}
			  },
			


			

			keepStoredData: () => {
				const storedToken = sessionStorage.getItem("token");
				const storedEmail = sessionStorage.getItem("email");
				const storedId = sessionStorage.getItem("id");
				if (storedToken) {
				  setStore({
					user: {
						id: storedId,
					  	token: storedToken,
					  	email: storedEmail,
					}
				  });
				}
			  },
			  
			  
		}
	};
};

export default getState;





//// FUNCIÓN PARA CREAR EVENTO, SIN ASYNC-AWAIT, POR SI ACASO /////

			// createEvent: (nombre, descripcion, imagen, ubicacion, fechaInicio, fechaFin, personas, free, importe) => {


			// 	const store = getStore();
			// 	const userId = store.user.id; 

			// 	const newEvent = {
			// 		nombre: nombre,
			// 		descripcion: descripcion,
			// 		imagen: imagen,
			// 		ubicacion: ubicacion,
			// 		fechaInicio: fechaInicio,
			// 		fechaFin: fechaFin,
			// 		personas: personas,
			// 		free: free,
			// 		importe: importe,
			// 		user_id: userId,
			// 	}

			// 	fetch(process.env.BACKEND_URL + "/api/crearevento", {
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json"
			// 		},
			// 		body: JSON.stringify(newEvent)
			// 	})
			// 		.then(resp => resp.json())
			// 		.then(data => {
			// 			setStore({ event: newEvent });
			// 			console.log("data", data);
			// 		})
			// 		.catch(error => console.log("Error creating event", error));
			// },	
			