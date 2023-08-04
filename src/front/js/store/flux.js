const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			user: {
				email: "",
				token: null,
				id: "",

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

			empresa: {
				cif: "",
				razon_social: "",
				email: "",
				telefono: "",
				poblacion: "",
				direccion: "",
				codigo_postal: "",


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
					return true;
				} catch (error) {
					console.log("Error creating user", error);
					return false;
				}
			},



			userLogin: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login/", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer" + sessionStorage.getItem("token")
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
							id: data.id,
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
						"Content-Type": "application/json",
						'Authorization': 'Bearer ' + sessionStorage.getItem('token')
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



			updateUserData: async (userId, name, dni, email, password) => {
				try {
					const modifiedUser = {
						id: userId,
						name: name,
						dni: dni,
						email: email,
						password: password,
					};

					const response = await fetch(process.env.BACKEND_URL + `/api/modify_user_data/${userId}`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + sessionStorage.getItem("token"),
						},
						body: JSON.stringify(modifiedUser),
					});
					console.log("response", response);
					if (!response.ok) {
						throw new Error("Error updating user data");
					}
					const data = await response.json();
					setStore({
						user: data,
					})
					return true;
				} catch (error) {
					console.log("Error updating user data", error);
					throw error;
				}
			},



			createEvent: async (nombre, descripcion, imagen, ubicacion, fechaInicio, fechaFin, personas, free, importe) => {
				try {
					const store = getStore();
					const userId = store.user.id;

					const newEvent = new FormData();
					newEvent.append("nombre", nombre);
					newEvent.append("descripcion", descripcion);
					newEvent.append("imagen", imagen[0]);
					newEvent.append("ubicacion", ubicacion);
					newEvent.append("fechaInicio", fechaInicio);
					newEvent.append("fechaFin", fechaFin);
					newEvent.append("personas", personas);
					newEvent.append("free", free);
					newEvent.append("importe", importe);
					newEvent.append("user_id", userId);

					const response = await fetch(process.env.BACKEND_URL + "/api/crearevento", {
						method: "POST",
						body: newEvent,
					});

					if (response.ok) {
						setStore({ event: newEvent });
						console.log(store.event);
						return true;
					} else {
						throw new Error("Error al crear el evento");
					}
				} catch (error) {
					console.log("Error creating event", error);
					throw new Error("Error al crear el evento");
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

			requestPasswordReset: async (email) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/forgotpassword", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email: email }),
					});

					if (!response.ok) {
						throw new Error("Error requesting password reset");
					}
					return true;
				} catch (error) {
					console.log("Error requesting password reset", error);
					throw error;
				}
			},

			resetPassword: async (email, newPassword) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/password-reset", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: email,
							password: newPassword
						}),
					});
			
					if (response.ok) {
						return true; // Return true for success
					} else {
						throw new Error("Error resetting password");
					}
				} catch (error) {
					console.log("Error resetting password", error);
					throw error;
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
