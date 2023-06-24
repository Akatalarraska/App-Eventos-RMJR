const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			user: {},
			token: null,
		},
		actions: {


			userSignup: (name, dni, signupEmail, signupPassword, option) => {

				const store = getStore();
				
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
				  console.log("user", store.user);
				})
				.catch(error => console.log("Error creating user", error));
			  },


			userLogin: (loginEmail, loginPassword, option) => {
				const store = getStore();
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
						setStore({ user: data.user})
						console.log("user", store.user)
					}
				)
				.catch(error => console.log("Error logging in user", error))
			},

		}
	};
};

export default getState;

















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



