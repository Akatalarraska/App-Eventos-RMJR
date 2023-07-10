const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			user: {
				email: "",
				token: null
			},

			company: {
			},
			
			event: {
				nombre: "",
				descripcion: "",
				imagen: "",
				ubicacion: "",
				fechaInicio: "",
				fechaFin: "",
				personas: "",
				free: false,
				importe: ""
			},

			cities: ["Albacete", "Alicante", "Almería", "Ávila", "Badajoz", "Barcelona", "Bilbao", "Burgos", "Castellón", "Ceuta", "Ciudad Real", "Cuenca", "Cáceres", "Cádiz", "Córdoba", "Gerona", "Granada", "Guadalajara", "Huelva", "Huesca", "Jaén", "La Coruña", "Las Palmas de Gran Canaria", "León", "Logroño", "Lugo", "Lérida", "Madrid", "Melilla", "Murcia", "Málaga", "Orense", "Oviedo", "Palencia", "Palma de Mallorca", "Pamplona", "Pontevedra", "Salamanca", "San Sebastián", "Santa Cruz de Tenerife", "Santander", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vitoria", "Zamora", "Zaragoza"],
		},
		actions: {


			userSignup: (name, dni, email, password) => {

				const newUser = {
					name: name,
					dni: dni,
					email: email,
					password: password,
				}

				fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newUser)
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ user: newUser });
						console.log("data", data);
					})
					.catch(error => console.log("Error creating user", error));
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
					sessionStorage.setItem("token", data.token);
					setStore({
						user: {
							email: data.email,
							token: data.token
						}
					})
					return data;
				} catch (error) {
					console.log("Error logging in user", error);
					throw error;
				  }
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


			createEvent: (nombre, descripcion, imagen, ubicacion, fechaInicio, fechaFin, personas, free, importe) => {

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

				}

				fetch(process.env.BACKEND_URL + "/api/crearevento", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newEvent)
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ event: newEvent });
						console.log("data", data);
					})
					.catch(error => console.log("Error creating event", error));
			},			  
		}
	};
};

export default getState;



