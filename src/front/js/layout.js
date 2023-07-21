import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import {Signup} from "./pages/signup"
import {CompanySignup} from "./pages/companysignup"
import { Event } from "./pages/event";
import {Private} from "./pages/private"
import {Login} from "./pages/login"
import { AllEvents } from "./pages/allEvents";
import {Gestion_empleados} from "./pages/gestion_empleados"
import { Factura } from "./pages/factura";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { CreateEvent } from "./pages/createevent";
import { ModifyUserData } from "./pages/modifyUserData";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="d-flex flex-column min-vh-100 max-vw-100">
            
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Signup />} path="/signup" />
                            <Route element={<Login />} path="/login" />
                            <Route element={<CompanySignup />} path="/companysignup" />
                            <Route element={<Private />} path="/private" />
                            <Route element={<Gestion_empleados />} path="/gestion_empleados" />
                            <Route element={<Factura />} path="/factura" />
                            <Route element={<Event />} path="/event/:eventId" />
                            <Route element={<AllEvents />} path="/eventos" />
                            <Route element={<CreateEvent />} path="/crearevento" />
                            <Route element={<ModifyUserData />} path="/modify_user_data/:userId" />

                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
            
         </div>
    );
};

export default injectContext(Layout);
