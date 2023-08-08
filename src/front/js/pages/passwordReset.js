import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import "../../styles/password-reset.css";

export const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { actions } = useContext(Context);

    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            Swal.fire({
                title: "Error",
                text: "Las contraseñas no coinciden. Por favor, inténtelo de nuevo.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }
        try {
            const response = await actions.resetPassword(email, newPassword); 

            if (response) {
                Swal.fire({
                    title: "Bien hecho!",
                    text: "Contraseña restablecida correctamente!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/login");
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo restablecer la contraseña. Por favor, inténtelo de nuevo.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };




    const toggleNewPasswordVisibility = () => {
        setShowNewPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    return (
        <div className="password-reset-container">
            <form className="password-reset-form">
            <h3 className="fw-bold mt-5 mb-2 text-center text-black">
                    Restablecer contraseña</h3>
                <input
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="col-xl-12 input-wrapper">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Nueva contraseña"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <i
                        className={`fa-solid ${showNewPassword ? "input-icon fa-eye-slash" : "input-icon fa-eye"}`}
                        onClick={toggleNewPasswordVisibility}

                    ></i>
                </div>
                <div className="col-xl-12 input-wrapper">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirmar nueva contraseña"
                        autoComplete="new-password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <i
                        className={`fa-solid ${showConfirmPassword ? "input-icon fa-eye-slash" : "input-icon fa-eye"}`}
                        onClick={toggleConfirmPasswordVisibility}
                    ></i>
                </div>
                <button className="btn btn-lg btn-dark text-white btn-user-login" onClick={handlePasswordReset}>
                    Confirmar
                </button>
                <p className="back-to-login text-black">
                    ¿Prefieres anular el cambio de contraseña? Vuelve a <Link to="/login">inicio de sesión</Link>
                </p>
            </form>
        </div>
    );
};


