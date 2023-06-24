import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";

export const Signup = () => {
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [option, setOption] = useState("signup"); 


  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {

    /// Lógica para cambiar vista entre login y signup
    const loginBtn = document.getElementById("login");
    const signupBtn = document.getElementById("signup");

    const handleLoginClick = (e) => {
      let parent = e.target.parentNode.parentNode;
      Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          signupBtn.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
      setOption("login");
    };

    const handleSignupClick = (e) => {
      let parent = e.target.parentNode;
      Array.from(e.target.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          loginBtn.parentNode.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
      setOption("signup");
    };

    loginBtn.addEventListener("click", handleLoginClick);
    signupBtn.addEventListener("click", handleSignupClick);

    return () => {
      loginBtn.removeEventListener("click", handleLoginClick);
      signupBtn.removeEventListener("click", handleSignupClick);
    };
  }, []);


/// Lógica para gestión de signup y login
  const handleSignup = (event) => {
    event.preventDefault();
    actions.UserSignup(name, dni, signupEmail, signupPassword, option);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    actions.UserLogin(loginEmail, loginPassword, option); 
    if(store.token) {
      navigate("/Home");
    }
  };



  return (
    <div className="form-structor">
      <form
        className="signup"
        onSubmit={handleSignup}
      >
        <h2 className="form-title" id="signup">
          Sign up
        </h2>
        <div className="form-holder">
          <input
            type="text"
            className="input"
            placeholder="Name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            className="input"
            placeholder="DNI"
            required
            value={dni}
            onChange={(event) => setDni(event.target.value)}
          />
          <input
            type="email"
            className="input"
            placeholder="Email"
            autoComplete="username"
            required
            value={signupEmail}
            onChange={(event) => setSignupEmail(event.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            autoComplete="current-password"
            required
            value={signupPassword}
            onChange={(event) => setSignupPassword(event.target.value)}
          />
        </div>
        <button className="submit-btn">Sign up</button>

        <div className="row mb-4 additional-elements">
          <div className="col-md-12 d-flex justify-content-center">
            {/* Checkbox */}
            <div className="form-check mb-3 mb-md-0">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="signupCheck"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="loginCheck">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>
        </div>
        <div className="text-center mb-3 additional-elements">
          <p>Sign up with:</p>
          <button type="button" className="btn btn-dark btn-floating mx-1">
            <i className="fab fa-facebook-f" />
          </button>
          <button type="button" className="btn btn-dark btn-floating mx-1">
            <i className="fab fa-google" />
          </button>
          <button type="button" className="btn btn-dark btn-floating mx-1">
            <i className="fab fa-twitter" />
          </button>
          <button type="button" className="btn btn-dark btn-floating mx-1">
            <i className="fab fa-linkedin" />
          </button>
        </div>
      </form>

      <form
        className="login slide-up"
        onSubmit={handleLogin}
      >
        <div className="center">
          <h2 className="form-title" id="login">
            Log in
          </h2>
          <div className="form-holder">
            <input
              type="email"
              className="input"
              placeholder="Email"
              autoComplete="username"
              required
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              autoComplete="current-password"
              required
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
            />
          </div>
          <button className="submit-btn">Log in</button>
          <div className="row mb-4">
            <div className="col-md-6 d-flex justify-content-center">
              {/* Checkbox */}
              <div className="form-check mb-3 mb-md-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue=""
                  id="loginCheck"
                  defaultChecked=""
                />
                <label className="form-check-label" htmlFor="loginCheck">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              {/* Simple link */}
              <a href="#!">Forgot password?</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
