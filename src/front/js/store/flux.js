const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			user: {
				email: null,
				token: null
			},

			company: {},

		},
		actions: {


			userSignup: (name, dni, signupEmail, signupPassword, option) => {

				
				const newUser = {
					name: name,
					dni: dni,
					email: signupEmail,
					password: signupPassword,
					option: option
				}


				fetch(process.env.BACKEND_URL + "/api/auth", {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json"
				  },
				  body: JSON.stringify(newUser)
				})
				.then(resp => resp.json())
				.then(data => {
				  setStore({ user: newUser });
				})
				.catch(error => console.log("Error creating user", error));
			  },


			userLogin: (loginEmail, loginPassword, option) => {
				fetch(process.env.BACKEND_URL + "/api/auth", {
					method: "POST",	
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: loginEmail,
						password: loginPassword,
						option: option
					})
				})
				.then(resp => resp.json())
				.then(data => {
						console.log("data", data)
						setStore({ 
							user: {
								email: data.email, 
								token: data.token
							}
						})
					}
				)
				.catch(error => console.log("Error logging in user", error))
			},

			companySignup: (companyName, vat, address, postCode, city, country, phone, email) => {
				const newCompany = {
					companyName: companyName,
					vat: vat,
					address: address,
					postCode: postCode,
					city: city,
					country: country,
					phone: phone,
					email: email
				}
				fetch(process.env.BACKEND_URL + "/api/company", {
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
			}

		}
	};
};

export default getState;



//// comentado por si sirven en futuro, async await


			// handleUserSignup: async (name, dni, signupEmail, signupPassword) => {
			// 	try{
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
			// 			method: "POST",
			// 			headers: {
			// 				"Content-Type": "application/json"
			// 			},
			// 			body: JSON.stringify({
			// 				name: name,
			// 				dni: dni,
			// 				email: signupEmail,
			// 				password: signupPassword,
			// 			})
			// 		})
			// 		const data = await resp.json()
			// 		console.log("body", body.json())
			// 		console.log("data", data)
			// 		if(data.msg){
			// 			setStore({ message: data.msg })
			// 		}else{
			// 			setStore({ message: "User created successfully" })
			// 		}
			// 	}catch(error){
			// 		console.log("Error creating user", error)
			// 	}},

			// handleUserLogin: async (email, password) => {
			// 	try{
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
			// 			method: "POST",
			// 			headers: {
			// 				"Content-Type": "application/json"
			// 			},
			// 			body: JSON.stringify({
			// 				email: email,
			// 				password: password
			// 			})
			// 		})
			// 		const data = await resp.json()
			// 		console.log("data", data)
			// 		if(data.msg){
			// 			setStore({ message: data.msg })
			// 		}else{
			// 			setStore({ message: "User logged in successfully" })
			// 		}
			// 	}catch(error){
			// 		console.log("Error logging in user", error)
			// 	}},



